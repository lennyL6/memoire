import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const bundledPython = join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3');
const python = process.env.PYTHON ?? (existsSync(bundledPython) ? bundledPython : 'python3');

// Regenerate the static backup PDF first. The delivered contact sheet is produced from rendered backup pages.
execFileSync(python, ['scripts/create_backup_pdf.py'], { stdio: 'inherit' });
console.log('Backup PDF regenerated. To refresh the contact sheet, render the PDF pages and combine them with the included Python/PIL workflow used in exports/GENERATION_REPORT.md.');
