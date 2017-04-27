define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        realName: "",
        headerImg: "",
        storeName: "",
        areaName:'',
        positionName: "",
        publishedNum: 0,
        settlementNum:0,
        evaluationNum:0,
        CustomerService: {
            tel: "400-400-400",
            workDay: "9:00-22:00",
            festival: "10:00-18:00"
        },

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
                    me.settlementNum = data.settlementNum;
                    me.areaName=data.areaName;
                    if (me.areaName && me.positionName) {
                        me.areaName = me.areaName + '-';
                    }
                    me.evaluationNum = data.evaluationNum;
                    me.CustomerService = data.CustomerService || {
                        tel: "400-400-400",
                        workDay: "9:00-22:00",
                        festival: "10:00-18:00"
                    };
                }
            });
        },

        // 功能描述：联系我们
        contact: function () {
            $.dialog("<div class=\"ui-dialog-contact\">\
            <em>- 客服电话 -</em>\
            <b>"+ this.CustomerService.tel + "</b>\
            <i>工作日  "+ this.CustomerService.workDay + "</i>\
            <i>节假日  "+ this.CustomerService.festival + "</i>\
            </div>", ["取消", "拨打"], function (tag) {
                    if (tag == 1) {
                        window.location.href = "tel:15216724982";
                    }
                });
        },
        jumpDetail:function(){
            $.jump("/Demand/Info");
        }
    }
    return module;
});