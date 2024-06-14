/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.{html,js}", "./node_modules/tw-elements/js/**/*.js"], 
  theme: {
    extend: {
      screens: {
        'mobile-only': { 'max': '991.98px' },
        },
    },
  },
  plugins: [require("tw-elements/plugin.cjs")]
}

