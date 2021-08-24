import { Controller, HttpCode, Inject, Post, Type, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';

import { JwtAuthGuard } from '../../../../../auth/jwt/jwt-auth.guard';
import { JwtUserId } from '../../../../../auth/jwt/jwt-user-id.decorator';
import { UserId } from '../../../../../users/users.types';
import { ID_GENERATOR, IdGenerator } from '../../../../shared/core/id-generator';
import { ApplicationCommand } from '../../../../shared/core/slices';
import { TIME_PROVIDER, TimeProvider } from '../../../../shared/core/time-provider.port';
import { GenerateLearningMaterialsUrl } from '../../api/generate-learning-materials-url.command';

@Controller('learning-materials-url')
export class LearningMaterialsUrlController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(ID_GENERATOR)
    private readonly idGenerator: IdGenerator,
    @Inject(TIME_PROVIDER)
    private readonly timeProvider: TimeProvider,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(204)
  async generateUserLearningResourcesUrl(@JwtUserId() userId: UserId): Promise<void> {
    //this.commandBus.register()
    await this.commandBus.execute({
      type: 'GenerateLearningMaterialsUrl',
      id: this.idGenerator.generate(),
      issuedAt: this.timeProvider.currentTime(),
      data: { userId },
      metadata: { correlationId: this.idGenerator.generate() },
    });
  }

  // command<CommandType extends ApplicationCommand>(builder: CommandBuilder<CommandType>): CommandType {
  //   return plainToClass(builder.type, {
  //     id: this.idGenerator.generate(),
  //     issuedAt: this.timeProvider.currentTime(),
  //     data: builder.data,
  //     metadata: { correlationId: this.idGenerator.generate() },
  //   });
  // }
}

export type CommandBuilder<CommandType extends ApplicationCommand> = {
  type: Type<CommandType>;
  data: CommandType['data'];
};
