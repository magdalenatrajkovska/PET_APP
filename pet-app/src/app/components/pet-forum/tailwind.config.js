/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        paw: {
          50:  '#fdf8f3',
          100: '#fde8d8',
          200: '#f0d8c0',
          300: '#e8c9b0',
          400: '#d4956a',
          500: '#c45628',
          600: '#a04020',
          700: '#7a3018',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
