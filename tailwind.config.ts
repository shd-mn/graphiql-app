import type { Config } from 'tailwindcss';
import { dynamicColors } from './constants/colors';

const config: Config = {
  important: true,
  safelist: dynamicColors,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
