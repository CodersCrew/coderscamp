import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';

import type { UserId } from '@/shared/domain.types';

import { UserProfileRepository } from './user-profile.repository';

@Injectable()
export class UserProfileService {
  constructor(private readonly usersRepository: UserProfileRepository) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.findMany();
  }

  getById(id: UserId): Promise<User | null> {
    return this.usersRepository.findUnique({ where: { id } });
  }
}
