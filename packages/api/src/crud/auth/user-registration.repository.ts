import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class UserRegistrationRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUserRegistration = this.prisma.userRegistration.create;
}
