import { Controller, Get } from '@nestjs/common';

import { GetAllUsersResponse } from '@coderscamp/shared/models/user';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getAll(): Promise<GetAllUsersResponse> {
    return this.usersService.getAll();
  }
}
