/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'dark-blue': '#081A51',
          'light-white': 'rgba(255, 255, 255, 0.6)',
        }
    },
  },
  plugins: [],
}
