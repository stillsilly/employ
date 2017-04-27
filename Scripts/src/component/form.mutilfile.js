define(["upload"], function (upload) {
    var module = function (field) {
        this.field = field || {};
        this.container = field.container;
        this.init();
    }

    module.prototype = {
        container: null,
        field: {},

        // 功能描述：初始化
        init: function () {
            this.load();
            this.event();
        },

        // 功能描述：加载
        load: function () {
            var html = "<dd class=\"ui-form-row ui-form-mutil\"><em>" + this.field.chn + (this.field.checked ? "<sup>*</sup>" : "") + "</em>" + this.html() + "</dd>"
            this.container.append(html);
        },

        // 功能描述：获取html
        html: function () {
            var option = this.field.value || [];
            var html = [];
            html.push("<div class=\"ui-form-mutil-group\" id=\"" + this.field.id + "\">");
            html.push("<div class=\"ui-form-mutil-group-bd\">");
            html.push("<ul>");
            for (var i = 0; i < option.length; i++) {
                if (option[i]) {
                    html.push(this.getItem(option[i]));
                }
            }
            html.push("</ul>");
            html.push("</div>");
            if (!this.field.read) {
                html.push("<div class=\"ui-form-mutil-group-hd\"><button type=\"button\" id=\"" + this.field.id + "_upload\">添加PDF文件</button></div>");
                html.push("<div class=\"ui-form-upload-container\" id=\"" + this.field.id + "_container" + "\"></div>");
            }
            html.push("</div>");
            return html.join("");
        },

        // 功能描述：获取单项
        getItem: function (data) {
            return "<li><dl data-value=\"" + escape(data) + "\"><dt>" + data + "</dt><dd><ul><li class=\"js_btn_mutilfile_preview\">预览</li><li class=\"js_btn_mutilfile_del\">删除</li></ul></dd></li>";
        },
        
        // 功能描述：事件
        event: function () {
            var me = this;
            var obj = $("#" + this.field.id);
            if (!this.field.read) {
                new upload({
                    browse_button: this.field.id + "_upload",
                    container: this.field.id + "_container",
                    type: "file",
                    mime_types: { title: "PDF files", extensions: "pdf" },
                    addcallback: function (data) {
                        var html = me.getItem(data);
                        obj.find(".ui-form-mutil-group-bd > ul").append(html);
                    }
                });
            }

            // 预览
            $("#" + this.field.id).on("click", ".js_btn_mutilfile_preview", function () {
                var url = $(this).parent().parent().parent().data("value") || "";
                url = unescape(url);
                url = url + "?odconv/jpg/page/1/density/150/quality/80/resize/800";
                window.open(url, "_blank");
            });
            
            // 删除
            $("#" + this.field.id).on("click", ".js_btn_mutilfile_del", function () {
                $(this).parent().parent().parent().remove();
            });
        },

        // 功能描述：事件
        getVal: function () {
            if (this.field.getVal) {
                return this.field.getVal();
            }

            var result = [];
            $("#" + this.field.id).find("dl").each(function () {
                result.push(unescape($(this).data("value")));
            });

            return result;
        },

        // 功能描述：校验数据
        check: function () {
            var val = this.getVal() || "";
            if (!val || val == "") {
                var obj = $("#" + this.field.id);
                $.poptips("请上传：" + this.field.chn);
                return false;
            }
            return true;
        }
    }

    return module;
});