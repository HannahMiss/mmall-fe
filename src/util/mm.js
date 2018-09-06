/**
 * @description 工具类对象
 * @param obj 对象
 * 
 */


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

    //跳转到登录页面，登录完成后，跳转回登录页之前的页面，将之前的页面路径完全编码传回去，避免特殊字符的影响
    doLogin: function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.exports = _mm;



// /**
//  * @desc 工具类对象
//  * @param obj 对象
//  * @returns true||false
//  */
// var Tools = {
//     isArray : function(obj) {
//         return Object.prototype.toString.call(obj) === '[object Array]';
//     },
//     isObject : function(obj) {
//         return Object.prototype.toString.call(obj) === '[object Object]';
//     },
//     isNumber : function(obj) {
//         return Object.prototype.toString.call(obj) === '[object Number]';
//     },
//     isString : function(obj) {
//         return Object.prototype.toString.call(obj) === '[object String]';
//     },
//     isFunction : function(obj) {
//         return Object.prototype.toString.call(obj) === '[object Function]';
//     },
//     isBoolean : function(obj) {
//         return Object.prototype.toString.call(obj) === '[object Boolean]';
//     },
//     isNull : function(obj) {
//         return obj == null || obj == '' || obj == undefined;
//     },
//     isNotNull : function(obj) {
//         return !this.isNull(obj);
//     },
//     randomNum(min, max) {
//         return Math.floor(min + Math.random() * (max - min));
//     }
// };


