import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { PrismaService } from '@/shared/prisma/prisma.service';

import { PrismaTransactionManager } from './prisma-transaction-manager';

@Injectable()
export class PrismaTransactionManagerFactory {
  constructor(private readonly commandBus: CommandBus, private readonly prismaService: PrismaService) {}

  create() {
    return new PrismaTransactionManager(this.commandBus, this.prismaService, uuid());
  }
}
