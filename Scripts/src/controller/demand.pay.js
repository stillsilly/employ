define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        status: 6,
        page: 1,
        list: [],
        title: "",

        // 功能描述：初始化
        ready: function () {
            this.title = { 6: "待结算", 9: "已完成" }[this.nav.status || 6];
            this.load();
        },

        load: function () {
            var me = this;
            $.utils.ajax({
                url: "/requirement/task/list",
                data: { status: this.nav.status || 8, page: this.page },
                type: "GET",
                success: function (data, result) {
                    if (!data || !data.length) {
                        $.poptips("暂无数据");
                        return
                    }
                    me.list = data || [];
                },
                error: function () {
                    me.list = [];
                }
            })
        },

        // 功能描述：执行动作
        message: function (code, id, item) {
            switch (code) {
                case 6:
                    $.jump("/Demand/SignInfo?jobid=" + item.jobID + "&id=" + item.taskID + "&uid=" + item.userID+'&taskid='+ item.taskID);
                    break;
                case 8:
                    $.jump("/Demand/PayItem?jobid=" + item.jobID + "&taskid=" + item.taskID);
                    break;
            }
        }
    }
    return module;
});