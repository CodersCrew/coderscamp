import { Test } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import type { User } from '@coderscamp/shared/models/user';
import { createObjectMock } from '@coderscamp/shared/utils/test';

import { UsersService } from '../../users/users.service';
import { UserFromGithub } from '../../users/users.types';
import { GithubService } from './github.service';
import type { GithubId } from './github.types';

const createUser = (githubId: GithubId): User => ({
  id: uuidv4(),
  fullName: 'Name',
  githubId,
  email: 'example@test.com',
  image: 'https://photo-url.com',
});

describe('Github controller', () => {
  let service: GithubService;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    usersService = {
      getByGithubId: jest.fn(),
      create: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [GithubService],
      providers: [{ provide: UsersService, useValue: usersService }],
    }).compile();

    service = await module.resolve(GithubService);
  });

  describe('authorizeUser', () => {
    it('Returns already existing user when `githubId` matches some record in db', async () => {
      const dbUser = createUser(111);

      usersService.getByGithubId = jest.fn().mockResolvedValue(dbUser);

      const githubUser = createObjectMock<UserFromGithub>({ githubId: dbUser.githubId });

      const result = await service.authorizeUser(githubUser);

      expect(result).toEqual(dbUser);
    });

    it("Creates and returns a new user when `githubId` doesn't match any record in db", async () => {
      const newUser = createUser(222);

      usersService.getByGithubId = jest.fn().mockResolvedValue(null);
      usersService.create = jest.fn().mockResolvedValue(newUser);

      const githubUser = createObjectMock<UserFromGithub>({ githubId: newUser.githubId });

      const result = await service.authorizeUser(githubUser);

      expect(usersService.getByGithubId).toHaveBeenCalledWith(newUser.githubId);
      expect(usersService.create).toHaveBeenCalledWith(githubUser);
      expect(result).toEqual(newUser);
    });
  });
});
