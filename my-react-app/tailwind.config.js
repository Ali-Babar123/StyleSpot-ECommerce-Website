/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', 'Times', 'serif'],
        georgia: ['Georgia', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        poppins: ['poppins', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        BebasNeue: ['Bebas Neue', 'sans-serif']
      },
    },
  },
  plugins: [],
}
