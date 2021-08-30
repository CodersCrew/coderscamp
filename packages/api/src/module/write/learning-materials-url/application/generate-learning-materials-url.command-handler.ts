import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GenerateLearningMaterialsUrlApplicationCommand } from '@/commands/generate-learning-materials-url.application-command';
import { APPLICATION_SERVICE, ApplicationService } from '@/write/shared/application/application-service';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

import { LearningMaterialsUrlDomainEvent } from '../domain/events';
import { generateLearningMaterialsUrl } from '../domain/generateLearningMaterialsUrl';
import { LEARNING_MATERIALS_URL_GENERATOR, LearningMaterialsUrlGenerator } from './learning-materials-url-generator';
import { USERS_PORT, UsersPort } from './users.port';

@CommandHandler(GenerateLearningMaterialsUrlApplicationCommand)
export class GenerateLearningMaterialsUrlCommandHandler
  implements ICommandHandler<GenerateLearningMaterialsUrlApplicationCommand>
{
  constructor(
    @Inject(APPLICATION_SERVICE)
    private readonly applicationService: ApplicationService,
    @Inject(LEARNING_MATERIALS_URL_GENERATOR)
    private readonly learningMaterialsUrlGenerator: LearningMaterialsUrlGenerator,
    @Inject(USERS_PORT) private readonly usersPort: UsersPort,
  ) {}

  async execute(command: GenerateLearningMaterialsUrlApplicationCommand): Promise<void> {
    const userFullName = await this.usersPort.getUserFullNameById(command.data.courseUserId);
    const learningMaterials = await this.learningMaterialsUrlGenerator.generateUrlFor(userFullName);

    const eventStream = EventStreamName.from('LearningMaterialsUrl', command.data.courseUserId);

    await this.applicationService.execute<LearningMaterialsUrlDomainEvent>(
      eventStream,
      { causationId: command.id, correlationId: command.metadata.correlationId },
      (pastEvents) => generateLearningMaterialsUrl(pastEvents, command, learningMaterials.url, learningMaterials.id),
    );
  }
}
