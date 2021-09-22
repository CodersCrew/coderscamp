import { Controller, Get, UseGuards } from '@nestjs/common';

import { GET_ALL_USERS_ENDPOINT, GetAllUsersResponse } from '@coderscamp/shared/models/user/getAllUsers';
import { GET_ME_ENDPOINT, GetMeResponse } from '@coderscamp/shared/models/user/getMe';

import type { UserId } from '@/shared/domain.types';
import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard';

import { JwtUserId } from '../auth/jwt/jwt-user-id.decorator';
import { UserProfileService } from './user-profile.service';

@Controller()
export class UserProfileController {
  constructor(private readonly usersService: UserProfileService) {}

  @Get(GET_ALL_USERS_ENDPOINT)
  async getAll(): Promise<GetAllUsersResponse> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(GET_ME_ENDPOINT)
  async getMe(@JwtUserId() id: UserId): Promise<GetMeResponse> {
    return this.usersService.getById(id);
  }
}
