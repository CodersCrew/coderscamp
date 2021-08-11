import { Controller, Get, HttpCode, NotFoundException, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { GetUserLearningResourcesResponse } from '@coderscamp/shared/models/learning-resources';

import { JwtAuthGuard } from '../../../auth/jwt/jwt-auth.guard';
import { UserId } from '../../../auth/jwt/user-id.decorator';
import { GenerateLearningResources } from '../../api/generate-learning-resources.command';
import { WhatAreLearningResourcesForUser } from '../../api/what-are-learning-resources-for-user.query';
import { WhatAreLearningResourcesForUserQueryResult } from '../../api/what-are-learning-resources-for-user.query.result';

// todo: how to generate valid jwt token for tests
@Controller('learning-resources')
export class LearningResourcesController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUserLearningResources(@UserId() id: number): Promise<GetUserLearningResourcesResponse> {
    const result = this.queryBus.execute<WhatAreLearningResourcesForUser, WhatAreLearningResourcesForUserQueryResult>(
      new WhatAreLearningResourcesForUser(id.toString()),
    );

    if (!result) {
      throw new NotFoundException('Cannot found learning resources for current user!');
    }

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @HttpCode(204)
  async generateUserLearningResources(@UserId() id: number): Promise<void> {
    await this.commandBus.execute(new GenerateLearningResources(id.toString())); // todo: handle command failures with something like CommandResult object
  }
}
