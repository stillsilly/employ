define(["md5"], function (md5) {
    var module = function () {
        //
    };
    module.prototype = {
        phone: "",
        password: "",
        chart_code: "",
        phone_code: "",

        text: "获取验证码",
        status: "",

        // 功能描述：加载
        ready: function () {
            console.log("ready");
        },

        // 功能描述：登录
        login: function () {
            if(!this.phone){
                $.poptips("请输入手机号！");
                return
            }
            if (!$.utils.isTelphone(this.phone)) {
                $.poptips("请输入有效的手机号！");
                return;
            }
            if(!this.phone_code){
                $.poptips("请输入验证码！");
                 return
            }
            if(!this.password){
                $.poptips("请输入新密码！");
                 return
            }
            var data = {
                mobile: this.phone,
                new_passwd: hex_md5(this.password),
                captcha: parseInt(this.phone_code),
                type: 2
            }

            $.utils.ajax({
                url: "/user/resetpasswd",
                data: data,
                success: function (data, result) {
                    if (data) {
                        $.poptips("密码修改成功，请重新登录~", function () {
                            // $.jump("/User/Login");
                        });
                    }
                }
            })
        },

        // 获取图形验证码
        message: function (type) {
            if (!$.utils.isTelphone(this.phone)) {
                $.poptips("请输入有效的手机号！");
                return;
            }

            var me = this;
            var count = 59;
            $.utils.ajax({
                url: "/sms/send",
                data: { mobile: this.phone, type: 4 },
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
        }
    }
    return module;
});