import { LOGIN_ENDPOINT, LoginBody, LoginResponse } from '@coderscamp/shared/models/auth/login';

import { httpClient } from '@/services/api';

export const loginRequest = ({ body }: { body: LoginBody }) => httpClient.post<LoginResponse>(LOGIN_ENDPOINT, body);
