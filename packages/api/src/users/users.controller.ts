import { Controller, Get, UseGuards } from '@nestjs/common';

import type { UserDTO } from '@coderscamp/shared/models/user';

import { UserId } from '@/common/decorators';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UsersMapper } from './users.mapper';
import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get('/')
  async getAll(): Promise<UserDTO[]> {
    return UsersMapper.toPlainMany(await this.usersRepository.getAll());
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@UserId() id: number): Promise<UserDTO | null> {
    return this.usersRepository.getById(id);
  }
}
