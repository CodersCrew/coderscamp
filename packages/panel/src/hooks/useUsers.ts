import { useAsync } from 'react-use';

import type { GetAllUsersResponse } from '@coderscamp/shared/models';

export const useUsers = () => {
  const state = useAsync(async () => {
    const response = await fetch('/api/users');
    const result: GetAllUsersResponse = await response.json();

    return result;
  }, []);

  return state;
};
