import { Body, Controller, Post } from '@nestjs/common';

import type { UserSurveyDTO } from '@coderscamp/shared/models/user';

import { UsersEntity } from './users.entity';
import { UsersMapper } from './users.mapper';

@Controller('users')
export class UsersController {
  constructor(private readonly usersEntity: UsersEntity) {}

  @Post('user-survey')
  async saveUserSurvey(@Body() userSurveyDTO: UserSurveyDTO): Promise<UserSurveyDTO> {
    const survey = UsersMapper.userSurveyToDomain(userSurveyDTO);
    const result = await this.usersEntity.completeSurvey(survey);

    return UsersMapper.userSurveyToPlain(result);
  }
}
