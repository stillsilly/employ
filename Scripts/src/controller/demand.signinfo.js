define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        list: [],

        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        // 功能描述：加载
        load: function () {
            var me = this;
            $.utils.ajax({
                url: "/service/user/sign/detail",
                data: { taskID: this.nav.taskid },
                type: "GET",
                success: function (data, result) {
                    me.list = data;
                },
                error: function () {
                    me.list = [];
                }
            })
        }
    }
    return module;
});