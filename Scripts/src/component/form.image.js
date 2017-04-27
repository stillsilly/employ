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
            html.push("<dd class=\"ui-form-row ui-form-image\"><em>" + this.field.chn + (this.field.checked ? "<sup>*</sup>" : "") + "</em>");
            html.push("<div class=\"img\"><span><i class=\"iconfont icon-delete\"></i></span><img data-url=\"" + this.field.value + "\" src=\"" + (this.field.value || "/images/upload_text.jpg") + "\" id=\"" + this.field.id + "\" alt=\"\" /></div>");
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
                    type: "image",
                    mime_types: { title: "Image files", extensions: "jpg,png,tif" },
                    callback: function (status, data) {
                        if (me.field.value == data.url) {
                            obj.removeClass("ui-form-change");
                        } else {
                            obj.addClass("ui-form-change");
                        }
                    }
                });

                var img = this.container.find(".img");
                var imgobj = img.find("img");
                img.bind("mouseover", function () {
                    if (!imgobj.data("url")) return;

                    img.addClass("show");
                }).bind("mouseout", function () {
                    if (!imgobj.data("url")) return;

                    img.removeClass("show");
                });

                img.find(".iconfont").click(function () {
                    $.artDialog({
                        title: '提示',
                        content: "是否删除当前图片?",
                        okValue: '确定',
                        ok: function () {
                            imgobj.data("url", "");
                            imgobj.attr("src", "/images/upload_text.jpg");
                        },
                        cancelValue: '取消',
                        cancel: function () { }
                    });
                })
            }
        },

        // 功能描述：事件
        getVal: function () {
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