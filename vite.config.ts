import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '~static',
        replacement: path.resolve(__dirname, 'src/static'),
      },
      {
        find: '~utils/helpers',
        replacement: path.resolve(__dirname, 'src/utils/helpers'),
      },
      {
        find: '~utils/store',
        replacement: path.resolve(__dirname, 'src/utils/store'),
      },
      {
        find: '~utils/constants',
        replacement: path.resolve(__dirname, 'src/utils/constants'),
      },
      {
        find: '~components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '~components/common',
        replacement: path.resolve(__dirname, 'src/components/common'),
      },
      {
        find: '~components/common/icons',
        replacement: path.resolve(__dirname, 'src/components/common/icons'),
      },
    ],
  },
});
