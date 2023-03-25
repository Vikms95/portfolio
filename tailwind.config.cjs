/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,vue}'],
  theme: {
    screens: {
      mobile: { max: '450px' },
      tablet: { max: '640px' },
      laptop: { max: '1024px' },
      desktop: { max: '1280px' },
    },
    extend: {},
  },
  plugins: [],
}
