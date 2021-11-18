import { AbstractApplicationCommand } from '@/module/application-command-events';

export type UncompleteTask = {
  type: 'UncompleteTask';
  data: { learningMaterialsId: string; taskId: string };
};

export const uncompleteTaskCommand = (data: UncompleteTask['data']): UncompleteTask => ({
  type: 'UncompleteTask',
  data
})

export class UncompleteTaskApplicationCommand extends AbstractApplicationCommand<UncompleteTask> {}
