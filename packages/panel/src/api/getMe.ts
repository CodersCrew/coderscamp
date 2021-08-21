import { GetMeResponse } from '@coderscamp/shared/models/user';

import { httpClient } from '.';

export const getMeRequest = () => httpClient.get<GetMeResponse>('/users/me');
