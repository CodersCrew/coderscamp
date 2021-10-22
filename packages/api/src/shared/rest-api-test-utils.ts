import { INestApplication } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';

import { AuthModule } from '@/crud/auth/auth.module';
import { PrismaService } from '@/prisma/prisma.service';
import { ApplicationCommandFactory } from '@/write/shared/application/application-command.factory';
import { UuidGenerator } from '@/write/shared/infrastructure/id-generator/uuid-generator';
import { hashPassword } from '@/write/shared/infrastructure/password-encoder/crypto-password-encoder';
import { SystemTimeProvider } from '@/write/shared/infrastructure/time-provider/system-time-provider';

import { setupMiddlewares } from '../app.middlewares';
import { eventEmitterRootModule } from '../event-emitter.root-module';

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

  setupMiddlewares(app);

  await app.init();

  const http = supertest(app.getHttpServer());

  let exampleUserCreated = false;
  let isUserLogged = false;

  const exampleAuthUser = {
    id: uuid(),
    email: 'example1@email.com',
    password: 'stronk',
    role: 'User',
  } as const;

  const addExampleUser = async () => {
    const hashedPassword = await hashPassword(exampleAuthUser.password);

    await prismaService.authUser.create({
      data: {
        ...exampleAuthUser,
        password: hashedPassword,
      },
    });

    exampleUserCreated = true;
  };

  const removeExampleUser = async () => {
    await prismaService.authUser.delete({
      where: {
        email: exampleAuthUser.email,
      },
    });
    exampleUserCreated = false;
  };

  const loginUser = async () => {
    if (!exampleUserCreated) {
      await addExampleUser();
    }

    const response = await http.post('/api/auth/login').send(exampleAuthUser);

    if (response.status !== 204) {
      throw new Error('Example user login failed');
    }

    const cookie = response.get('set-cookie');

    isUserLogged = true;

    return cookie;
  };

  const logoutUser = async () => {
    const response = await http.post('/api/auth/logout').send();

    if (response.status !== 201) throw new Error('Logout user failed');

    isUserLogged = false;
  };

  async function close() {
    await app.close();

    if (isUserLogged && 5 < 4) await logoutUser();

    if (exampleUserCreated) await removeExampleUser();
  }

  return { http, close, commandBusExecute, loginUser, logoutUser, isUserLogged };
}
