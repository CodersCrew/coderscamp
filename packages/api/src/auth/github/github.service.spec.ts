import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';

import type { RegisteredUser } from '@coderscamp/shared/models';
import { createObjectMock } from '@coderscamp/shared/utils/test';

import { RegisterUserHandler } from '../../users/commands';
import { FindUserWithGivenGithubIdQueryHandler } from '../../users/queries';
import { UsersRepository } from '../../users/users.repository';
import { GithubService } from './github.service';
import { NotRegisteredUser } from './github.types';

const createUser = (githubId: number): NotRegisteredUser => ({
  fullName: 'Name',
  githubId,
  email: 'example@test.com',
  image: 'https://photo-url.com',
});

describe('Github service', () => {
  let service: GithubService;
  let usersRepository: Partial<UsersRepository>;
  let registerUserHandler: RegisterUserHandler;
  let findUserWithGivenGithubIdQueryHandler: FindUserWithGivenGithubIdQueryHandler;

  describe('authorizeUser', () => {
    it('Returns already existing user when `githubId` matches some record in db', async () => {
      const dbUser = createUser(111);

      findUserWithGivenGithubIdQueryHandler.execute = jest.fn().mockResolvedValue(dbUser);

      const githubUser = createObjectMock<RegisteredUser>({ githubId: dbUser.githubId });

      const result = await service.authorizeUser(githubUser);

      expect(usersRepository.create).not.toHaveBeenCalled();
      expect(result).toEqual(dbUser);
    });

    it("Creates and returns a new user when `githubId` doesn't match any record in db", async () => {
      const newUser = createUser(222);

      findUserWithGivenGithubIdQueryHandler.execute = jest.fn().mockResolvedValue(null);
      registerUserHandler.execute = jest.fn().mockResolvedValue(newUser);

      const result = await service.authorizeUser(newUser);

      expect(findUserWithGivenGithubIdQueryHandler.execute).toHaveBeenCalledWith({ githubId: newUser.githubId });
      expect(registerUserHandler.execute).toBeCalledWith({ input: newUser });
      expect(result).toEqual(newUser);
    });

    beforeEach(async () => {
      const eventBus = {
        publish: jest.fn(),
      };

      usersRepository = {
        findByGithubId: jest.fn(),
        create: jest.fn(),
      };

      const module = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          RegisterUserHandler,
          FindUserWithGivenGithubIdQueryHandler,
          { provide: UsersRepository, useValue: usersRepository },
          { provide: EventBus, useValue: eventBus },
          GithubService,
        ],
      }).compile();

      const app = await module.init();

      service = await module.resolve(GithubService);
      registerUserHandler = app.get<RegisterUserHandler>(RegisterUserHandler);
      findUserWithGivenGithubIdQueryHandler = app.get<FindUserWithGivenGithubIdQueryHandler>(
        FindUserWithGivenGithubIdQueryHandler,
      );

      findUserWithGivenGithubIdQueryHandler.execute = jest.fn();
      registerUserHandler.execute = jest.fn();
    });
  });
});
