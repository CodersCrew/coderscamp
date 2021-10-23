import { Argument, Command } from 'commander';
import { generate as generatePassword } from 'generate-password';

import { getCsvContent } from '../shared/csv';
import { getUsersByRole, insertUsers, register } from '../shared/db';
import { validateEnv } from '../shared/env';
import { createPasswordsList } from '../shared/files';
import { createLogger } from '../shared/logger';
import { ParticipantCsvRow, RegisterDTO, User, userRoles } from '../shared/models';
import { transformToMatchClass } from '../shared/object';

const logger = createLogger('register-participants');

export const registerParticipants = (program: Command) => {
  program
    .command('register-participants')
    .description('Creates accounts for CodersCamp participants listed in the CSV file')
    .addArgument(new Argument('<csv-path>', 'Path to the CSV file'))
    .action(async (csvPath: string) => {
      const participants: User[] = [];
      const passwords = createPasswordsList();

      try {
        await validateEnv();

        const rows = await getCsvContent(csvPath);
        const participantsRows = await Promise.all(rows.map(transformToMatchClass(ParticipantCsvRow)));
        const currentParticipants = await getUsersByRole(userRoles.participant);
        const currentParticipantsEmails = currentParticipants.map(({ email }) => email);

        logger.debug('Iterating through parsed rows');

        for (const { email, firstName, lastName } of participantsRows) {
          if (!currentParticipantsEmails.includes(email)) {
            const password = generatePassword({ length: 16, numbers: true, symbols: true });
            const registerDto = await transformToMatchClass(RegisterDTO)({ email, password });
            const userId = await register(registerDto);
            const participant = await transformToMatchClass(User)({
              ...registerDto,
              id: userId,
              firstName,
              lastName,
              role: userRoles.participant,
            });

            participants.push(participant);
            passwords.add({ email, password });
          } else {
            logger.debug(`Participant with email ${email} already exists in the database`);
          }
        }

        logger.debug('Iteration through parsed rows finished');

        await insertUsers(participants);
      } catch (ex) {
        logger.error(ex);
        logger.info('Already registered participants', participants);
      } finally {
        await passwords.save();
      }
    });
};
