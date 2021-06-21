module.exports = {
  purge: ['src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: 'Helvetica, sans-serif',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
