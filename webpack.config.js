const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = true;
module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'bundle.js',
        assetModuleFilename: "assets/[name][ext]",
        clean: true,
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:8080',
        },
        static: {
            directory: path.join(__dirname, "./dist/"),
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                  ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    { loader: 'file-loader' }
                ]
                
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
          }),
    ]
};