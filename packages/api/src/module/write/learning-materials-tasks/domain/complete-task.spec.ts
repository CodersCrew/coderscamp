import { TaskWasUncompleted, taskWasUncompletedEvent } from '@/events/task-was-uncompleted-event.domain-event';
import { CompleteTask } from '@/module/commands/complete-task';
import { TaskWasCompleted, taskWasCompletedEvent } from '@/module/events/task-was-completed.domain-event';
import { LearningMaterialsTasksDomainEvent } from '@/write/learning-materials-tasks/domain/events';

import { completeTask } from './complete-task';

describe('complete task', () => {
  const command: CompleteTask = {
    type: 'CompleteTask',
    data: { learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A', taskId: 'L9EXtwmBNBXgo_qh0uzbq' },
  };

  it('should return task was completed', () => {
    // Given
    const pastEvents: TaskWasCompleted[] = [];

    // When
    const events = completeTask(command)(pastEvents);

    // Then
    expect(events).toStrictEqual([
      {
        type: 'TaskWasCompleted',
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId },
      },
    ]);
  });

  it('should return task was completed if other tasks are completed', () => {
    // Given
    const pastEvents: TaskWasCompleted[] = [taskWasCompletedEvent({ learningMaterialsId: command.data.learningMaterialsId, taskId: 'BIt23CR3dLKkHn_a2IM4V' })
    ];

    // When
    const events = completeTask(command)(pastEvents);

    // Then
    expect(events).toStrictEqual([
      {
        type: 'TaskWasCompleted',
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId },
      },
    ]);
  });

  it('should throw exception if task was already completed', () => {
    // Given
    const pastEvents: TaskWasCompleted[] = [taskWasCompletedEvent({ learningMaterialsId: command.data.learningMaterialsId, taskId: 'BIt23CR3dLKkHn_a2IM4V' })
    ];

    // When
    const events = () => completeTask(command)(pastEvents);
    // Then
    expect(events).toThrowError('Task was already completed');
  });

  it('should complete uncompleted task', () => {
    // given
    const pastEvents: TaskWasUncompleted[] = [taskWasUncompletedEvent({ learningMaterialsId: command.data.learningMaterialsId, taskId: 'BIt23CR3dLKkHn_a2IM4V' })
    ];

    // when
    const events = completeTask(command)(pastEvents);

    // then
    expect(events).toStrictEqual([
      {
        type: 'TaskWasCompleted',
        data: { learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId },
      },
    ]);
  });

  it('should complete task if task was completed and then uncompleted', () => {
    // given
    const pastEvents: LearningMaterialsTasksDomainEvent[] = [
      taskWasCompletedEvent({ learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId }),
      taskWasUncompletedEvent({ learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId })
    ];

    // when
    const events = completeTask(command)(pastEvents);

    // then
    expect(events).toStrictEqual(
      [taskWasCompletedEvent({ learningMaterialsId: command.data.learningMaterialsId, taskId: command.data.taskId })]);
  });
});
