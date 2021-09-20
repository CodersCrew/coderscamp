import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { RegisterCourseUserApplicationCommand } from '@/module/commands/register-course-user';
import { CourseUserWasRegistered } from '@/module/events/course-user-was-registered.domain-event';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { registerCourseUser } from '../domain/register-course-user';

@CommandHandler(RegisterCourseUserApplicationCommand)
export class RegisterCourseUserApplicationCommandHandler
  implements ICommandHandler<RegisterCourseUserApplicationCommand>
{
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
  ) {}

  async execute(command: RegisterCourseUserApplicationCommand): Promise<void> {
    const eventStreamName = EventStreamName.from('CourseUser', `${command.data.courseId}_${command.data.userId}`);

    await this.applicationService.execute<CourseUserWasRegistered>(
      eventStreamName,
      { causationId: command.id, correlationId: command.metadata.correlationId },
      (pastEvents) => registerCourseUser(pastEvents, command),
    );
  }
}
