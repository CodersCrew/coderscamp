import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';

import { UserErrorMessage } from '@coderscamp/shared/errors/user.errors';
import type { GetMeResponse, UserId as Id } from '@coderscamp/shared/models';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserId } from '../auth/jwt/user-id.decorator';
import { UsersMapper } from './users.mapper';
import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@UserId() id: Id): Promise<GetMeResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException(UserErrorMessage.USER_NOT_FOUND);

    return UsersMapper.userToPlain(user);
  }
}
