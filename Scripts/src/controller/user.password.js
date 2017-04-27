define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        password: "",
        password_new: "",
        password_confirm: "",

        // 功能描述：加载
        ready: function () {
            console.log("ready");
        },

        // 功能描述：登录
        submit: function () {
            var data = {
                password: this.password,
                password_new: this.password_new,
                password_confirm: this.password_confirm
            }
            $.poptips("修改密码成功");
        }
    }
    return module;
});