import { INestApplication } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { CommandHandlers, EventHandlers } from './users.module';
import { UsersRepository } from './users.repository';

describe('Users controller', () => {
  let app: INestApplication;
  let usersController: UsersController;
  let usersRepository: Partial<UsersRepository>;
  const userId = 'Id';

  describe('getMe', () => {
    it('Should return user', async () => {
      usersRepository.findById = jest.fn().mockResolvedValue({ id: userId });

      const result = await usersController.getMe(userId);

      expect(usersRepository.findById).toBeCalledWith(userId);
      expect(result).toEqual({ id: userId });
    });
  });

  async function setup() {
    usersRepository = {
      findById: jest.fn(),
    };

    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersRepository,
          useValue: usersRepository,
        },
        ...CommandHandlers,
        ...EventHandlers,
      ],
    }).compile();

    app = module.createNestApplication();
    usersController = app.get<UsersController>(UsersController);
    usersRepository = app.get<UsersRepository>(UsersRepository);

    await app.init();
  }

  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await app.close();
  });
});
