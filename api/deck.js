import { promises as fs } from 'node:fs';
import path from 'node:path';

const localFile = path.join(process.cwd(), '.data', 'deck-state.json');

async function readLocal() {
  try {
    return JSON.parse(await fs.readFile(localFile, 'utf8'));
  } catch (error) {
    if (error && error.code === 'ENOENT') return null;
    throw error;
  }
}

async function writeLocal(body) {
  await fs.mkdir(path.dirname(localFile), { recursive: true });
  await fs.writeFile(localFile, JSON.stringify(body, null, 2));
}

async function readKv() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  const response = await fetch(`${process.env.KV_REST_API_URL}/get/fpsg-deck-state`, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` }
  });
  if (!response.ok) throw new Error(`KV read failed: ${response.status}`);
  const payload = await response.json();
  return payload.result ? JSON.parse(payload.result) : null;
}

async function writeKv(body) {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return false;
  const response = await fetch(`${process.env.KV_REST_API_URL}/set/fpsg-deck-state`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(JSON.stringify(body))
  });
  if (!response.ok) throw new Error(`KV write failed: ${response.status}`);
  return true;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const data = (await readKv()) ?? (await readLocal());
      if (!data) return res.status(404).json({ error: 'No saved deck yet' });
      return res.status(200).json(data);
    }
    if (req.method === 'PUT') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body || !Array.isArray(body.slides) || !Array.isArray(body.annexes)) {
        return res.status(400).json({ error: 'Invalid deck payload' });
      }
      const savedInKv = await writeKv(body);
      if (!savedInKv) await writeLocal(body);
      return res.status(200).json({ ok: true, storage: savedInKv ? 'vercel-kv' : 'local-file' });
    }
    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
}
