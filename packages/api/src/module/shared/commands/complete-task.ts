import { AbstractApplicationCommand } from '@/module/application-command-events';

export type CompleteTask = {
  type: 'CompleteTask';
  data: { learningMaterialsId: string; taskId: string };
};

export const completeTaskCommand = (data: CompleteTask['data']): CompleteTask => ({
  type: 'CompleteTask',
  data
})
export class CompleteTaskApplicationCommand extends AbstractApplicationCommand<CompleteTask> {}
