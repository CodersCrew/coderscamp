import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from '../../../../users/users.service';
import { UserId } from '../../../../users/users.types';
import { UsersPort } from '../application/users.port';

@Injectable()
export class UsersAdapter implements UsersPort {
  constructor(private readonly usersService: UsersService) {}

  async getUserFullNameById(userId: UserId): Promise<string> {
    const user = await this.usersService.getById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user.fullName;
  }
}
