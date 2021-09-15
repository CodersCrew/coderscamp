import dotenv from 'dotenv';
import { set } from 'leaked-handles';

dotenv.config({ path: './.env.test' });

// detect where are memory leaks in test
set({
  fullStack: true,
  timeout: 30000,
  debugSockets: true,
});
