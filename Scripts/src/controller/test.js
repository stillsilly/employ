define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        // 功能描述：加载
        ready: function () {
            this.load();
        },

        // 功能描述：登录
        load: function () {
            $.utils.ajax({
                url: "/getwechatuserinfo",
                data: { code: this.nav.code },
                success: function (data, result) {
                    if (!data.errcode) {
                        // $.dialog("微信登录成功~");18682213525  931219
                        window.localStorage.setItem("usr", JSON.stringify(data));
                        window.localStorage.setItem("app_id", data.openid);
                        window.localStorage.setItem("header_img", data.headimgurl);
                        $.jump("/User/Login?usertype=2");
                    } else {
                        $.dialog("微信登录失败~");
                        // history.go(-1);
                        $.jump("/User/Login?usertype=2");
                    }
                },
                error:function(){
                    $.dialog("微信登录失败~");
                    // history.go(-1);
                    $.jump("/User/Login?usertype=2");
                }
            })
        },

        // 跳转到登录页面
        jump: function () {
            $.jump("/User/Login?usertype=2");
        }
    }
    return module;
});