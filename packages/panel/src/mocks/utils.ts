import { rest } from 'msw';

export const createHandler = <RequestType extends keyof typeof rest>(
  requestType: RequestType,
): typeof rest[RequestType] => {
  return (url, callback) => rest[requestType](`/api${url}`, callback);
};
