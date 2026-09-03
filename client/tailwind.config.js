/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#C45A3C',
          dark: '#A94B31',
          soft: '#F1D8CC',
        },
        sand: {
          DEFAULT: '#E8D8C3',
          soft: '#F0E5D6',
        },
        ivory: '#FAF7F2',
        ink: '#242424',
        muted: {
          DEFAULT: '#6B615A',
          soft: '#948880',
        },
        sage: {
          DEFAULT: '#6F8F72',
          dark: '#4F6C53',
          soft: '#DFE9E0',
        },
        error: {
          DEFAULT: '#B4544B',
          dark: '#8E3F38',
          soft: '#F3DAD6',
        },
        line: '#EAE1D2',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
