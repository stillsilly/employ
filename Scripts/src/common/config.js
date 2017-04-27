define(function () {
    var module = {
        url: "http://baby.api.cform.cn/api/",

        // 功能描述：获取服务地址
        getServiceUrl: function (path) {
            return module.url + (path || "").replace(/^\s+|\s+$/, "").replace(/^\//, "");
        }
    }
    return module;
})