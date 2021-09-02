import { Injectable, NotFoundException } from '@nestjs/common';

import { UserProfileService } from '@/crud/user-profile/user-profile.service';
import type { UserId } from '@/shared/domain.types';

import { UsersPort } from '../application/users.port';

@Injectable()
export class UsersAdapter implements UsersPort {
  constructor(private readonly usersService: UserProfileService) {}

  async getUserFullNameById(userId: UserId): Promise<string> {
    const user = await this.usersService.getById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user.fullName;
  }
}
