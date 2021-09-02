import { Injectable } from '@nestjs/common';
import type { UserProfile } from '@prisma/client';

import type { UserId } from '@/shared/domain.types';

import { UserProfileRepository } from './user-profile.repository';

@Injectable()
export class UserProfileService {
  constructor(private readonly usersRepository: UserProfileRepository) {}

  getAll(): Promise<UserProfile[]> {
    return this.usersRepository.findMany();
  }

  getById(id: UserId): Promise<UserProfile | null> {
    return this.usersRepository.findUnique({ where: { id } });
  }
}
