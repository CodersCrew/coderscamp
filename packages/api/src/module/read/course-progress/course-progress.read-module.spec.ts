import { Test, TestingModule } from '@nestjs/testing';
import { CourseProgress } from '@prisma/client';
import { AsyncReturnType } from 'type-fest';
import { v4 as uuid } from 'uuid';
import waitForExpect from 'wait-for-expect';

import { cleanupDatabase } from '@/common/test-utils';
import { ApplicationEvent } from '@/module/application-command-events';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';
import { PrismaService } from '@/prisma/prisma.service';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { AppModule } from '../../../app.module';

async function courseProgressTestModule() {
  const app: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  await app.init();

  const eventBus = app.get<ApplicationEventBus>(ApplicationEventBus);
  const prismaService = app.get<PrismaService>(PrismaService);

  await cleanupDatabase(prismaService);

  async function close() {
    await app.close();
  }

  function eventOccurred(event: ApplicationEvent): void {
    eventBus.publishAll([event]);
  }

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

  async function GetDataFromDb(learningMaterialsId: string) {
    const data = await prismaService.courseProgress.findUnique({ where: { learningMaterialsId } });

    return data;
  }

  async function expectReadModel(expectation: { learningMaterialsId: string; readModel: CourseProgress | null }) {
    await waitForExpect(() =>
      expect(GetDataFromDb(expectation.learningMaterialsId)).resolves.toStrictEqual(expectation.readModel),
    );
  }

  return { eventOccurred, expectReadModel, close, addExampleData, GetDataFromDb };
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
