import { AsyncReturnType } from 'type-fest';

import { initTestModuleRestApi } from '@/shared/test-utils';
import { UserRegistrationRestController } from '@/write/user-registration/presentation/rest/user-registration.rest-controller';

describe('User Registration | REST API', () => {
  let restUnderTest: AsyncReturnType<typeof initTestModuleRestApi>;

  beforeAll(async () => {
    restUnderTest = await initTestModuleRestApi(UserRegistrationRestController);
  });

  beforeEach(() => {
    restUnderTest.commandBusExecute.mockClear();
  });

  it(`/POST user-registration`, () => {
    return restUnderTest.http.post('/user-registration').expect(400).expect({ message: 'test' });
  });

  afterAll(async () => {
    await restUnderTest.close();
  });
});
