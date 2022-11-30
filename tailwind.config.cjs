/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans'],
        mono: ['"DM Mono"', 'mono']
      }
    },
  },
  plugins: [],
}
