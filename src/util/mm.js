/**
 * @description 工具类对象
 * @param obj 对象
 * 
 */
var Hogan = require('hogan.js');

var conf = {
    serverHost: ''
};
var _mm = {
    //网络请求
    request: function(param){
        var _this = this;//将_mm对象传给_this
        $.ajax({
            type        : param.method || 'get',
            url         : param.url || '',
            dataType    : param.type || 'json',
            data        : param.data || '',
            success     : function(res){//请求成功和状态正确时，才认为是成功
                //请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
                
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(res.statusText);
            }
        });
    },

    //获取服务器地址
    getServerUrl: function(path){
        return conf.serverHost + path;
    },

    //获取url参数
    getUrlParam: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        //window.location.search 就是网址里面？之后的字符串，substr(1)就是将？去除。
        //result要么是数组要么是空
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) :null;
    },

    //渲染html的方法模板
    renderHtml: function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate),
        result = template.render(data);
        return result;
    },

    //成功提示
    successTips: function(msg){
        alert(msg || '操作成功');
    },

    //失败提示
    errorTips: function(msg){
        alert(msg || '哪里不对啦~~~');
    },

    //字段的验证 value是字段（字符串），type是他的类型，支持非空、手机、邮箱验证
    validate: function(value, type){
        var value = $.trim(value);//去除前后空格
        //如果type是必须的字段，即必须有值（非空验证）
        if('require' === type){
            return !!value;//把value强转为 boolean 型
        }
        //手机号验证 正则验证，以1位开头，后面10位数字
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }

        //邮箱格式验证
        if('email' === type){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },

    //跳转到登录页面，登录完成后，跳转回登录页之前的页面，将之前的页面路径完全编码传回去，避免特殊字符的影响
    doLogin: function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //跳回主页
    goHome: function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;



 

