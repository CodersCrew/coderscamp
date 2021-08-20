import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  createRegistrationForm = this.prisma.registrationForm.create;

  findRegistrationForm = this.prisma.registrationForm.findUnique;

  createAuthUser = this.prisma.authUser.create;
}
