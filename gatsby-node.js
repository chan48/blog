var rucksack = require('rucksack-css')
var lost = require('lost')
var cssnext = require('postcss-cssnext')
var precss = require('precss');
var postcssShort = require('postcss-short');
var postcssUtilities = require('postcss-utilities');

exports.modifyWebpackConfig = function(config, env) {
    config.merge({
        postcss: [
            lost(),
            rucksack(),
            cssnext({
                browsers: ['>1%', 'last 2 versions']
            }),
            precss(),
            postcssShort(),
            postcssUtilities(),
        ]
    })

    config.loader('svg', {
       test: /\.(svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
       loader: 'file-loader',
    })

    return config
};