import { set } from 'leaked-handles';

// detect where are memory leaks in test
set({
  fullStack: true,
  timeout: 30000,
  debugSockets: true,
});
