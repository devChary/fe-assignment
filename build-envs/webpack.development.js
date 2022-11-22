const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => ({
    output: {
        filename: "development.js"
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
});