/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#CC4A14', // Terracotta - primary actions, accents
          dark: '#A53A0E',    // Deep terracotta - hover / pressed
          soft: '#FDE6D6',    // Peach tint - icon backdrops
        },
        teal: {
          DEFAULT: '#0E8F98', // Fresh teal - secondary accent
          dark: '#0A6B72',    // Text on soft teal
          soft: '#D5F0F2',    // Teal tint
        },
        marigold: {
          DEFAULT: '#F4A62A', // Sunny highlight
          dark: '#8F5800',    // Text on soft marigold
          soft: '#FFEFC9',    // Marigold tint
        },
        sand: {
          DEFAULT: '#F3D9A4', // Warm cream
          soft: '#FBEFD8',    // Lighter cream
        },
        ivory: '#FFFAF2',     // Warm page background
        ink: '#2B211B',       // Dark text
        muted: {
          DEFAULT: '#6F6355', // Warm secondary text
          soft: '#8C816C',    // Warm tertiary text
        },
        sage: {
          DEFAULT: '#238A5A', // Green - success / strong match
          dark: '#1B6B47',    // Text on soft green
          soft: '#DAF2E5',    // Green tint
        },
        error: {
          DEFAULT: '#B0413A',
          dark: '#8A2F2A',
          soft: '#F3D9D6',
        },
        line: '#EBDFCB',      // Warm border
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
          'linear-gradient(135deg, #CC4A14 0%, #E2622A 55%, #F08A2C 100%)',
        'teal-gradient': 'linear-gradient(135deg, #0A6B72 0%, #0E8F98 100%)',
        'sun-gradient': 'linear-gradient(135deg, #F4A62A 0%, #F2784B 100%)',
      },
      boxShadow: {
        glow: '0 10px 28px -10px rgba(204, 74, 20, 0.55)',
        lift: '0 18px 40px -18px rgba(43, 33, 27, 0.35)',
      },
    },
  },
  plugins: [],
};
