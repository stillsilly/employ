define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        phone: "",
        phone_code: "",

        // 功能描述：初始化
        ready: function () {
            //
        },

        // 功能描述：加载
        message: function (data) {
            if(data=='2'){
                $.utils.ajax({
                url: "/service/requirement/detail",
                data: { mobile: this.phone,type:'' },
                type: "GET",
                success: function (data, result) {
                    if (!data) return;

                    for (var key in data) {
                        if (me[key]) {
                            me[key] = data[key];
                        }
                    }
                },
                error: function () {
                    me.item = {};
                }
            })
            }
        },

        // 功能描述：加载
        login: function () {
            console.log("login");
        }
    }
    return module;
});