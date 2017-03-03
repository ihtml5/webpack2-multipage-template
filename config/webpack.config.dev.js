var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var importAssetsPlugin = require('./plugins/html-webpack-import-assets.js');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: 5 });
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
module.exports = {
    entry: {
        'vendors': ['react'],
        'index': './src/index.js',
        'list': './src/list.js'
    },
    output: {
        path: path.resolve(__dirname,'dist/assets/js/'),
        filename: '[name].js'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx|es6)$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        'limit': '25000'
                    }
                }]
            },{
                test: /\.(css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
         new webpack.LoaderOptionsPlugin({
             options: {
                 context: __dirname
            }
        }),
        new importAssetsPlugin({
            paths: {
                js:  [],
                // css: ['assets/css/bootstrap.css']
            }
        }),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname,'dist/index.html'),
            template: './src/template/index.ejs',
            title: 'tupack',
            chunks: ['mainifest','vendors','common','index']
        }),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname,'dist/views/list.html'),
            template: './src/template/list.ejs',
            title: 'es5 mode',
            inject: 'body',
            chunks: ['mainifest','common','list']
        }),
        new HappyPack({
            loaders: [ 'babel-loader?presets[]=es2015'],
            threads: 4
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["common",'mainifest'],
            filename: '[name].js',
            minChunks: 2,
        }),
        new InlineManifestWebpackPlugin(),
        new ExtractTextPlugin("../../css/styles.css"),
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: process.env.NODE_ENV === 'production'
        })
    ],
    devtool: 'cheap-module-source-map'
}