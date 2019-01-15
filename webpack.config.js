const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const devMode = process.env.NODE_ENV !== 'production'


module.exports = {
    entry: {
        js: './src/script/app.js',
        //style: './src/style/app.sass',
    },
    output: {
        path: __dirname + "/public",
        //filename: "[name].js"
        filename: "app.js"
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['public'] }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    //devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    }
}