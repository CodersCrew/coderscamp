/* eslint-disable no-underscore-dangle */
import { Test } from '@nestjs/testing';

import { UserRegistrationController } from '@/crud/user-registration/user-registration.controller';

import { UserRegistrationService } from './user-registration.service';

describe('user registration controller', () => {
  let controller: UserRegistrationController;
  let userRegistrationService: Partial<UserRegistrationService>;

  beforeEach(async () => {
    userRegistrationService = {
      register: jest.fn(),
    };

    const module = await Test.createTestingModule({
      controllers: [UserRegistrationController],
      providers: [{ provide: UserRegistrationService, useValue: userRegistrationService }],
    }).compile();

    controller = await module.resolve(UserRegistrationController);
  });

  describe('register', () => {
    it('calls `userRegistrationService` with received body', async () => {
      const bodyMock = { fullName: 'Some Name', email: 'some@mail.com', password: 'xyz' };

      await controller.register(bodyMock);

      expect(userRegistrationService.register).toHaveBeenCalledWith(bodyMock);
      expect(userRegistrationService.register).toHaveBeenCalledTimes(1);
    });
  });
});
