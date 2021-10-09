import parse from 'csv-parse/lib/sync';
import { readFile } from 'fs/promises';

import { createLogger } from './logger';

const logger = createLogger('CSV Utils');

export const getCsvContent = async (csvPath: string) => {
  logger.debug(`reading CSV file for path ${csvPath}`);

  const content = await readFile(csvPath, { encoding: 'utf-8' });

  logger.debug('parsing content of the CSV file');

  const parsedContent: Record<string, unknown>[] = parse(content, { columns: true });

  logger.debug('CSV file content parsed successfully');

  return parsedContent;
};
