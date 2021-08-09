import { Test } from '@nestjs/testing';

import type { User } from '@coderscamp/shared/models/user';
import { createObjectMock } from '@coderscamp/shared/utils/test';

import { UsersRepository } from '../../users/users.repository';
import { UserFromGithub } from '../../users/users.types';
import { GithubService } from './github.service';

const createUser = (githubId: number): User => ({
  id: Math.round(Math.random() * 100),
  fullName: 'Name',
  githubId,
  email: 'example@test.com',
  image: 'https://photo-url.com',
});

describe('Github controller', () => {
  let service: GithubService;
  let usersRepository: Partial<UsersRepository>;

  beforeEach(async () => {
    usersRepository = {
      getByGithubId: jest.fn(),
      create: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [GithubService],
      providers: [{ provide: UsersRepository, useValue: usersRepository }],
    }).compile();

    service = await module.resolve(GithubService);
  });

  describe('authorizeUser', () => {
    it('Returns already existing user when `githubId` matches some record in db', async () => {
      const dbUser = createUser(111);

      usersRepository.getByGithubId = jest.fn().mockResolvedValue(dbUser);

      const githubUser = createObjectMock<UserFromGithub>({ githubId: dbUser.githubId });

      const result = await service.authorizeUser(githubUser);

      expect(usersRepository.create).not.toHaveBeenCalled();
      expect(result).toEqual(dbUser);
    });

    it("Creates and returns a new user when `githubId` doesn't match any record in db", async () => {
      const newUser = createUser(222);

      usersRepository.getByGithubId = jest.fn().mockResolvedValue(null);
      usersRepository.create = jest.fn().mockResolvedValue(newUser);

      const githubUser = createObjectMock<UserFromGithub>({ githubId: newUser.githubId });

      const result = await service.authorizeUser(githubUser);

      expect(usersRepository.getByGithubId).toHaveBeenCalledWith(newUser.githubId);
      expect(usersRepository.create).toHaveBeenCalledWith(githubUser);
      expect(result).toEqual(newUser);
    });
  });
});
