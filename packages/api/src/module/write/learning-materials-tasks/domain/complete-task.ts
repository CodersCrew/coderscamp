import { TaskWasCompleted, taskWasCompletedEvent } from '@/events/task-was-completed.domain-event';
import { CompleteTask } from '@/module/commands/complete-task';
import { LearningMaterialsTasksDomainEvent } from '@/write/learning-materials-tasks/domain/events';

export const completeTask =
  ({ data }: CompleteTask) =>
  (pastEvents: LearningMaterialsTasksDomainEvent[]): TaskWasCompleted[] => {
    const state = pastEvents
      .filter((pastEvent) => pastEvent.data.taskId === data.taskId)
      .reduce<{ completed: boolean }>(
        (acc, event) => {
          switch (event.type) {
            case 'TaskWasCompleted': {
              return { completed: true };
            }
            case 'TaskWasUncompleted': {
              return { completed: false };
            }
            default: {
              return acc;
            }
          }
        },
        { completed: false },
      );

    if (state.completed) {
      throw new Error('Task was already completed');
    }

    const newEvent = taskWasCompletedEvent(data);

    return [newEvent];
  };
