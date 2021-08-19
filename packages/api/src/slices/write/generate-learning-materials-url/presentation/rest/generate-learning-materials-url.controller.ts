import {Controller, HttpCode, Inject, Post, UseGuards} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { JwtAuthGuard } from '../../../../../auth/jwt/jwt-auth.guard';
import { JwtUserId } from '../../../../../auth/jwt/jwt-user-id.decorator';
import { UserId } from '../../../../../users/users.types';
import {ID_GENERATOR, IdGenerator} from '../../../../shared/core/id-generator';
import {TIME_PROVIDER, TimeProvider} from '../../../../shared/core/time-provider.port';
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
    await this.commandBus.execute(
      GenerateLearningMaterialsUrl.command({
        id: this.idGenerator.generate(),
        issuedAt: this.timeProvider.currentTime(),
        data: { userId },
        metadata: { correlationId: await this.idGenerator.generate() },
      }),
    );
  }
}
