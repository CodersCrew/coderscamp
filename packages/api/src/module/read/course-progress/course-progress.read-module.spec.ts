import { CourseProgress } from '@prisma/client';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';
import waitForExpect from 'wait-for-expect';

import { initTestModule } from '@/common/test-utils';
import { ApplicationEvent } from '@/module/application-command-events';
import { LearningMaterialsUrlWasGenerated } from '@/module/events/learning-materials-url-was-generated.domain-event';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

async function courseProgressTestModule() {
  const { prismaService, close, eventOccurred } = await initTestModule();

  async function addExampleData({
    id,
    learningMaterialsId,
    learningMaterialsCompletedTasks,
    courseUserId,
  }: CourseProgress) {
    await prismaService.courseProgress.create({
      data: {
        id,
        learningMaterialsId,
        learningMaterialsCompletedTasks,
        courseUserId,
      },
    });
  }

  async function expectReadModel(expectation: {
    learningMaterialsId: string;
    readModel: Omit<CourseProgress, 'id'> | null;
  }) {
    await waitForExpect(() =>
      expect(
        prismaService.courseProgress.findUnique({
          where: { learningMaterialsId: expectation.learningMaterialsId },
          select: {
            id: false,
            courseUserId: true,
            learningMaterialsCompletedTasks: true,
            learningMaterialsId: true,
          },
        }),
      ).resolves.toStrictEqual(expectation.readModel),
    );
  }

  return { eventOccurred, expectReadModel, close, addExampleData };
}

function taskWasCompletedForLearningMaterials(learningMaterialsId: string): ApplicationEvent<TaskWasCompleted> {
  return {
    type: 'TaskWasCompleted',
    id: uuid(),
    occurredAt: new Date(),
    data: {
      learningMaterialsId,
      taskId: '123',
    },
    metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
    streamVersion: 1,
    streamName: EventStreamName.from('LearningMaterialsTasks', learningMaterialsId),
  };
}

function learningMaterialsUrlWasGeneratedWithId(id: string): ApplicationEvent<LearningMaterialsUrlWasGenerated> {
  const SAMPLE_MATERIALS_URL = 'https://app.process.st/runs/jNMTGn96H8Xe3H8DbcpJOg';
  const courseUserId = `userId-${id}`;

  return {
    type: 'LearningMaterialsUrlWasGenerated',
    id: uuid(),
    occurredAt: new Date(),
    data: {
      learningMaterialsId: `learningMaterialsId-${id}`,
      courseUserId,
      materialsUrl: SAMPLE_MATERIALS_URL,
    },
    metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
    streamVersion: 1,
    streamName: EventStreamName.from('LearningMaterialsUrl', courseUserId),
  };
}

describe('Read Slice | CourseProgress', () => {
  let moduleUnderTest: AsyncReturnType<typeof courseProgressTestModule>;

  beforeEach(async () => {
    moduleUnderTest = await courseProgressTestModule();
  });

  afterEach(async () => {
    await moduleUnderTest.close();
  });

  it('when taskWasCompleted occurred, then learningMaterialsCompletedTasks should be increased', async () => {
    // Given
    const id = uuid();
    const courseUserId = `userId-${id}`;
    const learningMaterialsId = `learningMaterialsId-${id}`;
    const initialLearningMaterialCompletedTask = 0;

    moduleUnderTest.eventOccurred(learningMaterialsUrlWasGeneratedWithId(id));

    await moduleUnderTest.expectReadModel({
      learningMaterialsId,
      readModel: {
        learningMaterialsId,
        courseUserId,
        learningMaterialsCompletedTasks: initialLearningMaterialCompletedTask,
      },
    });

    // When
    moduleUnderTest.eventOccurred(taskWasCompletedForLearningMaterials(learningMaterialsId));

    // Then
    const learningMaterialCompletedTaskAfterEvent = initialLearningMaterialCompletedTask + 1;

    await moduleUnderTest.expectReadModel({
      learningMaterialsId,
      readModel: {
        learningMaterialsId,
        courseUserId,
        learningMaterialsCompletedTasks: learningMaterialCompletedTaskAfterEvent,
      },
    });
  });
});
