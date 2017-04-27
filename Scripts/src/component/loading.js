define(function () {
    var module = function () {
        this.init();
    };

    module.prototype = {
        // 功能描述：初始化
        init: function () {
            this.load();
            this.event();
        },

        // 功能描述：加载
        load: function () {
            var html = [];
            html.push("<div class=\"ui-loading\">");
            html.push("    <div class=\"ui-loading-mask\"></div>");
            html.push("    <div class=\"ui-loading-box\">");
            html.push("        <div class=\"loader\">loading</div>");
            html.push("    </div>");
            html.push("</div>");

            $(document.body).append(html.join(""));
        },

        // 功能描述：事件
        event: function () {
            $(".ui-loading-mask").click(function () {
                $(this).parent().remove();
            });
        },

        // 功能描述：销毁
        destory: function () {
            $(".ui-loading").remove();
        }
    }

    return module;
});