/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Noto Serif Tamil', 'Georgia', 'serif'],
        tamil: ['Noto Sans Tamil', 'DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
