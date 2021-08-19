import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '../../../../../auth/jwt/jwt-auth.guard';
import { JwtUserId } from '../../../../../auth/jwt/jwt-user-id.decorator';
import { UserId } from '../../../../../users/users.types';
import { IdGenerator } from '../../../../shared/core/id-generator';
import { TimeProvider } from '../../../../shared/core/time-provider.port';
import { GenerateLearningMaterialsUrl } from '../../api/generate-learning-materials-url.command';

@Controller('learning-materials-url')
export class LearningMaterialsUrlController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly idGenerator: IdGenerator,
    private readonly timeProvider: TimeProvider,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(204)
  async generateUserLearningResourcesUrl(@JwtUserId() userId: UserId): Promise<void> {
    await this.commandBus.execute(
      GenerateLearningMaterialsUrl.command({
        id: await this.idGenerator.generate(),
        issuedAt: this.timeProvider.currentTime(),
        data: { userId },
        metadata: { correlationId: await this.idGenerator.generate() },
      }),
    );
  }
}
