import { Controller, Get, UseGuards } from '@nestjs/common';

import type { GetAllUsersResponse, GetMeResponse } from '@coderscamp/shared/models/user';

import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { JwtUserId } from '../auth/jwt/jwt-user-id.decorator';
import { UsersService } from './users.service';
import type { UserId } from './users.types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getAll(): Promise<GetAllUsersResponse> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@JwtUserId() id: UserId): Promise<GetMeResponse> {
    return this.usersService.getById(id);
  }
}
