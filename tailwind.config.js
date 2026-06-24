const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          ...colors.amber,
          400: '#6FDBA8', // glastor-mint
          500: '#41BF84', // glastor-accent (Vue Green)
          600: '#41BF84', // Also mapped to accent for dark mode backgrounds
          650: '#01260E', // glastor-forest
          900: '#01260E', // glastor-forest
        },
        indigo: {
          ...colors.indigo,
          400: '#B8F0D4', // glastor-pale-mint
          500: '#2F4659', // glastor-steel
          700: '#1A3A4A', // glastor-navy
        },
        zinc: {
          ...colors.zinc,
          900: '#0D0D0D', // Very dark background
          950: '#000000', // Absolute black background
        },
        glastor: {
          bg: '#000000',
          accent: '#41BF84',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        '0.85': '0.85',
      }
    },
  },
  plugins: [],
}
