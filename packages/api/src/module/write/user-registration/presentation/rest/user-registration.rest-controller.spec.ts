import { HttpStatus } from '@nestjs/common';
import { AsyncReturnType } from 'type-fest';

import { registerError } from '@coderscamp/shared/models/auth/register';

import { DomainRuleViolationException } from '@/shared/errors/domain-rule-violation.exception';
import { initTestModuleRestApi } from '@/shared/test-utils';
import { UserRegistrationRestController } from '@/write/user-registration/presentation/rest/user-registration.rest-controller';

import { initOpenApiExpect } from '../../../../../../jest-setup';

initOpenApiExpect();

describe('User Registration | REST API', () => {
  let restUnderTest: AsyncReturnType<typeof initTestModuleRestApi>;

  beforeAll(async () => {
    restUnderTest = await initTestModuleRestApi(UserRegistrationRestController);
  });

  beforeEach(() => {
    restUnderTest.commandBusExecute.mockClear();
  });

  describe('/POST user-registration', () => {
    it(`success`, async () => {
      // Given
      restUnderTest.commandBusExecute.mockImplementation(() => Promise.resolve());

      // When
      const response = await restUnderTest.http.post('/api/user-registration').send({
        fullName: 'John Kowalsky',
        email: 'jan.kowalski@nowak.pl',
        password: 'samplePassword123',
      });

      // Then
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.userId).toBeDefined();
      expect(response).toSatisfyApiSpec();
    });

    it(`invalid request body - without password field`, async () => {
      // When
      const response = await restUnderTest.http.post('/api/user-registration').send({
        fullName: 'John Kowalsky',
        email: 'jan.kowalski@nowak.pl',
      });

      // Then
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toStrictEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['"password" is required', '"password" must be a string'],
        error: 'Bad Request',
      });
      expect(response).toSatisfyApiSpec();
    });

    it(`command rejected because REGISTRATION_FORM_ALREADY_EXISTS`, async () => {
      // Given
      restUnderTest.commandBusExecute.mockRejectedValue(
        new DomainRuleViolationException(registerError.USER_WAS_ALREADY_REGISTERED),
      );

      // When
      const response = await restUnderTest.http.post('/api/user-registration').send({
        fullName: 'John Kowalsky',
        email: 'jan.kowalski@nowak.pl',
        password: 'samplePassword123',
      });

      // Then
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body).toStrictEqual({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'USER_WAS_ALREADY_REGISTERED',
        error: 'Bad Request',
      });
      expect(response).toSatisfyApiSpec();
    });
  });

  afterAll(async () => {
    await restUnderTest.close();
  });
});
