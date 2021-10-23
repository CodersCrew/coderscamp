import { Argument, Command } from 'commander';

import { getCsvContent } from '../shared/csv';
import { insertUsers, register } from '../shared/db';
import { validateEnv } from '../shared/env';
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
      try {
        await validateEnv();

        const rows = await getCsvContent(csvPath);
        const participantsRows = await Promise.all(rows.map(transformToMatchClass(ParticipantCsvRow)));

        const participants: User[] = [];

        logger.debug('Iterating through parsed rows');

        for (const { email, firstName, lastName } of participantsRows) {
          const registerDto = await transformToMatchClass(RegisterDTO)({ email });
          const userId = await register(registerDto);
          const participant = await transformToMatchClass(User)({
            ...registerDto,
            id: userId,
            name: `${firstName} ${lastName}`,
            role: userRoles.participant,
          });

          participants.push(participant);
        }

        logger.debug('Iteration through parsed rows finished');

        await insertUsers(participants);
      } catch (ex) {
        logger.error(ex);
      }
    });
};
