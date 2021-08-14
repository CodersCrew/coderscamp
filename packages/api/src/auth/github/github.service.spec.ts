import { Test } from '@nestjs/testing';
import { nanoid } from 'nanoid';

import type { NotRegisteredUser, RegisteredUser } from '@coderscamp/shared/models/user';
import { createObjectMock } from '@coderscamp/shared/utils/test';

import { UsersRepository } from '../../users/users.repository';
import { GithubService } from './github.service';

const createUser = (githubId: number): RegisteredUser => ({
  id: nanoid(),
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
      findByGithubId: jest.fn(),
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

      usersRepository.findByGithubId = jest.fn().mockResolvedValue(dbUser);

      const githubUser = createObjectMock<NotRegisteredUser>({ githubId: dbUser.githubId });

      const result = await service.authorizeUser(githubUser);

      expect(usersRepository.create).not.toHaveBeenCalled();
      expect(result).toEqual(dbUser);
    });

    it("Creates and returns a new user when `githubId` doesn't match any record in db", async () => {
      const newUser = createUser(222);

      usersRepository.findByGithubId = jest.fn().mockResolvedValue(null);
      usersRepository.create = jest.fn().mockResolvedValue(newUser);

      const githubUser = createObjectMock<NotRegisteredUser>({ githubId: newUser.githubId });
      const result = await service.authorizeUser(githubUser);

      expect(usersRepository.findByGithubId).toHaveBeenCalledWith(newUser.githubId);
      expect(usersRepository.create).toHaveBeenCalledWith(githubUser);
      expect(result).toEqual(newUser);
    });
  });
});
