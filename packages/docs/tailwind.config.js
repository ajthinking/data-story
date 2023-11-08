/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'theme.config.js',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: '#__next',
}