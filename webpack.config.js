const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development';

if (process.env.NODE_ENV === 'production') mode = 'production';

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    mode,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|j?g|svg|gif|ico)?$/,
                type: 'asset/resource',
                exclude: /node_modules/,
                use: [{
                    loader: 'url-loader',
                    options: {
                      limit: 8000,
                      name: 'images/[hash]-[name].[ext]',
                      publicPath: 'public/static/assets',
                    }
                  }, 'file-loader?name=[name].[ext]'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },

    plugins :[
        new MiniCssExtractPlugin(),
        new HtmlWebPackPlugin({
            template: path.resolve( __dirname, 'public/index.html' ),
            filename: 'index.html',
            favicon: "public/favicon.ico",
            manifest: "public/manifest.json"
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },

    devServer: {
        port: 3000,
        hot: true,
        open: true,
        static: {
            directory: path.join(__dirname, "dist", "assets"),
            publicPath: 'public/static/assets'
        },
    }
}
