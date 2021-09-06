import { execSync, spawnSync } from 'child_process';
import shell from 'shelljs';

export const command = (script: string) => {
  spawnSync(script, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
};

export const query = (script: string) => {
  return execSync(script)
    .toString('utf-8')
    .replace(/[\n\r\s]+$/, '');
};

export const log = (content: string) => {
  shell.echo(content);
};

export const terminate = (message: string) => {
  log(message);
  shell.exit(1);
};
