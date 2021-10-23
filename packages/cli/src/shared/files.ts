import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';

import { createLogger } from './logger';

const logger = createLogger('Files Utils');

const createOutputDir = async () => {
  if (!existsSync('output')) {
    await mkdir('output');
  }
};

export const createPasswordsList = () => {
  const passwords: Record<string, string> = {};

  const add = ({ email, password }: { email: string; password: string }) => {
    logger.debug(`Adding password for email ${email}`);
    passwords[email] = password;
  };

  const save = async () => {
    await createOutputDir();

    const path = 'output/passwords.json';

    logger.debug(`Saving passwords object to ${path}`);
    await writeFile(path, JSON.stringify(passwords), 'utf-8');
    logger.debug('Passwords saved successfully');
  };

  return { add, save };
};

export const createWelcomeCsv = async (csv: string) => {
  await createOutputDir();

  const path = 'output/welcome.csv';

  logger.debug(`Saving welcome CSV to ${path}`);
  await writeFile(path, csv, 'utf-8');
  logger.debug('Welcome CSV saved successfully');
};
