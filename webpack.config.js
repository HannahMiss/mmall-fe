/**
 * webpack 打包配置文件
 * 
 * 
 * 1、创建对象，将输入、出口的配置写在对象中
 * 2、将对象 export 出去
 * 
 * 
 * 选择 webpack 自带加载器，不用下载loader
 * 
 */

//引入插件
var webpack = require('webpack');
var ExtactTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置  dev/online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);


//抽出一个函数处理html模板页面
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return{
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common',name]
    };
};

//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
        'index': ['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    output: {
        path: './dist',//本配置文件的所有路径的根目录。
        filename: 'js/[name].js',
        publicPath: '/dist'
    },
    externals: {
        'jquery': 'window.jQuery'
    },

    //css样式
    module: {
        loaders: [
            {    //监测到以css结尾的文件，使用 style-loader 或者 css-loader
                test: /\.css$/,loader: ExtactTextPlugin.extract("style-loader",'css-loader')
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'file-loader?limit=5000&name=resource/[name].[ext]'
            }
        ]
    },


    plugins: [
        //独立通用模块到 js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),

        //把css单独打包到文件里
        new ExtactTextPlugin('css/[name].css'),

        //html模板的处理

        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
        // new HtmlWebpackPlugin({
        //     template: './src/view/index.html',
        //     filename: 'view/index.html',
        //     inject: true,
        //     hash: true,
        //     chunks: ['common','index']
        // })
    ]
};


module.exports = config;