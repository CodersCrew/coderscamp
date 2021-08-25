import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '../../../../../auth/jwt/jwt-auth.guard';
import { JwtUserId } from '../../../../../auth/jwt/jwt-user-id.decorator';
import { UserId } from '../../../../../users/users.types';
import { ApplicationCommandFactory } from '../../../common/application/application-command.factory';
import { GenerateLearningMaterialsUrlApplicationCommand } from '../../application/api/generate-learning-materials-url.application-command';

@Controller('learning-materials')
export class LearningMaterialsUrlRestController {
  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @HttpCode(204)
  async generateUserLearningResourcesUrl(@JwtUserId() userId: UserId): Promise<void> {
    const command = this.commandFactory.applicationCommand({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { userId },
    });

    await this.commandBus.execute(command);
  }

  @Get('/test')
  async test() {
    const command = this.commandFactory.applicationCommand({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { userId: 'someUser' },
    });

    await this.commandBus.execute(command);

    return { message: command.id };
  }
}
