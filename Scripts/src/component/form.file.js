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
            var html = [];
            html.push("<dd class=\"ui-form-row ui-form-file\"><em>" + this.field.chn + (this.field.checked ? "<sup>*</sup>" : "") + "</em>");
            html.push("<div class=\"ui-form-file-input\" id=\"" + this.field.id + "\" data-url=\"" + this.field.value + "\" >" + (this.field.value || "请点击上传文件") + "</div>");
            html.push("<button type=\"button\" id=\"" + this.field.id + "_preview\">预览</button>");
            if (!this.field.read) {
                html.push("<div class=\"ui-form-upload-container\" id=\"" + this.field.id + "_container" + "\"></div>");
            }
            html.push("</dd>");
            this.container.append(html.join(""));
        },

        // 功能描述：事件
        event: function () {
            var me = this;
            var obj = $("#" + this.field.id);
            if (!this.field.read) {
                new upload({
                    browse_button: this.field.id,
                    container: this.field.id + "_container",
                    type: "file",
                    mime_types: { title: "PDF files", extensions: "pdf" },
                    callback: function (status, data) {
                        if (me.field.value == data.url) {
                            obj.removeClass("ui-form-change");
                        } else {
                            obj.addClass("ui-form-change");
                        }
                    }
                });
            }

            var me = this;
            $("#" + this.field.id + "_preview").click(function () {
                me.preview();
            });
        },

        // 功能描述：预览
        preview: function () {
            var obj = $("#" + this.field.id);
            var url = obj.data("url") || "";
            window.open(url, "_blank");
        },

        // 功能描述：事件
        getVal: function () {
            if (this.field.read) return this.field.value;

            return this.field.getVal ? this.field.getVal() : $("#" + this.field.id).data("url") || "";
        },

        // 功能描述：校验数据
        check: function () {
            var val = this.getVal() || "";
            if (!val || val == "") {
                var obj = $("#" + this.field.id);
                obj.parent().addClass("ui-form-change");
                $.poptips("请上传：" + this.field.chn);
                return false;
            }
            return true;
        }
    }

    return module;
});