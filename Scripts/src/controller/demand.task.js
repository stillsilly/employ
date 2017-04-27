define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        model: {},

        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        load: function () {
            var me = this;
            $.utils.ajax({
                url: "/requirement/page/sendtask",
                data: { userID: this.nav.uid ,jobID:this.nav.id},
                type: "GET",
                success: function (data, result) {
                    me.model = data;
                },
                error: function () {
                    me.model = {};
                }
            })
        },

        // 功能描述：加载
        send: function () {
            $.utils.ajax({
                url: "/requirement/sendtask",
                data: { userID: this.nav.uid, jobID: this.nav.id },
                type: "GET",
                success: function (data, result) {
                    $.poptips("已发送任务通知");
                    history.go(-1);
                },
                error: function () {
                    //
                }
            })
        }
    }
    return module;
});