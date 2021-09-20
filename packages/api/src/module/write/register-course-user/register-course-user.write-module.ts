import { Module } from '@nestjs/common';

import { SharedModule } from '../shared/shared.module';
import { RegisterCourseUserApplicationCommandHandler } from './application/register-course-user.command-handler';

@Module({
  imports: [SharedModule],
  providers: [RegisterCourseUserApplicationCommandHandler],
  exports: [],
})
export class RegisterCourseUserWriteModule {}
