import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.tsx'],
    coverage: {
      provider: 'v8',
      exclude: [
        '**/.eslintrc.cjs',
        'vitest.config.mts',
        'next.config.mjs',
        'next-env.d.ts',
        '**/custom-pattern/**',
        ...coverageConfigDefaults.exclude,
      ],
    },
    css: false,
  },
});
