import { GET_ME_ENDPOINT, GetMeResponse } from '@coderscamp/shared/models/user/getMe';

import { httpClient } from '@/services/api';

export const getMeRequest = () => httpClient.get<GetMeResponse>(GET_ME_ENDPOINT);
