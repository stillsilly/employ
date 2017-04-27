define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        phone: "",
        password: "",
        phone_code: "",

        text: "获取验证码",
        status: "",

        // 功能描述：初始化
        ready: function () {
            //
        },

        // 功能描述：获取验证码
        message: function () {
            if (!$.utils.isTelphone(this.phone)) {
                $.poptips("请输入有效的用户名(手机号)！");
                return;
            }

            var me = this;
            var count = 59;
            $.utils.ajax({
                url: "/sms/send",
                data: { mobile: this.phone, type: 1 },
                success: function () {
                    me.text = "重新获取验证码(59)";
                    me.status = "disabled";

                    var id = setInterval(function () {
                        count--;
                        if (count == 0) {
                            me.text = "获取验证码";
                            me.status = "";
                            clearInterval(id);
                            return;
                        }
                        me.text = "重新获取验证码(" + count + ")";
                    }, 1000);
                }
            })
        },

        // 功能描述：加载
        register: function () {
            var data = {
                mobile: this.phone,
                passwd: this.password,
                captcha: this.phone_code
            }
            if (!$.utils.isTelphone(data.mobile)) {
                $.poptips("请输入有效的用户名！");
                return;
            }
            if (!$.utils.isUserNameOrPassword(data.passwd)) {
                $.poptips("请输入有效的密码！");
                return;
            }
            if (!data.captcha) {
                $.poptips("请输入验证码！");
                return;
            }
            $.utils.ajax({
                url: "/user/register",
                data: data,
                success: function (data, result) {
                    $.poptips("注册成功", function () {
                        $.jump("/User/Login");
                    })
                }
            })
        }
    }
    return module;
});