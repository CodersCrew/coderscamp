import { isInt, isPositive } from 'class-validator';
import { Argument, Command } from 'commander';

import { parseToCsv } from '../shared/csv';
import { getUsersByRole } from '../shared/db';
import { createWelcomeCsv } from '../shared/files';
import { createLogger } from '../shared/logger';
import { userRoles, WelcomeCsvRow } from '../shared/models';
import { transformAndValidate } from '../shared/object';

const logger = createLogger('generate-welcome-csv');

export const generateWelcomeCsv = (program: Command) => {
  program
    .command('generate-welcome-csv')
    .description('Generates CSV file with names, emails and checklist URLs for all participants in the database')
    .addArgument(new Argument('<from-id>', 'Path to the CSV file'))
    .action(async (fromId?: string) => {
      const startFromId = Number(fromId);

      try {
        if (fromId && !(isPositive(startFromId) && isInt(startFromId))) {
          throw new Error('fromId parameter must be a positive integer');
        }

        let participants = await getUsersByRole(userRoles.participant);

        if (startFromId) {
          participants = participants.filter((p) => p.id >= startFromId);
        }

        const welcomeCsvRows = await Promise.all(participants.map(transformAndValidate(WelcomeCsvRow)));

        logger.debug('Parsing welcome CSV objects to CSV format', welcomeCsvRows);

        const csv = parseToCsv(welcomeCsvRows);

        logger.debug('Creating welcome CSVfile', csv);

        await createWelcomeCsv(csv);
      } catch (ex) {
        logger.error(ex);
      }
    });
};
