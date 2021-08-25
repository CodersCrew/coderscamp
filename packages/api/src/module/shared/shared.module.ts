import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { PrismaModule } from '../../prisma/prisma.module';
import { ApplicationEventBus } from './application/application.event-bus';
import { APPLICATION_SERVICE } from './application/application-service';
import { EVENT_STORE } from './application/event-repository';
import { ID_GENERATOR } from './application/id-generator';
import { TIME_PROVIDER } from './application/time-provider.port';
import { EventStoreApplicationService } from './infrastructure/application-service/event-store-application-service';
import { PrismaEventRepository } from './infrastructure/event-repository/prisma-event-repository.service';
import { UuidGenerator } from './infrastructure/id-generator/uuid-generator';
import { SystemTimeProvider } from './infrastructure/time-provider/system-time-provider';
import {ApplicationCommandFactory} from "./application/application-command.factory";

@Module({
  imports: [CqrsModule, EventEmitterModule.forRoot()],
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
