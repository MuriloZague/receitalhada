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
      'tsm': { 'max': '640px' }, // breakpoint customizado telas pequenas
      'tlg': {'max': '1280px', 'min': '1024px'}, // breakpoint customizado para telas grandes
      'tmd': { 'max': '750px', 'min': '475px'}, // breakpoint customizado telas medias
      'sm': '640px',      // breakpoint para telas pequenas
      'md': '768px',      // breakpoint para telas médias
      'lg': { 'max': '1024px', 'min': '750px' },     // breakpoint para telas grandes
      'xl': '1280px',     // breakpoint para telas extra grandes
    }
  },
  plugins: [require("tailwind-scrollbar")],
}

