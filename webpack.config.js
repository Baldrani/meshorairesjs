const webpack = require("webpack")
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'


module.exports = {
    entry: {
        js: './src/script/app.js',
    },
    output: {
        path: __dirname + "/public",
        filename: "app.js"
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({}),
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