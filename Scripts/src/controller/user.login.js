define(["md5"], function (md5) {
    var module = function () {
        //
    };
    module.prototype = {
        phone: "",
        password: "",
        usertype: "2",

        // 功能描述：加载
        ready: function () {
            this.usertype = this.nav.usertype || "2";
            // $('body').css({ backgroundSize: $(window).width() + "px " + $(window).height() + "px" });
        },

        // 功能描述：登录
        login: function () {
            var data = {
                name: this.phone,
                passwd: this.password
            }
            if(!/^1[3|4|5|7|8]\d{9}$/.test(data.name)){
                $.poptips("请输入有效的手机号！");
                return ;
            }
            if (!$.utils.isUserNameOrPassword(data.name)) {
                $.poptips("请输入有效的用户名！");
                return;
            }
            if (!$.utils.isUserNameOrPassword(data.passwd)) {
                $.poptips("请输入有效的密码！");
                return;
            }
            data.passwd = hex_md5(data.passwd);
            data.type = this.usertype;
            $.utils.ajax({
                url: "/user/login",
                data: data,
                success: function (data, result) {
                    if (data) {
                        $.poptips("登录成功~", function () {
                            $.jump("/Demand/User");
                        });
                    }
                }
            })
        },

        // 功能描述：注册
        register: function () {
            $.jump("/User/Register");
        }
    }
    return module;
});