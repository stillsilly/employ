define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        realName: "",
        headerImg: "",
        storeName: "",
        positionName: "",
        tel:'',
        publishedNum: 0,
        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        // 功能描述：加载
        load: function () {
            var me = this;
            $.utils.ajax({
                url: "/requirement/user/personalcenter",
                type: "GET",
                success: function (data, result) {
                    me.realName = data.realName;
                    me.headerImg = $.utils.getImageAblum(data.headerImg);
                    me.storeName = data.storeName;
                    me.positionName = data.positionName;
                    me.publishedNum = data.publishedNum || 0;
                    me.tel=data.mobile;
                    me.CustomerService = data.CustomerService || {
                        tel: "400-400-400",
                        workDay: "9:00-22:00",
                        festival: "10:00-18:00"
                    };
                }
            });
        },

        // 功能描述：更换头像
        change: function () {
            $.poptips("更换头像~");
        },

        // 功能描述：绑定手机
        bind: function () {
            $.poptips("绑定手机~");
            $.jump("/User/Phone");
        },

        // 功能描述：修改密码
        modify: function () {
            $.poptips("修改密码~");
            $.jump("/User/Forget");
        },

        // 功能描述：退出登录
        quit: function () {
            $.poptips("退出登录~");
            $.jump("/User/Login");
        }
    }
    return module;
});