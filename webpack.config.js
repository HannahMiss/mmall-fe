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
var getHtmlConfig = function(name,title){
    return{
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common',name]
    };
};

//webpack config
var config = {
    //将js打包输出
    entry: {
        'common'                : ['./src/page/common/index.js'],
        'index'                 : ['./src/page/index/index.js'],
        'user-login'            :['./src/page/user-login/index.js'],
        'user-register'         :['./src/page/user-register/index.js'],
        'user-center'           :['./src/page/user-center/index.js'],
        'user-center-update'    :['./src/page/user-center-update/index.js'],
        'user-pass-reset'       :['./src/page/user-pass-reset/index.js'],
        'user-pass-update'       :['./src/page/user-pass-update/index.js'],
        // 页面入口
        'result':['./src/page/result/index.js']
    },
    output: {
        path: './dist',//本配置文件的所有路径的根目录。
        publicPath: '/dist',
        filename: 'js/[name].js',
        
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
            },
            {    
                test: /\.string$/,loader: 'html-loader'
            }
        ]
    },


    //别名定义
    resolve: {
        alias: {
            util    : __dirname + '/src/util',
            page    : __dirname + '/src/page',
            service : __dirname + '/src/service',
            view    : __dirname + '/src/view',
            image   : __dirname + '/src/image',
            node_modules   : __dirname + '/node_modules'
        }
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

        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
        // new HtmlWebpackPlugin({
        //     template: './src/view/index.html',
        //     filename: 'view/index.html',
        //     inject: true,
        //     hash: true,
        //     chunks: ['common','index']
        // })
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;