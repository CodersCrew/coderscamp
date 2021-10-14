import { LearningMaterials } from '@prisma/client';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';
import waitForExpect from 'wait-for-expect';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { LearningMaterialsReadModule } from '@/read/learning-materials/learning-materials.read-module';
import { UserId } from '@/shared/domain.types';
import { initReadTestModule } from '@/shared/test-utils';
import { StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

const SAMPLE_MATERIALS_URL = 'https://app.process.st/runs/jNMTGn96H8Xe3H8DbcpJOg';

async function learningMaterialsTestModule() {
  const module = await initReadTestModule({ modules: [LearningMaterialsReadModule] });

  async function expectReadModel(expectation: { courseUserId: UserId; readModel: LearningMaterials | null }) {
    await waitForExpect(async () => {
      const result = await module.prismaService.learningMaterials.findUnique({
        where: { courseUserId: expectation.courseUserId },
      });

      expect(result).toStrictEqual(expectation.readModel);
    });
  }

  return { ...module, expectReadModel };
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
  };
}

describe('Read Slice | Learning Materials', () => {
  let sut: AsyncReturnType<typeof learningMaterialsTestModule>;

  beforeEach(async () => {
    sut = await learningMaterialsTestModule();
  });

  afterEach(async () => {
    await sut.close();
  });

  it('when LearningMaterialsUrlWasGenerated occurred, then read model should be updated', async () => {
    // Given
    const userId1 = sut.randomUuid();
    const userId2 = sut.randomUuid();

    // When
    await sut.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', userId1),
      learningMaterialsUrlWasGeneratedForUser(userId1),
    );

    // Then
    await sut.expectReadModel({
      courseUserId: userId1,
      readModel: {
        id: `learningMaterialsId-${userId1}`,
        url: SAMPLE_MATERIALS_URL,
        courseUserId: userId1,
      },
    });
    await sut.expectReadModel({
      courseUserId: userId2,
      readModel: null,
    });

    // When
    await sut.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', userId2),
      learningMaterialsUrlWasGeneratedForUser(userId2),
    );

    // Then
    await sut.expectReadModel({
      courseUserId: userId2,
      readModel: {
        id: `learningMaterialsId-${userId2}`,
        url: SAMPLE_MATERIALS_URL,
        courseUserId: userId2,
      },
    });
  });
});
