import { CourseProgress } from '@prisma/client';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';
import waitForExpect from 'wait-for-expect';

import { LearningMaterialsUrlWasGenerated } from '@/module/events/learning-materials-url-was-generated.domain-event';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';
import { TaskWasUncompleted } from '@/module/events/task-was-uncompleted-event.domain-event';
import { CourseProgressReadModule } from '@/read/course-progress/course-progress.read-module';
import { initReadTestModule } from '@/shared/test-utils';
import { StorableEvent } from '@/write/shared/application/event-repository';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

const statusTask = (
  learningMaterialsId: string,
  type: 'TaskWasUncompleted' | 'TaskWasCompleted',
): StorableEvent<TaskWasUncompleted | TaskWasCompleted> => {
  return {
    type,
    id: uuid(),
    occurredAt: new Date(),
    data: {
      learningMaterialsId,
      taskId: '2',
    },
    metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
  };
};

const givenData = (id: string) => {
  return {
    id,
    courseUserId: `userId-${id}`,
    learningMaterialsId: `learningMaterialsId-${id}`,
    initialLearningMaterialCompletedTask: 0,
  };
};

async function courseProgressTestModule() {
  const { prismaService, close, eventOccurred } = await initReadTestModule({ modules: [CourseProgressReadModule] });

  async function expectReadModel(expectation: {
    learningMaterialsId: string;
    readModel: Omit<CourseProgress, 'id'> | null;
  }) {
    await waitForExpect(async () => {
      const readModel = await prismaService.courseProgress.findUnique({
        where: { learningMaterialsId: expectation.learningMaterialsId },
        select: {
          id: false,
          courseUserId: true,
          learningMaterialsCompletedTasks: true,
          learningMaterialsId: true,
        },
      });

      expect(readModel).toStrictEqual(expectation.readModel);
    });
  }

  return { eventOccurred, expectReadModel, close };
}

const learningMaterialsUrlWasGeneratedWithId = (id: string): StorableEvent<LearningMaterialsUrlWasGenerated> => {
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
  };
};

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
    const { id, courseUserId, learningMaterialsId, initialLearningMaterialCompletedTask } = givenData(uuid());

    await moduleUnderTest.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', courseUserId),
      learningMaterialsUrlWasGeneratedWithId(id),
    );

    await moduleUnderTest.expectReadModel({
      learningMaterialsId,
      readModel: {
        learningMaterialsId,
        courseUserId,
        learningMaterialsCompletedTasks: initialLearningMaterialCompletedTask,
      },
    });

    // When
    await moduleUnderTest.eventOccurred(
      EventStreamName.from('LearningMaterialsTasks', courseUserId),
      statusTask(learningMaterialsId, 'TaskWasCompleted'),
    );

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

  it('when taskWasUnCompleted then learningMaterialsCompletedTasks should be decrease', async () => {
    // Given
    const { id, courseUserId, learningMaterialsId, initialLearningMaterialCompletedTask } = givenData(uuid());

    await moduleUnderTest.eventOccurred(
      EventStreamName.from('LearningMaterialsUrl', courseUserId),
      learningMaterialsUrlWasGeneratedWithId(id),
    );

    await moduleUnderTest.expectReadModel({
      learningMaterialsId,
      readModel: {
        learningMaterialsId,
        courseUserId,
        learningMaterialsCompletedTasks: initialLearningMaterialCompletedTask,
      },
    });

    // When
    await moduleUnderTest.eventOccurred(
      EventStreamName.from('LearningMaterialsTasks', courseUserId),
      statusTask(learningMaterialsId, 'TaskWasCompleted'),
    );

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

    // When
    await moduleUnderTest.eventOccurred(
      EventStreamName.from('LearningMaterialsTasks', courseUserId),
      statusTask(learningMaterialsId, 'TaskWasUncompleted'),
    );

    // Then
    await moduleUnderTest.expectReadModel({
      learningMaterialsId,
      readModel: {
        learningMaterialsId,
        courseUserId,
        learningMaterialsCompletedTasks: 0,
      },
    });
  });
});
