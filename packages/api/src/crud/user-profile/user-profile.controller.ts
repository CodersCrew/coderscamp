import { Controller, Get, UseGuards } from '@nestjs/common';

import type { GetAllUsersResponse, GetMeResponse } from '@coderscamp/shared/models/user';

import type { UserId } from '@/shared/domain.types';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

import { JwtUserId } from '../auth/jwt/jwt-user-id.decorator';
import { UserProfileService } from './user-profile.service';

@Controller('users')
export class UserProfileController {
  constructor(private readonly usersService: UserProfileService) {}

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
