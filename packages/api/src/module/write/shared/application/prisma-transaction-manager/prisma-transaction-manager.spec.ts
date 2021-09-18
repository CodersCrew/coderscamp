import { sampleDatabaseEvent } from '@/shared/test-utils';

import {
  initPrismaTransactionManagerTestModule,
  PrismaTransactionManagerTestFixture,
} from './prisma-transaction-manager.fixture.spec';

describe('PrismaTransactionManager', () => {
  let fixture: PrismaTransactionManagerTestFixture;

  beforeEach(async () => {
    fixture = await initPrismaTransactionManagerTestModule();
  });

  afterEach(async () => {
    await fixture.close();
  });

  it('Given some registered callbacks when executeWithTransaction then all registered changes should be persisted', async () => {
    // Given
    const { sut, prismaService } = fixture;
    const sampleEvent0 = sampleDatabaseEvent();
    const sampleEvent1 = sampleDatabaseEvent();
    const sampleEvent2 = sampleDatabaseEvent();
    const sampleEvent3 = sampleDatabaseEvent();
    const expected = [sampleEvent0, sampleEvent1, sampleEvent2, sampleEvent3].map((event, i) => ({
      ...event,
      globalOrder: i + 1,
    }));

    sut.executeWithTransaction((prisma) => {
      return prisma.event.createMany({ data: [sampleEvent0, sampleEvent1] });
    });

    sut.executeWithTransaction((prisma) => {
      return prisma.event.create({ data: sampleEvent2 });
    });

    sut.executeWithTransaction((prisma) => {
      return prisma.event.create({ data: sampleEvent3 });
    });

    // When
    await sut.executeTransaction();

    // Then
    const events = await prismaService.event.findMany({});

    expect(events).toStrictEqual(expected);
  });

  it('Given some registered callbacks when executeWithTransaction throws error then none of registered changes should be persisted', async () => {
    // Given
    const { sut, prismaService } = fixture;
    const sampleEvent0 = sampleDatabaseEvent();
    const sampleEvent1 = sampleDatabaseEvent();
    const sampleEvent2 = sampleDatabaseEvent();
    const sampleEvent3 = sampleDatabaseEvent();
    const expected: Event[] = [];

    sut.executeWithTransaction((prisma) => {
      return prisma.event.createMany({ data: [sampleEvent0, sampleEvent1] });
    });

    sut.executeWithTransaction((prisma) => {
      return prisma.event.create({ data: sampleEvent2 });
    });

    sut.executeWithTransaction((prisma) => {
      return prisma.event.create({ data: sampleEvent3 });
    });

    sut.executeWithTransaction((prisma) => {
      return prisma.$queryRaw`RAISE 'throw inside transaction'`;
    });

    // When-Then
    await expect(sut.executeTransaction()).rejects.toThrow();

    const events = await prismaService.event.findMany({});

    expect(events).toStrictEqual(expected);
  });

  it(`Given two transactions [sut0, sut1] running concurrently with some registered callbacks 
      When sut0 throws error and sut1 don't
      Then for sut0 none of registered changes should be persisted
      Then for sut1 all registered changes should be persisted`, async () => {
    // Given
    const { sut: sut0, sut1, prismaService } = fixture;
    const sampleEvent0 = sampleDatabaseEvent();
    const sampleEvent1 = sampleDatabaseEvent();
    const expected = [expect.objectContaining(sampleEvent1)];

    sut0.executeWithTransaction((prisma) => {
      return prisma.event.create({ data: sampleEvent0 });
    });

    sut0.executeWithTransaction((prisma) => {
      return prisma.$queryRaw`RAISE 'throw inside transaction'`;
    });

    sut1.executeWithTransaction((prisma) => {
      return prisma.event.create({ data: sampleEvent1 });
    });

    // When-Then
    await Promise.all([sut1.executeTransaction(), expect(sut0.executeTransaction()).rejects.toThrow()]);

    const events = await prismaService.event.findMany({});

    expect(events).toEqual(expected);
  });
});
