import { HttpStatus } from '@nestjs/common';
import { AsyncReturnType } from 'type-fest';

import { APPROVE_ENDPOINT } from '@coderscamp/shared/models/email-confirmation/approve-email-confirmation';

import { DomainRuleViolationException } from '@/shared/errors/domain-rule-violation.exception';
import { initTestModuleRestApi } from '@/shared/rest-api-test-utils';

import { initOpenApiExpect } from '../../../../../../jest-setup';
import { EmailConfirmationRestController } from './email-confirmation.rest-controller';

initOpenApiExpect();

describe('email confirmation | REST API', () => {
  let restUnderTest: AsyncReturnType<typeof initTestModuleRestApi>;

  beforeAll(async () => {
    restUnderTest = await initTestModuleRestApi(EmailConfirmationRestController);
    restUnderTest.commandBusExecute.mockClear();
  });

  afterAll(async () => {
    await restUnderTest.close();
  });

  describe(`POST /email-confirmation${APPROVE_ENDPOINT}`, () => {
    it('Failed, user is not authenticated', async () => {
      // Given
      restUnderTest.commandBusExecute.mockImplementation(() => Promise.resolve());

      // When
      const response = await restUnderTest.http.post(`/api/email-confirmation${APPROVE_ENDPOINT}`).send({
        confirmationToken: 'exampleToken',
      });

      // Then
      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(response.body.message).toEqual('Unauthorized');
      expect(response).toSatisfyApiSpec();
    });

    it('Failed, trying to approve email confirmation without earlier request', async () => {
      // Given
      restUnderTest.commandBusExecute.mockRejectedValue(
        new DomainRuleViolationException("Couldn't find request which could be approved"),
      );

      // When
      const response = await restUnderTest.asLoggedUser((http) =>
        http.post(`/api/email-confirmation${APPROVE_ENDPOINT}`).send({
          confirmationToken: 'exampleToken',
        }),
      );

      // Then
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.message).toBe("Couldn't find request which could be approved");
      expect(response).toSatisfyApiSpec();
    });

    it('Success, email confirmation has been approved', async () => {
      // Given
      restUnderTest.commandBusExecute.mockImplementation(() => Promise.resolve());

      // When
      const response = await restUnderTest.asLoggedUser((http) =>
        http.post(`/api/email-confirmation${APPROVE_ENDPOINT}`).send({
          confirmationToken: 'exampleToken',
        }),
      );

      // Then
      expect(response.status).toBe(HttpStatus.NO_CONTENT);
      expect(response).toSatisfyApiSpec();
    });
  });
});
