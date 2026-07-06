import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { homedir } from 'node:os';

const require = createRequire(import.meta.url);
const bundledNodeModules = join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const { chromium } = existsSync(join(process.cwd(), 'node_modules/playwright'))
  ? require('playwright')
  : require(join(bundledNodeModules, 'playwright'));
const { PDFDocument } = existsSync(join(process.cwd(), 'node_modules/pdf-lib'))
  ? require('pdf-lib')
  : require(join(bundledNodeModules, 'pdf-lib'));

const root = process.cwd();
const distDir = resolve(root, 'dist');
const exportDir = resolve(root, 'exports');
const shotsDir = join(exportDir, 'slide-screenshots-25');
const outputPdf = join(exportDir, 'Fiducial_FPSG_Soutenance_25_Slides_Captures.pdf');
const slideCount = Number(process.env.SLIDE_COUNT ?? 25);
const viewport = { width: 1600, height: 900 };
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp'
};

if (!existsSync(join(distDir, 'index.html'))) {
  throw new Error('dist/index.html is missing. Run npm run build before exporting screenshots.');
}

mkdirSync(shotsDir, { recursive: true });

const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  const requestedPath = decodeURIComponent(url.pathname);
  const filePath = requestedPath === '/' ? join(distDir, 'index.html') : join(distDir, requestedPath);
  const safePath = filePath.startsWith(distDir) && existsSync(filePath) ? filePath : join(distDir, 'index.html');
  res.setHeader('Content-Type', mimeTypes[extname(safePath)] ?? 'application/octet-stream');
  res.end(readFileSync(safePath));
});

function listen(serverInstance) {
  return new Promise((resolveListen) => {
    serverInstance.listen(0, '127.0.0.1', () => resolveListen(serverInstance.address().port));
  });
}

function close(serverInstance) {
  return new Promise((resolveClose) => serverInstance.close(resolveClose));
}

const port = await listen(server);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });

try {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
      body { background: #f7faf8 !important; }
    `
  }).catch(() => {});

  for (let i = 0; i < slideCount; i += 1) {
    const url = `http://127.0.0.1:${port}/?slide=${i}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.locator('.presentation-frame').waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForTimeout(350);
    const filePath = join(shotsDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await page.locator('.presentation-frame').screenshot({ path: filePath });
    console.log(`Captured slide ${i + 1}/${slideCount}`);
  }
} finally {
  await browser.close();
  await close(server);
}

const pdf = await PDFDocument.create();
const pageWidth = 1600;
const pageHeight = 900;

for (let i = 0; i < slideCount; i += 1) {
  const filePath = join(shotsDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
  const image = await pdf.embedPng(readFileSync(filePath));
  const pdfPage = pdf.addPage([pageWidth, pageHeight]);
  pdfPage.drawImage(image, { x: 0, y: 0, width: pageWidth, height: pageHeight });
}

writeFileSync(outputPdf, await pdf.save());
console.log(outputPdf);
