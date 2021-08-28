import { Test, TestingModule } from '@nestjs/testing';
import { LearningMaterials } from '@prisma/client';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';
import waitForExpect from 'wait-for-expect';

import { cleanupDatabase } from '@/common/test-utils';
import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { PrismaService } from '@/prisma/prisma.service';
import { UserId } from '@/users/users.types';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { AppModule } from '../../../app.module';

const SAMPLE_MATERIALS_URL = 'https://app.process.st/runs/jNMTGn96H8Xe3H8DbcpJOg';

async function learningMaterialsTestModule() {
  const app: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  await app.init();

  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);
  const prismaService = app.get<PrismaService>(PrismaService);

  await cleanupDatabase(prismaService);

  function eventOccurred(event: ApplicationEvent): void {
    eventBus.publishAll([event]);
  }

  async function expectReadModel(expectation: { courseUserId: UserId; readModel: LearningMaterials | null }) {
    await waitForExpect(() =>
      expect(
        prismaService.learningMaterials.findUnique({ where: { courseUserId: expectation.courseUserId } }),
      ).resolves.toStrictEqual(expectation.readModel),
    );
  }

  async function close() {
    await app.close();
  }

  return { eventOccurred, expectReadModel, close };
}

function learningMaterialsUrlWasGeneratedForUser(
  courseUserId: UserId,
): ApplicationEvent<LearningMaterialsUrlWasGenerated> {
  return {
    type: 'LearningMaterialsUrlWasGenerated',
    id: uuid(),
    occurredAt: new Date(),
    data: {
      learningMaterialsId: `learningMaterialsId-${courseUserId}`,
      courseUserId,
      materialsUrl: SAMPLE_MATERIALS_URL,
    },
    metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
    streamVersion: 1,
    streamName: EventStreamName.from('LearningMaterialsUrl', courseUserId),
  };
}

describe('Read Slice | Learning Materials', () => {
  let moduleUnderTest: AsyncReturnType<typeof learningMaterialsTestModule>;

  beforeEach(async () => {
    moduleUnderTest = await learningMaterialsTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('when LearningMaterialsUrlWasGenerated occurred, then read model should be updated', async () => {
    // Given
    const userId1 = uuid();
    const userId2 = uuid();

    // When
    moduleUnderTest.eventOccurred(learningMaterialsUrlWasGeneratedForUser(userId1));

    // Then
    await moduleUnderTest.expectReadModel({
      courseUserId: userId1,
      readModel: {
        id: `learningMaterialsId-${userId1}`,
        url: SAMPLE_MATERIALS_URL,
        courseUserId: userId1,
      },
    });
    await moduleUnderTest.expectReadModel({
      courseUserId: userId2,
      readModel: null,
    });

    // When
    moduleUnderTest.eventOccurred(learningMaterialsUrlWasGeneratedForUser(userId2));

    // Then
    await moduleUnderTest.expectReadModel({
      courseUserId: userId2,
      readModel: {
        id: `learningMaterialsId-${userId2}`,
        url: SAMPLE_MATERIALS_URL,
        courseUserId: userId2,
      },
    });
  });
});
