import type { AxiosResponse } from 'axios';

export const extractResponseData =
  <Args extends unknown[], Result>(fc: (...args: Args) => Promise<AxiosResponse<Result>>) =>
  async (...args: Args): Promise<Result> => {
    const result = await fc(...args);

    return result.data;
  };
