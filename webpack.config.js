const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devServer: {
        static: './dist',
        hot: true,
        port: 8081,
        open: true,
    },
    stats: {
        children: false,
        entrypoints: true,
    },
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js'
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './src/index.pug',
            filename: 'index.html'
        }),
        new ESLintPlugin({files: './src/**/*.{vue,scss}'}),
        new StylelintPlugin({files: './src/**/*.{vue,scss}'})
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: true,
                },
            }, 
                'css-loader'
            ]
        }, {
            test: /\.pug$/, 
            loader: 'pug-loader',
            options: {
				pretty: true
			}
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({}),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true},
                        },
                    ],
                },
            }),
        ],
    },
};