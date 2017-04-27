define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        model: {},
        taskID: 0,
        typeID: 2,
        punctuality: "3",
        proactive: "3",
        completeness: "3",

        // 功能描述：初始化
        ready: function () {
            this.taskID = this.nav.id;
            var data = window.localStorage.getItem("model");
            this.model = data ? JSON.parse(data) : {};
        },

        // 功能描述：执行动作
        submit: function () {
            
            if(this.typeID==1){
                var data = {
                    taskID: this.taskID,
                    typeID: this.typeID
                }
            }else {
                var data = {
                    taskID: this.taskID,
                    typeID: this.typeID,
                    punctuality: this.punctuality,
                    proactive: this.proactive,
                    completeness: this.completeness,
                }
            }
            var me=this;
            $.utils.ajax({
                url: "/requirement/user/evaluation",
                data: data,
                success: function (data, result) {
                    $.poptips(data.errmsg || "提交成功~", function () {
                        if (!data.errmsg) {
                            $.dialog("是否现在进行结算确认？", ["不用", "去确认"], function (tag) {
                                if (!tag){
                                    history.go(-1);
                                }else{
                                    $.jump("/Demand/PayConfirm?jobid=" + item.jobID + "&taskID=" + me.taskID);
                                }
                            }.bind(this));
                        }
                    });
                },error:function(err){

                }

            })
        }
    }
    return module;
});