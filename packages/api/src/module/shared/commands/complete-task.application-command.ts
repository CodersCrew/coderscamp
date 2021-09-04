import { AbstractApplicationCommand } from '@/module/application-command-events';

import { CompleteTask } from './complete-task.domain-command';

export class CompleteTaskApplicationCommand extends AbstractApplicationCommand<CompleteTask> {}
