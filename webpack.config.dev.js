var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
const path = require('path');


module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: path.resolve(__dirname, './public/js/app'),
        publicPath: "/js/app/",
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    }
});
