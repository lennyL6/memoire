import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const bundledPython = join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3');
const python = process.env.PYTHON ?? (existsSync(bundledPython) ? bundledPython : 'python3');

execFileSync(python, ['scripts/create_backup_pdf.py'], { stdio: 'inherit' });
