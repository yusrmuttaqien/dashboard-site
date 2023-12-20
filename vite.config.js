import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      assets: `${path.resolve(__dirname, './src/assets/')}`,
      components: `${path.resolve(__dirname, './src/components/')}`,
      constants: `${path.resolve(__dirname, './src/constants/')}`,
      pages: `${path.resolve(__dirname, './src/pages/')}`,
      styles: `${path.resolve(__dirname, './src/styles/')}`,
      utils: `${path.resolve(__dirname, './src/utils/')}`,
      hooks: `${path.resolve(__dirname, './src/hooks/')}`,
      pagebases: `${path.resolve(__dirname, './src/pagebases/')}`,
    },
  },
});
