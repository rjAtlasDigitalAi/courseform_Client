/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Open Sans', 'sans-serif']
      },
      colors: {
        orange: {
          DEFAULT: '#F97316',
          deep: '#EA580C',
          light: '#FED7AA'
        }
      }
    },
  },
  plugins: [],
}
