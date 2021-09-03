import { spawnSync } from 'child_process';
import shell from 'shelljs';

export const exec = (script: string) => {
  return spawnSync(script, { stdio: 'inherit', shell: true, encoding: 'utf-8' });
};

export const log = (content: string) => {
  shell.echo(content);
};

export const terminate = (message: string) => {
  log(message);
  shell.exit(1);
};
