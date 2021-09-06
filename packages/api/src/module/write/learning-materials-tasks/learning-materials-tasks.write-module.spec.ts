import { AsyncReturnType } from 'type-fest';

import { CompleteTaskApplicationCommand } from '@/module/commands/complete-task.application-command';
import { TaskWasCompleted } from '@/module/events/task-was-completed.domain-event';

import { CommandBuilder } from '../shared/application/application-command.factory';
import { EventStreamName } from '../shared/application/event-stream-name.value-object';
import { learningMaterialsTasksTestModule } from './learning-materials-tasks.test-module';

describe('learning materials tasks', () => {
  let module: AsyncReturnType<typeof learningMaterialsTasksTestModule>;
  let commandBuilder: (
    taskId?: string,
    learningMaterialsId?: string,
  ) => ReturnType<CommandBuilder<CompleteTaskApplicationCommand>>;
  let generateLearningMaterials: (learningMaterialsId?: string) => Promise<void>;

  it('should change state of the task to complete', async () => {
    // Given
    const command = commandBuilder();

    // When
    await generateLearningMaterials();
    await module.executeCommand(() => command);

    // Then
    await module.expectEventPublishedLastly<TaskWasCompleted>({
      type: 'TaskWasCompleted',
      data: {
        learningMaterialsId: command.data.learningMaterialsId,
        taskId: command.data.taskId,
      },
      streamName: EventStreamName.from('LearningMaterialsTasks', command.data.learningMaterialsId),
    });
  });

  it('should not change task state if task is already completed', async () => {
    // Given
    const command = commandBuilder();

    // When
    await generateLearningMaterials();
    await module.executeCommand(() => command);

    // Then
    await expect(() => module.executeCommand(() => command)).rejects.toThrow();
  });

  it.todo("should throw exception if materials haven't been yet generated");

  beforeEach(async () => {
    module = await learningMaterialsTasksTestModule();
  });

  afterEach(async () => {
    await module.close();
  });

  beforeAll(async () => {
    const LEARNING_MATERIALS_ID = 'ZpMpw2eh1llFCGKZJEN6r';
    const COURSE_USER_ID = 'Mbs34f1BTQDHxHv3fb68c';

    commandBuilder = (taskId = 'VmkxXnPG02CaUNV8Relzk', learningMaterialsId = LEARNING_MATERIALS_ID) => ({
      class: CompleteTaskApplicationCommand,
      type: 'CompleteTask',
      data: { taskId, learningMaterialsId },
    });

    generateLearningMaterials = (learningMaterialsId = LEARNING_MATERIALS_ID) => {
      return module.eventOccurred(
        EventStreamName.from('LearningMaterialsUrl', COURSE_USER_ID),
        {
          type: 'LearningMaterialsUrlWasGenerated',
          data: {
            learningMaterialsId,
            courseUserId: COURSE_USER_ID,
            materialsUrl:
              'https://app.process.st/runs/Jan%20Kowalski-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
          },
        },
        0,
      );
    };
  });
});
