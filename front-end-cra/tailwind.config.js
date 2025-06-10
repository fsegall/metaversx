/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'multiversx': {
          'primary': '#23f7dd',
          'secondary': '#6c5ce7',
          'dark': '#1a1a1a',
        },
      },
      boxShadow: {
        'multiversx': '0 0 15px rgba(35, 247, 221, 0.3)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}; 