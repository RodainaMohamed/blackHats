const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge.smart(commonConfig, {
    entry: {
        'app': './assets/app/main.ts'
    },

    output: {
        path: path.resolve(__dirname + '/public/js/app'),
        filename: 'bundle.js',
        publicPath: '/js/app/',
        chunkFilename: '[id].[hash].chunk.js',
        sourceMapFilename: '[name].map'
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: [
                'awesome-typescript-loader',
                'angular2-template-loader',
                'angular-router-loader'
            ]
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            comments: false,
            optimize: true,
            compress: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});