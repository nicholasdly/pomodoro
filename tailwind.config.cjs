/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mono: ['Inconsolata', 'monospace']
      }
    },
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [],
}