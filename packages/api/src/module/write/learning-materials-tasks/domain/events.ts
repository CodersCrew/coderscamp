import { TaskWasCompleted } from '@/events/task-was-completed.domain-event';
import { TaskWasUncompleted } from '@/events/task-was-uncompleted-event.domain-event';

export type LearningMaterialsTasksDomainEvent = TaskWasCompleted | TaskWasUncompleted;
