define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        status: 6,
        page: 1,
        data: {
            number: 0,
            workNumber: 0,
            taskList: []
        },
        title: "待结算详情",

        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        load: function () {
            var me = this;
            $.utils.ajax({
                url: "/requirement/settlement/detail",
                data: { jobID: this.nav.jobid },
                type: "GET",
                success: function (data, result) {
                    me.data = data || {
                        number: 0,
                        workNumber: 0,
                        taskList: []
                    };
                }
            })
        },

        // 功能描述：执行动作
        message: function (code, id, item) {
            switch (code) {
                case 6:
                    this.sign(item);
                    break;
                case 8:
                    this.confirm(item);
                    break;
            }
        },

        // 签到详情
        sign: function (item) {
            $.jump("/Demand/SignInfo?jobid=" + item.jobID + "&id=" + item.taskID + "&uid=" + item.userID+'&taskid='+ item.taskID);
        },
        // 结算确认
        confirm: function (item) {
            $.jump("/Demand/PayConfirm?jobid=" + item.jobID + "&id=" + item.taskID + "&uid=" + item.userID+'&taskID='+ item.taskID);
        }
    }
    return module;
});