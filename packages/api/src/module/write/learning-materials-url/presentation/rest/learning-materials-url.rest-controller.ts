import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '../../../../../auth/jwt/jwt-auth.guard';
import { JwtUserId } from '../../../../../auth/jwt/jwt-user-id.decorator';
import { UserId } from '../../../../../users/users.types';
import { GenerateLearningMaterialsUrlApplicationCommand } from '../../../../shared/commands/generate-learning-materials-url.application-command';
import { ApplicationCommandFactory } from '../../../shared/application/application-command.factory';

@Controller('learning-materials')
export class LearningMaterialsUrlRestController {
  constructor(private readonly commandBus: CommandBus, private readonly commandFactory: ApplicationCommandFactory) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @HttpCode(204)
  async generateUserLearningResourcesUrl(@JwtUserId() courseUserId: UserId): Promise<void> {
    const command = this.commandFactory.applicationCommand(() => ({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { courseUserId },
    }));

    await this.commandBus.execute(command);
  }

  @Get('/test')
  async test() {
    const command = this.commandFactory.applicationCommand(() => ({
      class: GenerateLearningMaterialsUrlApplicationCommand,
      type: 'GenerateLearningMaterialsUrl',
      data: { courseUserId: 'ece93730-939e-4637-a56e-8daf2969e214' },
    }));

    await this.commandBus.execute(command);

    return { message: command.id };
  }
}
