import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUserRegistration = this.prisma.userRegistration.create;

  findUserRegistration = this.prisma.userRegistration.findUnique;

  createAuthUser = this.prisma.authUser.create;

  findAuthUser = this.prisma.authUser.findUnique;
}
