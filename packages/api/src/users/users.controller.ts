import { Body, Controller, Post } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';

import type { UserSurveyDTO } from '@coderscamp/shared/models/user';

import { UserRegisteredEvent } from './events/userRegistered.event';
import { UsersMapper } from './users.mapper';

@Controller('users')
export class UsersController {
  constructor(private readonly eventBus: EventBus) {}

  @Post('survey')
  async saveUserSurvey(@Body() userSurveyDTO: UserSurveyDTO): Promise<UserSurveyDTO> {
    return UsersMapper.userSurveyToPlain(
      await this.eventBus.publish(new UserRegisteredEvent(UsersMapper.userSurveyToDomain(userSurveyDTO))),
    );
  }
}
