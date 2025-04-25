/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'marvel-red': '#ED1D24',
        'marvel-dark': '#121212',
        'marvel-light': '#F0F0F0',
        'marvel-blue': '#518CCA',
        'marvel-orange': '#F78F3F',
        'marvel-yellow': '#FEF200',
      },
      fontFamily: {
        'bangers': ['"Bangers"', 'cursive'],
        'roboto': ['"Roboto"', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'marvel': '0 4px 6px -1px rgba(237, 29, 36, 0.1), 0 2px 4px -1px rgba(237, 29, 36, 0.06)',
        'marvel-lg': '0 10px 15px -3px rgba(237, 29, 36, 0.1), 0 4px 6px -2px rgba(237, 29, 36, 0.05)',
      },
    },
  },
  plugins: [],
};