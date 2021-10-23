import { Command } from 'commander';

import { parseToCsv } from '../shared/csv';
import { getUsersByRole } from '../shared/db';
import { createWelcomeCsv } from '../shared/files';
import { createLogger } from '../shared/logger';
import { userRoles, WelcomeCsvRow } from '../shared/models';
import { transformToMatchClass } from '../shared/object';

const logger = createLogger('generate-welcome-csv');

export const generateWelcomeCsv = (program: Command) => {
  program
    .command('generate-welcome-csv')
    .description('Generates CSV file with names, emails and checklist URLs for all participants in the database')
    .action(async () => {
      try {
        const participants = await getUsersByRole(userRoles.participant);
        const welcomeCsvRows = await Promise.all(participants.map(transformToMatchClass(WelcomeCsvRow)));

        logger.debug('Parsing welcome CSV objects to CSV format', welcomeCsvRows);

        const csv = parseToCsv(welcomeCsvRows);

        logger.debug('Creating welcome CSVfile', csv);

        await createWelcomeCsv(csv);
      } catch (ex) {
        logger.error(ex);
      }
    });
};
