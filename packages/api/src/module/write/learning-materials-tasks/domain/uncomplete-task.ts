import { UncompleteTask } from '@/module/commands/uncomplete-task';
import { TaskWasUncompleted, taskWasUncompletedEvent } from '@/events/task-was-uncompleted-event.domain-event';
import { LearningMaterialsTasksDomainEvent } from '@/write/learning-materials-tasks/domain/events';

export const uncompleteTask =
  ({ data }: UncompleteTask) =>
  (pastEvents: LearningMaterialsTasksDomainEvent[]): TaskWasUncompleted[] => {
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

    if (!state.completed) {
      throw new Error('Can not uncomplete task that was not completed yet.');
    }

    const newEvent = taskWasUncompletedEvent(data);

    return [newEvent];
  };
