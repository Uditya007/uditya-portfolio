/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        chalk: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#ebebeb', // midlife base
          300: '#e0e0e0',
          400: '#cccccc',
        },
        carbon: {
          900: '#121212', // midlife dark base
          800: '#1c1c1c',
          700: '#262626', // midlife border dark
          600: '#303030', // midlife dark elevated
          500: '#454545',
        },
        flame: {
          500: '#ff611a', // midlife accent electric orange
          600: '#e5520e',
          400: '#ff7838',
          100: '#fff0eb',
        },
      },
      fontFamily: {
        neue: ['"PP Neue Montreal"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"PP Neue Montreal"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['"PP Neue Montreal"', 'Manrope', '-apple-system', 'sans-serif'],
        mono: ['"Fragment Mono"', '"JetBrains Mono"', 'monospace'],
        aspekta: ['"Aspekta"', 'sans-serif'],
      },
      letterSpacing: {
        midlife: '-0.055em',
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.15em',
        technical: '0.08em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};
