import { initWriteTestModule } from '@/shared/test-utils';

import {
  LEARNING_MATERIALS_URL_GENERATOR,
  LearningMaterialsUrlGenerator,
} from './application/learning-materials-url-generator';
import { USERS_PORT, UsersPort } from './application/users.port';

export async function generateLearningMaterialsUrlTestModule() {
  let generatedUrls = 0;
  const mockedLearningResourcesGenerator: LearningMaterialsUrlGenerator = {
    generateUrlFor: jest.fn().mockImplementation(async () => {
      const id = `generatedProcessStId_${(generatedUrls += 1)}`;

      return {
        id,
        url: `https://app.process.st/runs/${id}/tasks/oFBpTVsw_DS_O5B-OgtHXA`,
      };
    }),
  };

  const mockedUsersPort: UsersPort = {
    getUserFullNameById: jest.fn().mockResolvedValue('Jan Kowalski'),
  };

  return initWriteTestModule((app) =>
    app
      .overrideProvider(LEARNING_MATERIALS_URL_GENERATOR)
      .useValue(mockedLearningResourcesGenerator)
      .overrideProvider(USERS_PORT)
      .useValue(mockedUsersPort),
  );
}
