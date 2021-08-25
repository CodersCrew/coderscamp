import { Inject, Injectable, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { ApplicationCommand } from './application-command-events';
import { ID_GENERATOR, IdGenerator } from './id-generator';
import { TIME_PROVIDER, TimeProvider } from './time-provider.port';

export type CommandBuilder<CommandType extends ApplicationCommand> = {
  class: Type<CommandType>;
  type: CommandType['type'];
  data: CommandType['data'];
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

    return plainToClass(builder.class, {
      type: builder.type,
      id: generateId(),
      issuedAt: currentTime(),
      data: builder.data,
      metadata: { correlationId: generateId() },
    });
  }
}
