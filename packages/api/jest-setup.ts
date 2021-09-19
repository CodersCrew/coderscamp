import appRoot from 'app-root-path';
import dotenv from 'dotenv';
import jestOpenAPI from 'jest-openapi';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { set } from 'leaked-handles';

dotenv.config({ path: './.env.test' });

// detect where are memory leaks in test
set({
  fullStack: true,
  timeout: 30000,
  debugSockets: true,
});

export const initOpenApiExpect = () => jestOpenAPI(`${appRoot}/packages/api/rest-api-docs.yaml`);
