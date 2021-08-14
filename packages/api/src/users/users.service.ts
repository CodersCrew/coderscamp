import { Injectable } from '@nestjs/common';

import { RegisteredUser, User } from '@coderscamp/shared/models';

import { UsersRepository } from './users.repository';
import { UserFromJwt } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async update(user: Partial<User> & UserFromJwt): Promise<User | RegisteredUser> {
    const userFromDb = await this.usersRepository.getById(user.id);

    if (!userFromDb) {
      throw new Error('User not found');
    }

    return this.usersRepository.update(user);
  }
}
