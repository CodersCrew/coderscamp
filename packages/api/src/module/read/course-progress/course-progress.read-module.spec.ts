import { CourseProgress } from '@prisma/client';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';
import waitForExpect from 'wait-for-expect';

import { initTestModule } from '@/common/test-utils';
import { ApplicationEvent } from '@/module/application-command-events';
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

  async function expectReadModel(expectation: { learningMaterialsId: string; readModel: CourseProgress | null }) {
    await waitForExpect(() =>
      expect(
        prismaService.courseProgress.findUnique({ where: { learningMaterialsId: expectation.learningMaterialsId } }),
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
    const learningMaterialCompletedTaskAfterEvent = initialLearningMaterialCompletedTask + 1;

    await moduleUnderTest.addExampleData({
      id,
      courseUserId,
      learningMaterialsId,
      learningMaterialsCompletedTasks: initialLearningMaterialCompletedTask,
    });

    // When
    moduleUnderTest.eventOccurred(taskWasCompletedForLearningMaterials(learningMaterialsId));

    // Then
    await moduleUnderTest.expectReadModel({
      learningMaterialsId,
      readModel: {
        id,
        learningMaterialsId,
        courseUserId,
        learningMaterialsCompletedTasks: learningMaterialCompletedTaskAfterEvent,
      },
    });
  });
});
