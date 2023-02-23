/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,svelte}"],
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
