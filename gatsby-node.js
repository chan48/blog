var rucksack = require('rucksack-css');
var lost = require('lost');
var cssnext = require('postcss-cssnext');
var precss = require('precss');
var postcssUtilities = require('postcss-utilities');
var postcssShort = require('postcss-short');

exports.modifyWebpackConfig = function(config, env) {
  config.merge({
    postcss: [
      lost(),
      rucksack(),
      cssnext({
        browsers: ['>1%', 'last 2 versions'],
      }),
      precss(),
      postcssUtilities(),
      postcssShort(),
    ],
  });

  config.loader('svg', {
     test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
     loader: 'file-loader',
  });

  return config;
};
