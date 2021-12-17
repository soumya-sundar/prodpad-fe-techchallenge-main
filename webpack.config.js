const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const MODE = argv.mode;

    return {
        entry: './src/main.js',
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].bundle.js',
            publicPath: '/'
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devtool: MODE === 'development' ? 'eval-source-map' : 'none',
		stats: {
		    logging: 'warn',
		},
    devServer: {
			port: 1337,
			historyApiFallback: true,
        },
        module: {
            rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader',
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: [
                        MODE === 'development' ?
                        'vue-style-loader' :
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                esModule: false,
                                importLoaders: 1
                            },
                        }
                    ],
                }
            ],
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                publicPath: '/'
            }),
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin(),
        ],
    };
};