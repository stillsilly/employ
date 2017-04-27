define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        userID: 1,
        model: {},

        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        load: function () {
            var me = this;
            $.utils.ajax({
                url: "/service/resume/detail",
                data: { userID: this.nav.uid },
                type: "GET",
                success: function (data, result) {
                    me.model = data || {};
                },
                error: function () {
                    me.model = {};
                }
            })
        },

        // 功能描述：执行动作
        message: function (code, id,msg) {
            console.log(code)
            id = id ? id : this.nav.uid;
            switch (code) {
                case 1:
                    this.ignore(id);
                    break;
                case 2:
                    this.pass(id);
                    break;
                case 3:
                    this.ignore(id);
                    break;
                case 4:
                    this.notice(id);
                    break;
                case 5:
                    this.evaluate(id);
                    break;
                case 6:
                    this.signWork(id);
                    break;
                case 8:
                    this.payConfirm(id,msg);
                    break;

            }
        },
        signWork: function (id) {
            $.jump("/Demand/SignInfo?taskid=" + this.nav.taskID + "&uid=" + id);
        },
        // 忽略
        ignore: function (id) {
            $.confirm("确认忽略该简历吗？", function () {
                this.passorignore(id, 2);
            }.bind(this));
        },
        // 待结算
        payConfirm:function(id,msg){
            $.jump("/Demand/PayConfirm?id=" + this.nav.id + "&uid=" + id+'&taskID='+this.nav.taskID);
        },
        // 通过
        pass: function (id) {
            $.confirm("确认通过该简历吗？", function () {
                this.passorignore(id, 1);
            }.bind(this));
        },

        // 忽略或通过
        passorignore: function (id, type) {
            $.utils.ajax({
                url: "requirement/resume/passorignore",
                data: { jobID: this.nav.id, userID: id, type: type },
                type: "GET",
                success: function (data, result) {
                    $.poptips(data ? "操作成功" : "操作失败");
                    if(data){
                        history.go(-1);
                    }
                },
                error: function () {
                    $.poptips("操作失败");
                }
            })
        },

        // 通知
        notice: function (id) {
            $.jump("/Demand/Task?id=" + this.nav.id + "&uid=" + id);
        },

        // 评价
        evaluate: function (id) {
            $.jump("/Demand/EvaluateEdit?id=" + this.nav.id + "&uid=" + id);
        }
    }
    return module;
});