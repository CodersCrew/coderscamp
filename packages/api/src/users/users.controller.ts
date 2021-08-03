import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { userSchema, UserSurveyDTO } from '@coderscamp/shared/models/user';

import { YupValidationPipe } from '@/common/yupValidationPipe';

import { SaveSurveyCommand } from './commands';
import { UsersMapper } from './users.mapper';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('survey')
  @UsePipes(new YupValidationPipe(userSchema))
  async saveUserSurvey(@Body() userSurveyDTO: UserSurveyDTO): Promise<UserSurveyDTO> {
    const command = new SaveSurveyCommand(UsersMapper.userSurveyToDomain(userSurveyDTO));

    return UsersMapper.userSurveyToPlain(await this.commandBus.execute(command));
  }
}
