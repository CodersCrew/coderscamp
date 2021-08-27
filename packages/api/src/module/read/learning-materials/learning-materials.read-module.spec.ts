import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuid } from 'uuid';

import { LearningMaterialsUrlWasGenerated } from '@/events/learning-materials-url-was-generated.domain-event';
import { ApplicationEvent } from '@/module/application-command-events';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { LearningMaterialsReadModule } from '@/read/learning-materials/learning-materials.read-module';
import { UserId } from '@/users/users.types';
import { ApplicationEventBus } from '@/write/shared/application/application.event-bus';
import { EventStreamName } from '@/write/shared/application/event-stream-name.value-object';

async function learningMaterialsTestModule() {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      EventEmitterModule.forRoot({
        wildcard: true,
        delimiter: '.',
        newListener: false,
        removeListener: false,
        maxListeners: 40,
        verboseMemoryLeak: false,
        ignoreErrors: false,
      }),
      PrismaModule,
      LearningMaterialsReadModule,
    ],
  }).compile();

  const eventBus = module.get<ApplicationEventBus>(ApplicationEventBus);
  const prismaService = module.get<PrismaService>(PrismaService);

  function eventOccurred(event: ApplicationEvent) {
    eventBus.publishAll([event]);
  }

  function readModelForCourseUser(courseUserId: UserId) {
    return prismaService.learningMaterials.findUnique({ where: { courseUserId } });
  }

  return { eventOccurred, readModelForCourseUser };
}

function learningMaterialsUrlWasGeneratedForUser(
  courseUserId: UserId,
): ApplicationEvent<LearningMaterialsUrlWasGenerated> {
  return {
    type: 'LearningMaterialsUrlWasGenerated',
    id: 'generatedId1',
    occurredAt: new Date(),
    data: {
      learningMaterialsId: 'sbAPITNMsl2wW6j2cg1H2A',
      courseUserId,
      materialsUrl: 'https://app.process.st/runs/Piotr%20Nowak-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA',
    },
    metadata: { correlationId: 'generatedId1', causationId: 'generatedId1' },
    streamVersion: 1,
    streamName: EventStreamName.from('LearningMaterialsUrl', courseUserId),
  };
}

describe('Read Slice | Learning Materials', () => {
  it('when LearningMaterialsUrlWasGenerated occurred, then read model should be updated', async () => {
    // Given
    const moduleUnderTest = await learningMaterialsTestModule();

    // When
    const userId1 = uuid();

    moduleUnderTest.eventOccurred(learningMaterialsUrlWasGeneratedForUser(userId1));

    // Then
    await expect(moduleUnderTest.readModelForCourseUser(userId1)).resolves.toStrictEqual({});
  });
});
