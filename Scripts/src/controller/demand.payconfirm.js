define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        card: {},
        resume: {},
        model: {
            saleTarget: "",
            dailyTarget: [
                { chn: '2017-03-23', value: '' },
                { chn: '2017-03-24', value: '' },
                { chn: '2017-03-25', value: '' }
            ],
            payable: "",
            desc: ""
        },

        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        load: function () {
            var me = this;

            // 获取结算详情
            $.utils.ajax({
                url: "/requirement/task/settlement",
                data: { taskID: this.nav.taskID },
                type: "GET",
                success: function (data, result) {
                    var dailyTarget = [];
                    var signDate = data.signDate || [];
                    if (signDate && signDate.length) {
                        for (var i = 0; i < signDate.length; i++) {
                            dailyTarget.push({ chn: signDate[i], value: "" });
                        }
                    }
                    me.model.dailyTarget = dailyTarget;
                    me.card = data.task || {};
                    me.resume = data.userDetail || {};
                },
                error: function () {
                    me.card = {};
                }
            })
        },

        // 功能描述：加载
        submit: function () {
            if(!this.model.saleTarget){
                $.poptips("请填写日销售指标");
                return;
            }
            if(!this.model.payable){
                $.poptips("请填写薪资确认");
                return;
            }
            $.dialog("是否现在进行结算确认？", ["不用", "确认"], function (tag) {
                if (!tag) return;
                
                var data = {
                    taskID: this.nav.taskID,
                    dailyTarget: JSON.stringify(this.model.dailyTarget),
                    saleTarget: this.model.saleTarget,
                    payable: this.model.payable,
                    desc: this.model.desc
                }
                $.utils.ajax({
                    url: "/requirement/task/confirm/settlement",
                    data: data,
                    type: "GET",
                    success: function (data, result) {
                        $.poptips("提交成功", function () {
                            window.history.back();
                        })
                    }
                })
            }.bind(this));
        }
    }
    return module;
});