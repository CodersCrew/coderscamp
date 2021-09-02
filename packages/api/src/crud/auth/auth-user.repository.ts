import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../shared/prisma/prisma.service';

@Injectable()
export class AuthUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  createAuthUser = this.prisma.authUser.create;

  findAuthUser = this.prisma.authUser.findUnique;
}
