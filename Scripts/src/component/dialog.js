define(function () {
    var module = function (option) {
        if (!option || !option.message) return;

        this.message = option.message;
        this.init();
    }

    module.prototype = {
        // 功能描述：初始化
        init: function () {
            this.load();
            this.event();
        },

        // 功能描述：加载
        load: function () {
            var html = [];
            html.push("<div class=\"ui-dialog\">");
            html.push("    <div class=\"ui-dialog-mask\"></div>");
            html.push("    <div class=\"ui-dialog-box\">");
            html.push("        <div class=\"ui-dialog-message\">" + this.message + "</div>");
            html.push("    </div>");
            html.push("</div>");

            $(document.body).append(html.join(""));
        },

        // 功能描述：事件绑定
        event: function () {
            var me = this;

            $(".ui-dialog-mask").click(function () {
                me.destory();
            });
        },

        // 功能描述：销毁
        destory: function () {
            $(".ui-dialog").remove();
        }
    }

    return module;
})