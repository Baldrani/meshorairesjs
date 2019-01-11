const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
    entry: './src/script/app.js',
    output: {
        path: __dirname + "/public",
        filename: "app.js"
    },
    plugins: [
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['public'] }
        })
    ]
}