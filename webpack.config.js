const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

function resolvePath(dir) {
    return path.join(__dirname, dir);
}
 
module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.tsx',
    },
    output: {
        path: resolvePath('www'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        publicPath: '',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            'src': resolvePath('src'),
        },
    },
    devtool: 'eval',
    devServer: {
        hot: true,
        open: false,
        compress: true,
        contentBase: '/www/',
        disableHostCheck: true,
        historyApiFallback: true,
        watchOptions: {
            poll: 1000,
        },
        host: '0.0.0.0',
        proxy : {
            '/api' : {
                "target" : "https://bonus-test.evoapp.ru",
                "changeOrigin" : true,
                "secure" : false
            },
        },
        port: 3000,
    },
    optimization: {
        minimizer: [new TerserPlugin({
            sourceMap: true,
            terserOptions: {
                compress: {
                    drop_console: true
                }
            }
        })],
    },
    module: {
        rules: [{
                test: /\.(mjs|js|jsx|ts|tsx)$/,
                use: 'babel-loader',
                include: [
                    resolvePath('src'),
                ],
                exclude: /\.stories\.(tsx|ts|jsx|js)/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[ext]',

                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|m4a)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[ext]',

                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]',

                },
            },
            {
                test: /\.svg$/,
                use: [{
                        loader: '@svgr/webpack',
                        options: {
                            svgoConfig: {
                                plugins: [{
                                    removeViewBox: false,
                                    minifyStyles: false
                                }, ],
                            },
                            memo: true,
                        },
                    },
                    'url-loader',

                ],
            }
        ],
    },
    plugins: [
            // Development only plugins
            new Dotenv(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
            filename: './index.html',
            template: './public/index.html',
            inject: true,
            minify: false, 
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ].filter(Boolean),
};
