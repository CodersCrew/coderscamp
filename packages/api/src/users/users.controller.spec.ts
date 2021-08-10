import { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import type { RegisteredUser } from '@coderscamp/shared/models';

import { UserRepositoryPort } from '../contracts/user.repository';
import { MemoryDbService } from '../memoryDB/memoryDB.service';
import { PgMemUserRepositoryAdapter } from '../memoryDB/user.repository';
import { UsersController } from './users.controller';
import { CommandHandlers, EventHandlers } from './users.module';
import { UsersRepository } from './users.repository';

describe('Users controller', () => {
  let app: INestApplication;
  let usersController: UsersController;
  let userMock: RegisteredUser;

  describe('getMe', () => {
    it('Should return user', async () => {
      const user = await usersController.getMe(userMock.id);

      expect(user).toMatchObject(userMock);
    });
  });

  async function setup() {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [UsersController],
      providers: [
        MemoryDbService,
        {
          provide: UserRepositoryPort,
          useClass: PgMemUserRepositoryAdapter,
        },
        UsersRepository,
        ...CommandHandlers,
        ...EventHandlers,
      ],
    }).compile();

    app = module.createNestApplication();
    usersController = app.get<UsersController>(UsersController);

    const db = app.get<MemoryDbService>(MemoryDbService);
    const repository = app.get<UserRepositoryPort>(UserRepositoryPort);

    await Promise.all([app.init(), db.migrate()]);
    userMock = await repository.create({
      githubId: 12345678,
      fullName: 'Name',
      email: 'example@test.com',
      image: 'https://photo-url.com',
    });
  }

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });
});
