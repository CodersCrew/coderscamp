import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany = this.prisma.user.findMany;

  findUnique = this.prisma.user.findUnique;

  create = this.prisma.user.create;
}
