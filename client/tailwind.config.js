/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#622B14', // Dark Brown - primary
          dark: '#995F2F',    // Warm Brown - hover / secondary
          soft: '#EFDCC7',    // Light warm-beige - icon backdrops
        },
        sand: {
          DEFAULT: '#E4D6A9', // Cream
          soft: '#EFE6CE',    // Lighter cream
        },
        ivory: '#F8F5EE',     // Warm page background
        ink: '#2B211B',       // Dark text
        muted: {
          DEFAULT: '#7A6E5F', // Warm secondary text
          soft: '#A69B87',    // Warm tertiary text
        },
        sage: {
          DEFAULT: '#978F66', // Olive - supporting UI, success accents
          dark: '#6D6749',    // Deeper olive for text on soft bg
          soft: '#E8E3CC',    // Very light olive for pills / success flash
        },
        error: {
          DEFAULT: '#B0413A',
          dark: '#8A2F2A',
          soft: '#F3D9D6',
        },
        line: '#E5DDC8',      // Warm border
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
