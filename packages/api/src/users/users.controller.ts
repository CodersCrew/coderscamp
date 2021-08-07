import { Body, Controller, Post, UsePipes, UseGuards, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { userSchema, UserSurveyDTO } from '@coderscamp/shared/models/user';

import { YupValidationPipe } from '@/common/yupValidationPipe';

import { SaveSurveyCommand } from './commands';
import { UsersMapper } from './users.mapper';
import type { GetAllUsersResponse, GetMeResponse } from '@coderscamp/shared/models/user';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserId } from '../auth/jwt/user-id.decorator';
import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus, private readonly usersRepository: UsersRepository) {}

  @Post('survey')
  @UsePipes(new YupValidationPipe(userSchema))
  async saveUserSurvey(@Body() userSurveyDTO: UserSurveyDTO): Promise<UserSurveyDTO> {
    const command = new SaveSurveyCommand(UsersMapper.userSurveyToDomain(userSurveyDTO));
    return UsersMapper.userSurveyToPlain(await this.commandBus.execute(command));
  }

  @Get('/')
  async getAll(): Promise<GetAllUsersResponse> {
    return this.usersRepository.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@UserId() id: number): Promise<GetMeResponse> {
    return this.usersRepository.getById(id);

  }
}
