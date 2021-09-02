import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { GenerateLearningMaterialsUrlApplicationCommand } from '@/commands/generate-learning-materials-url.application-command';
import { JwtUserId } from '@/crud/auth/jwt/jwt-user-id.decorator';
import { UserId } from '@/crud/user-profiles/users.types';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';

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
}
