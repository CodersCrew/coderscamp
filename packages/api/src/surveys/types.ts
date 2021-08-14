import { Survey, User } from '@coderscamp/shared/models';

export type UserSurveyUpdateData = Omit<User, 'image' | 'githubId'> & { Survey: Survey };
