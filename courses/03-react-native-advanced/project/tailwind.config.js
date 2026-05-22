/** @type {import('tailwindcss').Config} */
// nativewind — Tailwind for React Native
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        slate: { 900: '#0f172a' },
        sky: { 400: '#38bdf8' },
      },
    },
  },
  plugins: [],
};
