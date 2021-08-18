import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepository } from '../../users/users.repository';
import type { UsersPort } from '../ports/users.port';

@Injectable()
export class UsersAdapter implements UsersPort {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserFullNameById(userId: number): Promise<string> {
    const user = await this.usersRepository.getById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user.fullName;
  }
}
