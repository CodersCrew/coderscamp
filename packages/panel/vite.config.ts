import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { validateEnvVariables } from './src/common/env';

export default () => {
  validateEnvVariables();

  return defineConfig({
    plugins: [tsconfigPaths(), reactRefresh()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:4000/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
