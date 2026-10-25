/** @type {import('tailwindcss').Config} */
// Brand palette: navy #0A2947, cream #F3E4C9, sage #D3D4C0, brown #8B5E3C.
// The "dark / soft / light" variants are tints and shades of those four.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#8B5E3C', // Brown - primary actions, accents
          dark: '#6B4529',    // Deep brown - hover / pressed
          soft: '#F3E4C9',    // Cream - icon backdrops
        },
        navy: {
          DEFAULT: '#0A2947', // Navy - text, dark surfaces, secondary accent
          dark: '#061A30',    // Deepest navy - gradients
          light: '#16466F',   // Lighter navy - gradients
          soft: '#E1E7EE',    // Navy tint - chips, backdrops
        },
        cream: {
          DEFAULT: '#F3E4C9', // Cream - warm panels
          soft: '#FAF3E5',    // Lighter cream
        },
        ivory: '#FBF6EC',     // Page background (very light cream)
        ink: '#0A2947',       // Text (navy)
        muted: {
          DEFAULT: '#51667D', // Secondary text (navy-grey)
          soft: '#6B7C8E',    // Tertiary text
        },
        sage: {
          DEFAULT: '#D3D4C0', // Sage - borders, soft surfaces
          dark: '#6E7259',    // Sage text / dots / accents
          soft: '#E9EADB',    // Sage tint
        },
        error: {
          DEFAULT: '#B0413A',
          dark: '#8A2F2A',
          soft: '#F3D9D6',
        },
        line: '#D3D4C0',      // Borders (sage)
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
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #6B4529 0%, #8B5E3C 55%, #A5703F 100%)',
        'navy-gradient':
          'linear-gradient(135deg, #061A30 0%, #0A2947 55%, #16466F 100%)',
      },
      boxShadow: {
        glow: '0 10px 28px -10px rgba(139, 94, 60, 0.6)',
        lift: '0 18px 40px -18px rgba(10, 41, 71, 0.4)',
      },
    },
  },
  plugins: [],
};
