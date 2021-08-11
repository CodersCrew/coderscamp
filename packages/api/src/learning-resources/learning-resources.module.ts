import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { env } from '@/common/env';

import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { WhenLearningResourcesWasGeneratedThenSendEmailAutomation } from './automation/when-learning-resources-was-generated-then-send-email.automation';
import { GenerateLearningResourcesCommandHandler } from './core/generate-learning-resources.command-handler';
import { LEARNING_RESOURCES_REPOSITORY } from './core/learning-resources.repository';
import { LEARNING_RESOURCES_GENERATOR } from './core/learning-resources-generator';
import { TIME_PROVIDER, TimeProvider } from './core/time-provider.port';
import { USERS_FULL_NAMES, UsersFullNames } from './core/users-full-names.port';
import { WhatAreLearningResourcesForUserQueryHandler } from './core/what-are-learning-resources-for-user.query-handler';
import { LearningResourcesInMemoryRepository } from './infrastructure/learning-resources.in-memory-repository';
import { PuppeteerLearningResourcesGenerator } from './infrastructure/puppeteer-learning-resources-generator';
import { SystemTimeProvider } from './infrastructure/system-time-provider';
import { UserModuleToUsersFullNamesAdapter } from './infrastructure/user-module-to-users-full-names.adapter';
import { UsersFullNamesInMemoryRepository } from './infrastructure/users-full-names.in-memory-repository';
import { LearningResourcesController } from './presentation/rest/learning-resources.controller';

const isProduction = env.NODE_ENV === 'production'; // todo: create config for adapters (like use in-memory db / fixed time etc.)

const modules = isProduction ? [CqrsModule, UsersModule] : [CqrsModule];
const commandHandlers = [GenerateLearningResourcesCommandHandler];
const eventHandlers = [WhenLearningResourcesWasGeneratedThenSendEmailAutomation];
const queryHandlers = [WhatAreLearningResourcesForUserQueryHandler];

const adapters = [
  {
    provide: LEARNING_RESOURCES_REPOSITORY,
    useClass: LearningResourcesInMemoryRepository, // todo: leave for unit test, replace for prod with real database
  },
  {
    provide: TIME_PROVIDER,
    useClass: SystemTimeProvider,
  },
  isProduction
    ? {
        provide: USERS_FULL_NAMES,
        useFactory: (usersRepository: UsersRepository) => new UserModuleToUsersFullNamesAdapter(usersRepository),
        inject: [UsersRepository],
      }
    : {
        provide: USERS_FULL_NAMES,
        useValue: new UsersFullNamesInMemoryRepository({
          '1': { fullName: 'Jan Kowalski' },
          '2': { fullName: 'Katarzyna Nowak' },
        }),
      },
  {
    provide: LEARNING_RESOURCES_GENERATOR,
    useFactory: (timeProvider: TimeProvider, usersFullNames: UsersFullNames) =>
      new PuppeteerLearningResourcesGenerator(timeProvider, usersFullNames),
    inject: [TIME_PROVIDER, USERS_FULL_NAMES],
  },
];

const controllers = [LearningResourcesController];

@Module({
  imports: modules,
  controllers,
  providers: [...commandHandlers, ...queryHandlers, ...eventHandlers, ...adapters],
})
export class LearningResourcesModule {}
