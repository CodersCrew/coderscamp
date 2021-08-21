import type { LoginBody, LoginResponse } from '@coderscamp/shared/models/auth/login';

import { httpClient } from '.';

export const loginRequest = ({ body }: { body: LoginBody }) => httpClient.post<LoginResponse>('/auth/login', body);
