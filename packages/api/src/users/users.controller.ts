import { Controller, Get, UseGuards } from '@nestjs/common';

import type { GetAllUsersResponse, GetMeResponse } from '@coderscamp/shared/models/user';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserId } from '../auth/jwt/user-id.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getAll(): Promise<GetAllUsersResponse> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@UserId() id: number): Promise<GetMeResponse> {
    return this.usersService.getById(id);
  }
}
