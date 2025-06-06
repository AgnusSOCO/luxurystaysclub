/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#c0e0ff',
          300: '#91c8ff',
          400: '#5faafc',
          500: '#3389f7',
          600: '#1d6aea',
          700: '#1755d8',
          800: '#1845ae',
          900: '#173d8a',
        },
        gold: {
          50: '#fdf9e7',
          100: '#fbf0c3',
          200: '#f7e18a',
          300: '#f3cd48',
          400: '#edba1f',
          500: '#e19e11',
          600: '#cc7c0d',
          700: '#a75d10',
          800: '#884a13',
          900: '#723d15',
        },
      },
      boxShadow: {
        'lg': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};