const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');


module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: path.resolve(__dirname, './public/js/app'),
        publicPath: "/js/app/",
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        transpileOnly: true
                    }
                },
                {
                    loader: 'angular2-template-loader'
                },
                {
                    loader: 'angular2-router-loader'
                }
            ]
        }]

    }
});