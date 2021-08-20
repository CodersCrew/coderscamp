import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LearningMaterialsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findUnique = this.prismaService.learningMaterial.findUnique;

  create = this.prismaService.learningMaterial.create;
}
