var path = require("path");
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {

    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/dist',
    },

    devServer: {
        contentBase: './',
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
              ]
        }
    },
    devtool: 'inline-source-map',

    plugins: [
        new CleanWebpackPlugin(),
        /* new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        }), */
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000
                        }
                    }
                ]
            },
            {

                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            }
        ],
    }
}