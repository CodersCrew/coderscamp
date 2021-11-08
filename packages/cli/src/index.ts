import 'reflect-metadata';

import { Command } from 'commander';

import { generateChecklists } from './commands/generate-checklists';
import { registerParticipants } from './commands/register-participants';

const program = new Command();

program.version('0.0.0');

registerParticipants(program);
generateChecklists(program);

program.parse();
