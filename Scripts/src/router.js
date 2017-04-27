define(["vue", "register"], function (Vue, Register) {
    var module = function () {
        this.init();
    }
    module.prototype = {
        // 功能描述：初始化
        init: function () {
            this.load();
        },

        // 功能描述：加载
        load: function () {
            // 加载指定模块
            require(["controller/" + this.get_module()], function (m) {
                var t = m.prototype;
                var methods = {};
                var data = {};
                var field = [];
                for (var prop in t) {
                    if (t.hasOwnProperty(prop) && prop != "ready") {
                        if (typeof t[prop] == "function") {
                            methods[prop] = t[prop];
                        } else {
                            if (!data[prop]) {
                                field.push(prop);
                            }
                            data[prop] = t[prop];
                        }
                    }
                }

                data.nav = $.utils.getQueryJSON() || {};

                methods["getAllData"] = function () {
                    if (!field.length) return null;

                    var result = {};
                    for (var i = 0; i < field.length; i++) {
                        result[field[i]] = this[field[i]];
                    }
                    return result;
                }

                // 注册组件
                Register(Vue);

                window.vm = new Vue({
                    el: '#app',
                    data: data,
                    ready: t["ready"],
                    methods: methods
                });
            });
        },

        // 功能描述：获取模块
        get_module: function () {
            var module = (window.location.pathname || "").replace(".html", "");
            module = module.replace(/employ\//gi,"").replace(/^\//, "").replace(/\/$/, "").replace("/", ".").toLowerCase();
            return module ? module : "index";
        }
    }
    return module;
});