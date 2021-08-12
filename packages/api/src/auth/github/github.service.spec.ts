import { Test } from '@nestjs/testing';

import type { RegisteredUser } from '@coderscamp/shared/models';
import { createObjectMock } from '@coderscamp/shared/utils/test';

import { GithubRepository } from './github.repository';
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
  let githubRepository: Partial<GithubRepository>;

  describe('authorizeUser', () => {
    it('Returns already existing user when `githubId` matches some record in db', async () => {
      const dbUser = createUser(111);

      githubRepository.findUserByGithubId = jest.fn().mockResolvedValue(dbUser);

      const githubUser = createObjectMock<RegisteredUser>({ githubId: dbUser.githubId });

      const result = await service.authorizeUser(githubUser);

      expect(githubRepository.createUser).not.toHaveBeenCalled();
      expect(result).toEqual(dbUser);
    });

    it("Creates and returns a new user when `githubId` doesn't match any record in db", async () => {
      const newUser = createUser(222);

      githubRepository.findUserByGithubId = jest.fn().mockResolvedValue(null);
      githubRepository.createUser = jest.fn().mockResolvedValue(newUser);

      const githubUser = createObjectMock<RegisteredUser>({ githubId: newUser.githubId });

      const result = await service.authorizeUser(githubUser);

      expect(githubRepository.findUserByGithubId).toHaveBeenCalledWith(newUser.githubId);
      expect(githubRepository.createUser).toHaveBeenCalledWith(githubUser);
      expect(result).toEqual({ ...newUser, id: result.id });
    });

    beforeEach(async () => {
      githubRepository = {
        findUserByGithubId: jest.fn(),
        createUser: jest.fn(),
      };

      const module = await Test.createTestingModule({
        controllers: [GithubService],
        providers: [{ provide: GithubRepository, useValue: githubRepository }],
      }).compile();

      service = await module.resolve(GithubService);
    });
  });
});
