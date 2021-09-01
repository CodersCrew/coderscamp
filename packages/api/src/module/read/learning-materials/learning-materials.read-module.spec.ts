import { LearningMaterials } from '@prisma/client';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';
import waitForExpect from 'wait-for-expect';

import { initTestModule } from '@/common/test-utils';
import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { UserId } from '@/users/users.types';
import { StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

const SAMPLE_MATERIALS_URL = 'https://app.process.st/runs/jNMTGn96H8Xe3H8DbcpJOg';

async function learningMaterialsTestModule() {
  const { prismaService, close, eventOccurred } = await initTestModule();

  async function expectReadModel(expectation: { courseUserId: UserId; readModel: LearningMaterials | null }) {
    await waitForExpect(async () => {
      const result = await prismaService.learningMaterials.findUnique({
        where: { courseUserId: expectation.courseUserId },
      });

      expect(result).toStrictEqual(expectation.readModel);
    });
  }

  return { eventOccurred, expectReadModel, close };
}

function learningMaterialsUrlWasGeneratedForUser(
  courseUserId: UserId,
): StorableEvent<LearningMaterialsUrlWasGenerated> {
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
