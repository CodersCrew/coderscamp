import { Argument, Command } from 'commander';

import { asyncFilter, removeDuplicatesForProperty } from '../shared/array';
import { getCsvContent } from '../shared/csv';
import { getUsersByRole, insertUsers } from '../shared/db';
import { validateEnv } from '../shared/env';
import { createLogger } from '../shared/logger';
import { CreateUserDTO, ParticipantCsvRow, userRoles } from '../shared/models';
import { filterInvalid, transformAndValidate, transformToMatchClass } from '../shared/object';

const logger = createLogger('register-participants');

export const registerParticipants = (program: Command) => {
  program
    .command('register-participants')
    .description('Creates accounts for CodersCamp participants listed in the CSV file')
    .addArgument(new Argument('<csv-path>', 'Path to the CSV file'))
    .action(async (csvPath: string) => {
      try {
        await validateEnv();

        const rows = await getCsvContent(csvPath);
        const participantsRows = await Promise.all(rows.map(transformToMatchClass(ParticipantCsvRow)));
        const correctParticipantsRows = await asyncFilter(participantsRows, filterInvalid(ParticipantCsvRow));

        const currentParticipants = await getUsersByRole(userRoles.participant);
        const currentParticipantsEmails = currentParticipants.map(({ email }) => email);

        logger.debug('Filtering emails that are already added to the database');

        const participantsRowsToAdd = correctParticipantsRows.filter(({ email }) => {
          if (currentParticipantsEmails.includes(email)) {
            logger.debug(`Participant with email ${email} already exists in the database`);

            return false;
          }

          return true;
        });

        logger.debug('Mapping ParticipantCsvRows to CreateUserDTOs');

        const createUserDTOs = await Promise.all(
          participantsRowsToAdd.map(({ email, firstName, lastName }) =>
            transformAndValidate(CreateUserDTO)({
              email,
              firstName,
              lastName,
              role: userRoles.participant,
            }),
          ),
        );

        await insertUsers(removeDuplicatesForProperty(createUserDTOs, 'email'));
      } catch (ex) {
        logger.error(ex);
      }
    });
};
