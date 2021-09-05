import { TaskWasCompleted } from '@/events/task-was-completed.domain-event';
import { CompleteTask } from '@/module/commands/complete-task.domain-command';

export function completeTask(
  pastEvents: TaskWasCompleted[],
  { data: { learningMaterialsId, taskId } }: CompleteTask,
): TaskWasCompleted[] {
  const wasTaskAlreadyCompleted = (events: TaskWasCompleted[], commandTaskId: string): boolean => {
    return !!events.find(({ data: { taskId: pastEventTaskId } }) => pastEventTaskId === commandTaskId);
  };

  if (wasTaskAlreadyCompleted(pastEvents, taskId)) {
    throw new Error('Task was already completed');
  }

  const newEvent: TaskWasCompleted = {
    type: 'TaskWasCompleted',
    data: {
      taskId,
      learningMaterialsId,
    },
  };

  return [newEvent];
}
