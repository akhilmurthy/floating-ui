import {resolve} from 'node:path';

import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      extension: resolve(__dirname, './src'),
      // TODO: remove this once npm package is published
      'floating-ui-devtools': resolve(__dirname, '../packages/devtools/src'),
    },
  },
});
