import { Controller, Get } from '@nestjs/common';

import type { UserDTO } from '@coderscamp/shared/models/user';

import { UsersMapper } from './users.mapper';
import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get('/')
  async getAll(): Promise<UserDTO[]> {
    return UsersMapper.toPlainMany(await this.usersRepository.getAll());
  }
}
