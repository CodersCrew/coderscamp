import { initWriteTestModule } from '@/shared/test-utils';
import { RegisterCourseUserWriteModule } from '@/write/register-course-user/register-course-user.write-module';

export async function registerCourseUserTestModule() {
  return initWriteTestModule({
    modules: [RegisterCourseUserWriteModule],
  });
}
