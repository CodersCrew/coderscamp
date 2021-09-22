import { initWriteTestModule } from '@/shared/test-utils';
import { LearningMaterialsTasksModule } from '@/write/learning-materials-tasks/learning-materials-tasks.write-module';

export async function learningMaterialsTasksTestModule() {
  return initWriteTestModule({
    modules: [LearningMaterialsTasksModule],
  });
}
