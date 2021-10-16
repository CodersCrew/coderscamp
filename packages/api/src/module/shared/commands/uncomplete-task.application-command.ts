import { AbstractApplicationCommand } from "@/module/application-command-events";
import { UncompleteTask } from "@/commands/uncomplete-task.domain-command";

export class UncompleteTaskApplicationCommand extends AbstractApplicationCommand<UncompleteTask> {}
