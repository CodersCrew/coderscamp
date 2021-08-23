import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany = this.prisma.course.findMany;

  findUnique = this.prisma.course.findUnique;

  create = this.prisma.course.create;
}
