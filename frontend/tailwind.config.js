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
      'tsm': { 'max': '640px' }, // breakpoint customizado telas pequenas - celulares
      'tlg': {'max': '1280px', 'min': '1024px'}, // breakpoint customizado para telas grandes
      'txl': {'max': '1370px', 'min': '1360px'}, // breakpoint customizado para telas grandes/medias
      'lg': { 'max': '1024px', 'min': '640px' },     // breakpoint para telas médias - tablets
      'xl': '1280px'    // breakpoint customizado para telas extra grandes
    }
  },
  plugins: [require("tailwind-scrollbar")],
}

