const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const modeConfiguration = env => require(`./build-envs/webpack.${env}`)(env);

/* Plugins */
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
                    test: /\.(png|svg|j?g|gif|ico)$/,
                    type: 'asset/resource',
                    exclude: /node_modules/,
                    use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve( __dirname, 'public/index.html' ),
                filename: 'index.html',
                favicon: "public/favicon.ico",
                manifest: "public/manifest.json"
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