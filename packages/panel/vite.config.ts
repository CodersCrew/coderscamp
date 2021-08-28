import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import { validateBuildEnv } from './src/common/validateBuildEnv';

export default async () => {
  try {
    await validateBuildEnv();
  } catch (ex) {
    throw new Error(ex);
  }

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
