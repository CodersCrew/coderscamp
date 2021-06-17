import { Controller, Get } from '@nestjs/common';

import type { GetAllUsersResponse } from '@coderscamp/shared';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getAll(): Promise<GetAllUsersResponse> {
    return this.usersService.getAll();
  }
}
