define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        status: 5,
        page: 1,
        list: [],

        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        // 功能描述：加载
        load: function () {
            var me = this;
            $.utils.ajax({
                url: "/requirement/task/list",
                data: { status: this.status, page: this.page },
                type: "GET",
                success: function (data, result) {
                    if (!data || !data.length) {
                        $.poptips("暂无数据");
                        return;
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
            if (item) {
                window.localStorage.setItem("model", JSON.stringify(item));
            }
            if(code==5){
                $.jump("/Demand/EvaluateEdit?jobid=" + item.jobID + "&id=" + item.taskID + "&uid=" + item.userID);
            }else if(code==6){
                $.jump("/Demand/SignInfo?jobid=" + item.jobID + "&id=" + item.taskID + "&uid=" + item.userID+'&taskid='+ item.taskID);
            }
            
        }
    }
    return module;
});