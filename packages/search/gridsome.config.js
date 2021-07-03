// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const merge = require('webpack-merge');
module.exports = {
  siteName: 'Search',
  plugins: [{ use: 'gridsome-plugin-tailwindcss' }],
};
