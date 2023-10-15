const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'entries/index.tsx'),
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer: {
        port: 8090,
    },
    resolve:{
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.tsx', '.ts', '...'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts)$/, // 新增 对ts文件处理
                exclude: /(node_modules|build)/,
                use: {
                  loader: "babel-loader",
                  options: {
                    "plugins": [
                      ["@babel/plugin-proposal-optional-chaining", {}],
                      '@babel/plugin-proposal-object-rest-spread',// 解构的支持
                        '@babel/plugin-proposal-class-properties', // static 支持
                    ],
                    presets: [
                      "@babel/preset-typescript", // 对ts文件的预设
                      "@babel/preset-env"
                    ]
                  }
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css?$/,
                use: 'css-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.sass?$/,
                use: 'sass-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './entries/index.html'
        })
    ]
};