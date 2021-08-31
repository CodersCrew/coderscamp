import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany = this.prisma.user.findMany;

  findUnique = this.prisma.user.findUnique;

  create = this.prisma.user.create;
}
