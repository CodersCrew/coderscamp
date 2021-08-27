import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { LearningMaterials } from '@prisma/client';
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

  function eventOccurred(event: ApplicationEvent): void {
    eventBus.publishAll([event]);
  }

  function readModelForCourseUser(courseUserId: UserId): Promise<LearningMaterials | null> {
    return prismaService.learningMaterials.findUnique({ where: { courseUserId } });
  }

  return { eventOccurred, readModelForCourseUser };
}

const SAMPLE_MATERIALS_URL =
  'https://app.process.st/runs/Piotr%20Nowak-sbAPITNMsl2wW6j2cg1H2A/tasks/oFBpTVsw_DS_O5B-OgtHXA';

function learningMaterialsUrlWasGeneratedForUser(
  courseUserId: UserId,
): ApplicationEvent<LearningMaterialsUrlWasGenerated> {
  return {
    type: 'LearningMaterialsUrlWasGenerated',
    id: uuid(),
    occurredAt: new Date(),
    data: {
      learningMaterialsId: `learningMaterialsId-${courseUserId}`,
      courseUserId,
      materialsUrl: SAMPLE_MATERIALS_URL,
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
    const userId1 = uuid();
    const userId2 = uuid();

    // When

    moduleUnderTest.eventOccurred(learningMaterialsUrlWasGeneratedForUser(userId1));

    // Then
    await expect(moduleUnderTest.readModelForCourseUser(userId1)).resolves.toStrictEqual({
      id: `learningMaterialsId-${userId1}`,
      url: SAMPLE_MATERIALS_URL,
      courseUserId: userId1,
    });
    await expect(moduleUnderTest.readModelForCourseUser(userId2)).resolves.toBeNull();

    // When
    moduleUnderTest.eventOccurred(learningMaterialsUrlWasGeneratedForUser(userId1));

    // Then
    await expect(moduleUnderTest.readModelForCourseUser(userId2)).resolves.toStrictEqual({
      id: `learningMaterialsId-${userId2}`,
      url: SAMPLE_MATERIALS_URL,
      courseUserId: userId2,
    });
  });
});
