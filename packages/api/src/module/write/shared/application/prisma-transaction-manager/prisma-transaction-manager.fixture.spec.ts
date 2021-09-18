import { Test } from '@nestjs/testing';
import { AsyncReturnType } from 'type-fest';

import { PrismaService } from '@/shared/prisma/prisma.service';
import { cleanupDatabase, getCommandBusSpy } from '@/shared/test-utils';

import { eventEmitterRootModule } from '../../../../../event-emitter.root-module';
import { SharedModule } from '../../shared.module';
import { PrismaTransactionManagerFactory } from './prisma-transaction-manager-factory';

export type PrismaTransactionManagerTestFixture = AsyncReturnType<typeof initPrismaTransactionManagerTestModule>;

export async function initPrismaTransactionManagerTestModule() {
  const app = await Test.createTestingModule({
    imports: [eventEmitterRootModule, SharedModule],
  }).compile();

  await app.init();

  const prismaService = app.get<PrismaService>(PrismaService);
  const factory = app.get<PrismaTransactionManagerFactory>(PrismaTransactionManagerFactory);
  const execute = getCommandBusSpy(app);
  const sut = factory.create();
  const sut1 = factory.create();

  async function close() {
    await app.close();
    await cleanupDatabase(prismaService);
    await prismaService.$disconnect();
  }

  return {
    sut,
    sut1,
    close,
    prismaService,
    mocks: { commandBus: { execute } },
  };
}
