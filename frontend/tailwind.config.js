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
        customStoke: '#444444',
        customYellow: '#FFB100',
        customOrange: '#E96B35',
      },
    },
    screens: {
      'tsm': { 'max': '640px' }, // breakpoint customizado telas pequenas
      'tlg': {'max': '1280px', 'min': '1024px'}, // breakpoint customizado para telas grandes
      'tmd': { 'max': '750px', 'min': '475px'}, // breakpoint customizado telas medias
      'txl': {'max': '1370px', 'min': '1360px'}, // breakpoint customizado para telas grandes/medias
      'sm': '640px',      // breakpoint para telas pequenas
      'md': '768px',      // breakpoint para telas médias
      'lg': { 'max': '1024px', 'min': '750px' },     // breakpoint para telas médias
      'xl': '1280px'    // breakpoint customizado para telas extra grandes
    }
  },
  plugins: [require("tailwind-scrollbar")],
}

