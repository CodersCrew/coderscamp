import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';

import { PrismaModule } from '../../prisma/prisma.module';
import { ApplicationEventBus } from './application/application.event-bus';
import { APPLICATION_SERVICE } from './application/application-service';
import { ApplicationCommandFactory } from './application/command.factory';
import { EVENT_STORE } from './application/event-repository';
import { ID_GENERATOR } from './application/id-generator';
import { TIME_PROVIDER } from './application/time-provider.port';
import { EventStoreApplicationService } from './infrastructure/application-service/event-store-application-service';
import { InMemoryEventRepository } from './infrastructure/event-repository/in-memory-event-repository';
import { PrismaEventRepository } from './infrastructure/event-repository/prisma-event-repository.service';
import { UuidGenerator } from './infrastructure/id-generator/uuid-generator';
import { SystemTimeProvider } from './infrastructure/time-provider/system-time-provider';

@Module({
  imports: [CqrsModule],
  providers: [
    ApplicationEventBus,
    {
      provide: TIME_PROVIDER,
      useClass: SystemTimeProvider,
    },
    {
      provide: ID_GENERATOR,
      useClass: UuidGenerator,
    },
    {
      provide: EVENT_STORE,
      useClass: PrismaEventRepository,
    },
    // {
    //   provide: EVENT_STORE,
    //   useClass: InMemoryEventRepository,
    // },
    {
      provide: APPLICATION_SERVICE,
      useClass: EventStoreApplicationService,
    },
    ApplicationCommandFactory,
  ],
  exports: [CqrsModule, ApplicationCommandFactory, TIME_PROVIDER, ID_GENERATOR, APPLICATION_SERVICE],
})
export class SharedModule {}
