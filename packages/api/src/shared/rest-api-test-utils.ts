import { INestApplication } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';

import { AuthUser } from '@coderscamp/shared/models/auth';

import { AuthModule } from '@/crud/auth/auth.module';
import { PrismaService } from '@/prisma/prisma.service';
import { cleanupDatabase } from '@/shared/test-utils';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { UuidGenerator } from '@/write/shared/infrastructure/id-generator/uuid-generator';
import { hashPassword } from '@/write/shared/infrastructure/password-encoder/crypto-password-encoder';
import { SystemTimeProvider } from '@/write/shared/infrastructure/time-provider/system-time-provider';

import { setupMiddlewares } from '../app.middlewares';
import { eventEmitterRootModule } from '../event-emitter.root-module';

const DEFAULT_TEST_PASSWORD = 'stronk';

export async function initTestModuleRestApi(
  controller: Type,
  config?: (module: TestingModuleBuilder) => TestingModuleBuilder,
) {
  const commandBusExecute = jest.fn();
  const moduleBuilder = await Test.createTestingModule({
    providers: [
      {
        provide: CommandBus,
        useValue: { execute: commandBusExecute, register: jest.fn() },
      },
      {
        provide: ApplicationCommandFactory,
        useValue: new ApplicationCommandFactory(new UuidGenerator(), new SystemTimeProvider()),
      },
    ],
    controllers: [controller],
    imports: [eventEmitterRootModule, AuthModule],
  });
  const moduleRef = await (config ? config(moduleBuilder) : moduleBuilder).compile();

  const app: INestApplication = moduleRef.createNestApplication();

  const prismaService = app.get<PrismaService>(PrismaService);

  await cleanupDatabase(prismaService);

  setupMiddlewares(app);

  await app.init();

  const http = supertest(app.getHttpServer());

  const randomUser = () => {
    const id = uuid();

    return {
      id,
      email: `${id}@email.com`,
      password: DEFAULT_TEST_PASSWORD,
    };
  };

  const registerUser = async (userToCreate: Partial<AuthUser> = randomUser()) => {
    const id = userToCreate.id ?? uuid();
    const authUser = {
      id,
      email: `${id}@email.com`,
      password: DEFAULT_TEST_PASSWORD,
      ...userToCreate,
    };
    const hashedPassword = await hashPassword(authUser.password);

    return prismaService.authUser.create({
      data: {
        ...authUser,
        password: hashedPassword,
      },
    });
  };

  const loginUser = async (request: { email: string } = randomUser()) => {
    await registerUser({ email: request.email, password: DEFAULT_TEST_PASSWORD });

    const response = await http.post('/api/auth/login').send(request);

    if (response.status !== 204) {
      throw new Error('Example user login failed');
    }

    return response.get('set-cookie');
  };

  const logoutUser = async () => {
    const response = await http.post('/api/auth/logout').send();

    if (response.status !== 201) {
      throw new Error('Logout user failed');
    }
  };

  const asLoggedUser = async (request: (http: supertest.SuperTest<supertest.Test>) => supertest.Test) => {
    const cookie = await loginUser();

    return request(http).set('Cookie', cookie);
  };

  async function close() {
    await app.close();
  }

  return { http, close, commandBusExecute, loginUser, logoutUser, asLoggedUser };
}
