import { Inject, Injectable, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { ApplicationCommand } from '@/module/application-command-events';

import { ID_GENERATOR, IdGenerator } from './id-generator';
import { TIME_PROVIDER, TimeProvider } from './time-provider.port';

export type CommandBuilder<CommandType extends ApplicationCommand = ApplicationCommand> = (
  idGenerator: IdGenerator,
) => {
  class: Type<CommandType>;
  type: CommandType['type'];
  data: CommandType['data'];
  metadata?: CommandType['metadata'];
};

@Injectable()
export class ApplicationCommandFactory {
  constructor(
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
    @Inject(TIME_PROVIDER)
    private readonly timeProvider: TimeProvider,
  ) {}

  applicationCommand<CommandType extends ApplicationCommand>(builder: CommandBuilder<CommandType>): CommandType {
    const generateId = () => this.idGenerator.generate();
    const currentTime = () => this.timeProvider.currentTime();

    const id = generateId();
    const correlationId = generateId();

    const command = builder(this.idGenerator);

    return plainToClass(command.class, {
      type: command.type,
      id,
      issuedAt: currentTime(),
      data: command.data,
      metadata: { correlationId, ...command.metadata },
    });
  }
}
