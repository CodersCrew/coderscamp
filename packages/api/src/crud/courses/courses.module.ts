import { Module } from '@nestjs/common';

import { CoursesController } from './courses.controller';
import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';

@Module({
  providers: [CoursesService, CoursesRepository],
  controllers: [CoursesController],
})
export class CoursesModule {}
