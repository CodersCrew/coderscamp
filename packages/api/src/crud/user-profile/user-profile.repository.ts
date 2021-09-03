import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany = this.prisma.userProfile.findMany;

  findUnique = this.prisma.userProfile.findUnique;

  create = this.prisma.userProfile.create;
}
