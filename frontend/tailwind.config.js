/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#797979',
        customStoke: '#444444'
      },
    },
    screens: {
      'tsm': { 'max': '450px' },
    }
  },
  plugins: [require("tailwind-scrollbar")],
}

