import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GenerateLearningMaterialsUrlApplicationCommand } from '../../../shared/commands/generate-learning-materials-url.application-command';
import { APPLICATION_SERVICE, ApplicationService } from '../../shared/application/application-service';
import { EventStreamName } from '../../shared/application/event-stream-name.valueboject';
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
    // console.log(this.learningMaterialsUrlGenerator, this.usersPort)
    const userFullName = await this.usersPort.getUserFullNameById(command.data.userId);
    const learningMaterialsUrl = await this.learningMaterialsUrlGenerator.generateUrlFor(userFullName);

    const eventStream = EventStreamName.from('LearningMaterialsUrl', command.data.userId);

    await this.applicationService.execute<LearningMaterialsUrlDomainEvent>(
      eventStream,
      { causationId: command.id, correlationId: command.metadata.correlationId },
      (pastEvents) => generateLearningMaterialsUrl(pastEvents, command, learningMaterialsUrl),
    );
  }
}
