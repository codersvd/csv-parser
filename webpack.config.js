const config = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('assets/main.css');
const extractHTML = new ExtractTextPlugin('index.html');

const srcPath = path.resolve(__dirname + '/clientSrc');
const distPath = path.resolve(__dirname + '/client');

module.exports = {
    context: srcPath,
    devtool: 'source-map',
    entry: [
        './app.jsx'
    ],
    output: {
        path: distPath,
        filename: 'assets/app.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify(env),
            version: JSON.stringify(config.version)
        }),
        extractCSS,
        extractHTML,
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                include: srcPath,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime', 'transform-object-rest-spread']
                }
            }, {
                test: /\.js$/,
                include: srcPath,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime', 'transform-object-rest-spread']
                }
            }, {
                test: /\.less$/,
                include: srcPath,
                loader: extractCSS.extract('css-loader!less-loader')
            }, {
                test: /index\.ejs$/,
                include: srcPath,
                loader: extractHTML.extract('html-loader!ejs-html-loader')
            }, {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'url',
                include: srcPath,
                exclude: "/node_modules/",
                query: {
                    limit: 10000,
                    name: 'assets/[hash:8].[ext]'
                }
            }
        ]
    }
};