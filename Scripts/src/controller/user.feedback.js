define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        img: "",
        feedback: "",

        // 功能描述：初始化
        ready: function () {
            //
        },

        // 功能描述：加载
        submit: function () {
            $.utils.ajax({
                url: "/common/feedback",
                data: { typeID: this.nav.type || 1, content: this.feedback, img: this.img },
                type: "GET",
                success: function (data, result) {
                    $.poptips("提交成功!", function () {
                        $.jump("/Demand/User");
                    })
                },
                error: function () {
                    $.poptips("提交失败!")
                }
            })
        }
    }
    return module;
});