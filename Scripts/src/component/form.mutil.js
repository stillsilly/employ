define(function () {
    var module = function (field) {
        if (!field || !field.container) return;

        this.field = field || {};
        this.container = this.field.container;
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
            var html = "<dd class=\"ui-form-row ui-form-mutil\"><em>" + this.field.chn + (this.field.checked ? "<sup>*</sup>" : "") + "</em>" + this.html(this.field.value) + "</dd>"
            this.container.append(html);
        },

        // 功能描述：获取html
        html: function (option) {
            var html = [];
            html.push("<div class=\"ui-form-mutil-group\" id=\"" + this.field.id + "\">");
            html.push("<div class=\"ui-form-mutil-group-bd\">");
            html.push("<ul>");
            for (var i = 0; i < option.length; i++) {
                html.push(this.getItem(option[i]));
            }
            html.push("</ul>");
            html.push("</div>");
            if (!this.field.read) {
                html.push("<div class=\"ui-form-mutil-group-hd\"><button type=\"button\" id=\"js_btn_add_board\">添加期刊版类</button></div>");
            }
            html.push("</div>");
            return html.join("");
        },

        // 功能描述：获取单项
        getItem: function (data) {
            return "<li><dl data-value=\"" + escape(JSON.stringify(data)) + "\"><dt>" + data.title + "</dt><dd><ul><li class=\"js_btn_mutil_edit\">修改</li><li class=\"js_btn_mutil_del\">删除</li></ul></dd></li>";
        },
        
        // 功能描述：绑定事件
        event: function () {
            var me = this;
            var ul = $("#" + this.field.id).find(".ui-form-mutil-group-bd > ul");

            $("#js_btn_add_board").click(function () {
                $.artDialog({
                    title: "新增期刊版类",
                    content: "<ul class=\"ui-dialog-item\"><li><em>版类：</em><input class=\"ui-dialog-input\" id=\"js_cate\" autofocus /></li><li><em>标题：</em><input class=\"ui-dialog-input\" id=\"js_name\" autofocus /></li></ul>",
                    okValue: '确定',
                    ok: function () {
                        var cate = ($('#js_cate').val() || "").replace(/^\s+|\s+$/, "");
                        var name = ($('#js_name').val() || "").replace(/^\s+|\s+$/, "");
                        $.utils.ajax({
                            url: "/boards",
                            type: "POST",
                            data: JSON.stringify({ cate: cate, name: name }),
                            success: function (data) {
                                $.poptips("新增期刊版类成功", function () {
                                    ul.append(me.getItem(data));
                                });
                            }
                        });
                    },
                    cancelValue: '取消',
                    cancel: function () { }
                });
            });

            // 编辑
            $("body").on("click", ".js_btn_mutil_edit", function () {
                var obj = $(this).parent().parent().parent();
                var data = JSON.parse(unescape(obj.data("value")));
                $.artDialog({
                    title: "编辑期刊版类",
                    content: "<ul class=\"ui-dialog-item\"><li><em>版类：</em><input class=\"ui-dialog-input\" id=\"js_cate\" autofocus value=\"" + data.cate + "\" /></li><li><em>标题：</em><input class=\"ui-dialog-input\" id=\"js_name\" autofocus value=\"" + data.name + "\" /></li></ul>",
                    okValue: '确定',
                    ok: function () {
                        var cate = ($('#js_cate').val() || "").replace(/^\s+|\s+$/, "");
                        var name = ($('#js_name').val() || "").replace(/^\s+|\s+$/, "");
                        $.utils.ajax({
                            url: "/boards/" + data.id,
                            type: "patch",
                            data: JSON.stringify({ cate: cate, name: name, title: cate + "、" + name }),
                            success: function (data) {
                                $.poptips("修改期刊版类成功", function () {
                                    obj.find("dt").html(data.title)
                                    obj.data("value", escape(JSON.stringify(data)));
                                });
                            }
                        });
                    },
                    cancelValue: '取消',
                    cancel: function () { }
                });
            });
            
            // 编辑
            $("body").on("click", ".js_btn_mutil_del", function () {
                var obj = $(this).parent().parent().parent();
                var data = JSON.parse(unescape(obj.data("value")));
                $.artDialog({
                    title: "删除期刊版类",
                    content: "是否删除当前版类?",
                    okValue: '确定',
                    ok: function () {
                        $.utils.ajax({
                            url: "/boards/" + data.id,
                            type: "delete",
                            success: function (data) {
                                $.poptips("删除期刊版类成功", function () {
                                    obj.parent().remove();
                                });
                            }
                        });
                    },
                    cancelValue: '取消',
                    cancel: function () { }
                });
            });
        },

        // 功能描述：事件
        getVal: function () {
            if (this.field.getVal) {
                return this.field.getVal();
            }

            var result = [];
            $("#" + this.field.id).find("dl").each(function () {
                var data = JSON.parse(unescape($(this).data("value")));
                result.push({ id: data.id });
            });

            return result;
        },

        // 功能描述：校验数据
        check: function () {
            var val = this.getVal() || [];
            if (!val || !val.length) {
                var obj = $("#" + this.field.id);
                obj.parent().addClass("ui-form-change");
                $.poptips("请选择：" + this.field.chn);
                return false;
            }
            return true;
        }
    }

    return module;
})