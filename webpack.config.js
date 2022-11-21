const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = env => require(`./build-envs/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return merge({
        mode,
        entry: "./src/index.js",
        devServer: {
            hot: true,
            open: true
        },
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                    exclude: /node_modules/,
                    use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
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

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve( __dirname, './public/index.html' ),
                filename: 'index.html',
                favicon: "./public/favicon.ico",
                manifest: "./public/manifest.json"
            }),
            new webpack.HotModuleReplacementPlugin()
        ],

        resolve: {
            extensions: ['.js', '.jsx', '.json'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules']
        },
    
    },
        modeConfiguration(mode)
    );
};