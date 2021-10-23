import { UncompleteTask } from '@/commands/uncomplete-task.domain-command';
import { AbstractApplicationCommand } from '@/module/application-command-events';

export class UncompleteTaskApplicationCommand extends AbstractApplicationCommand<UncompleteTask> {}
