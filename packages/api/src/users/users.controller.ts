import { Controller, Get } from '@nestjs/common';

import type { UserDTO } from '@coderscamp/shared/models/user';

import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getAll(): Promise<UserDTO[]> {
    return UsersMapper.toPlainMany(await this.usersService.getAll());
  }
}
