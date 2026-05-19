const path = require('path')
const MODE = 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [{
    mode: MODE,
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {},
        extensions: [ '.ts', '.tsx', '.js', '.json' ]
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: true,
        static: {
            directory: __dirname
        }
    },
    output: {
        filename: 'index.min.js',
        path: __dirname
    }
},

{
    mode: MODE,
    entry: './scss/index.scss',
    output: {
        filename: 'index.css',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}]
