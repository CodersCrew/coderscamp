import type { LogoutResponse } from '@coderscamp/shared/models/auth';

import { httpClient } from '.';

export const logoutRequest = () => httpClient.post<LogoutResponse>('/auth/logout');
