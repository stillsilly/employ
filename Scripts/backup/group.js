// 功能描述：产品图片详情
function loadProduct(option) {
    if (!option || !option.obj || !option.url) return;

    var code = "", name = "";
    var url = option.url, obj = option.obj, callback = option.callback;
    $.dialog({
        className: "image-fullscreen",
        title: "产品图片详情",
        method: "remote",
        ajax: { url: url },
        create: function (result) {
            var data = result.data || [];
            var html = [];
            html.push("<dl>");
            html.push("<dt>");
            html.push("<div class=\"left\"><i class=\"iconfont icon-left\"></i></div>");
            html.push("<ul>");
            for (var i = 0; i < data.length; i++) {
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\"><img src=\"" + (data[i].src || "") + "\" alt=\"\" /></li>");
            }
            html.push("</ul>");
            html.push("<div class=\"right\"><i class=\"iconfont icon-right\"></i></div>");
            html.push("</dt>");
            html.push("<dd><button type=\"button\">删除</button></dd>");
            html.push("</dl>");
            return html.join("");
        },
        event: function (dialog) {
            var code = obj.data("code") || "";
            var img = obj.find("img");

            $("#" + dialog.id + " .ui-dialog-bd ul li").each(function () {
                if ($(this).data("code") == code) {
                    $(this).addClass("cur");
                    return false;
                }
            });

            // 功能描述：上一个
            $("#" + dialog.id + " .ui-dialog-bd").on("click", "div.left", function () {
                if ($("#" + dialog.id + " .ui-dialog-bd li.cur").prev().length > 0) {
                    $("#" + dialog.id + " .ui-dialog-bd li.cur").removeClass("cur").prev().addClass("cur");
                }
            });

            // 功能描述：下一个
            $("#" + dialog.id + " .ui-dialog-bd").on("click", "div.right", function () {
                if ($("#" + dialog.id + " .ui-dialog-bd li.cur").next().length > 0) {
                    $("#" + dialog.id + " .ui-dialog-bd li.cur").removeClass("cur").next().addClass("cur");
                }
            });

            // 功能描述：删除
            $("#" + dialog.id + " .ui-dialog-bd").on("click", "button", function () {
                //此处增加代码处理删除事件
                if (confirm("是否删除?")) {
                    var cur = $("#" + dialog.id + " .ui-dialog-bd li.cur");
                    if ($.isFunction(callback)) {
                        callback({ cur: cur, img: img, dialog: dialog });
                    }
                }
            });
        }
    });
}

// 功能描述：供应商
function loadSupplier(obj) {
    var code = "", name = "";
    $.dialog({
        className: "edit",
        title: "新增产品供应商",
        method: "local",
        data: [{ code: "01", name: "供应商1" }, { code: "02", name: "供应商2" }, { code: "03", name: "供应商3" }],
        create: function (data) {
            var html = [];
            html.push("<dl>");
            html.push("<dt><input type=\"text\" placeholder=\"请输入产品供应商名称\" /></dt>");
            html.push("<dd><button type=\"button\">新增</button></dd>");
            html.push("</dl>");
            html.push("<div id=\"wrapper\" style=\"max-height:240px;\"><div class=\"scroller\">");
            html.push("<ul>");
            for (var i = 0; i < data.length; i++) {
                html.push("<li class=\"ui-focus\" data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "<i class=\"iconfont icon-close\" ></i></li>");
            }
            html.push("</ul>");
            html.push("</div></div>");
            return html.join("");
        },
        event: function (dialog) {
            // 功能描述：选择
            $("#" + dialog.id + " .ui-dialog-bd").on("click", "li", function () {
                name = unescape($(this).data("name") || "");
                code = unescape($(this).data("code") || "");

                obj.data("code", code);
                obj.data("name", name);
                obj.html(name);

                dialog.destory();
            });

            // 功能描述：删除
            $("#" + dialog.id + " .ui-dialog-bd").on("click", ".iconfont", function () {
                //此处增加代码处理删除事件
                if (confirm("是否删除?")) {
                    $(this).parent().remove();
                }
                return false;
            });

            // 功能描述：新增
            $("#" + dialog.id + " dl button[type=button]").click(function () {
                // 此处增加代码处理新增事件
                var name = $("#" + dialog.id + " dl input[type=text]").val() || "";
                var data = { code: new Date().getTime(), name: name };
                $("#" + dialog.id + " ul").append("<li class=\"ui-focus\" data-code=\"" + escape(data.code || "") + "\" data-name=\"" + escape(data.name || "") + "\" >" + (data.name || "") + "<i class=\"iconfont icon-close\" ></i></li>");

                $("#" + dialog.id + " dl input[type=text]").val("");
            });
        }
    });
}

// 功能描述：生产商
function loadMaker(obj) {
    var code = "", name = "";
    $.dialog({
        className: "edit",
        title: "新增产品生产商",
        method: "local",
        data: [{ code: "01", name: "生产商1" }, { code: "02", name: "生产商2" }, { code: "03", name: "生产商3" }],
        create: function (data) {
            var html = [];
            html.push("<dl>");
            html.push("<dt><input type=\"text\" placeholder=\"请输入产品生产商名称\" /></dt>");
            html.push("<dd><button type=\"button\">新增</button></dd>");
            html.push("</dl>");
            html.push("<div id=\"wrapper\" style=\"max-height:240px;\"><div class=\"scroller\">");
            html.push("<ul>");
            for (var i = 0; i < data.length; i++) {
                html.push("<li class=\"ui-focus\" data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "<i class=\"iconfont icon-close\" ></i></li>");
            }
            html.push("</ul>");
            html.push("</div></div>");
            return html.join("");
        },
        event: function (dialog) {
            // 功能描述：选择
            $("#" + dialog.id + " .ui-dialog-bd").on("click", "li", function () {
                name = unescape($(this).data("name") || "");
                code = unescape($(this).data("code") || "");

                obj.data("code", code);
                obj.data("name", name);
                obj.html(name);

                dialog.destory();
            });

            // 功能描述：删除
            $("#" + dialog.id + " .ui-dialog-bd").on("click", ".iconfont", function () {
                //此处增加代码处理删除事件
                if (confirm("是否删除?")) {
                    $(this).parent().remove();
                }
                return false;
            });

            // 功能描述：新增
            $("#" + dialog.id + " dl button[type=button]").click(function () {
                // 此处增加代码处理新增事件
                var name = $("#" + dialog.id + " dl input[type=text]").val() || "";
                var data = { code: new Date().getTime(), name: name };
                $("#" + dialog.id + " ul").append("<li class=\"ui-focus\" data-code=\"" + escape(data.code || "") + "\" data-name=\"" + escape(data.name || "") + "\" >" + (data.name || "") + "<i class=\"iconfont icon-close\" ></i></li>");

                $("#" + dialog.id + " dl input[type=text]").val("");
            });
        }
    });
}

// 功能描述：分类
function loadCategory(obj) {
    var code = "", name = "";
    $.dialog({
        className: "edit",
        title: "新增产品分类",
        method: "local",
        data: [{ code: "01", name: "分类1" }, { code: "02", name: "分类2" }, { code: "03", name: "分类3" }],
        create: function (data) {
            var html = [];
            html.push("<dl>");
            html.push("<dt><input type=\"text\" placeholder=\"请输入产品分类名称\" /></dt>");
            html.push("<dd><button type=\"button\">新增</button></dd>");
            html.push("</dl>");
            html.push("<div id=\"wrapper\" style=\"max-height:240px;\"><div class=\"scroller\">");
            html.push("<ul>");
            for (var i = 0; i < data.length; i++) {
                html.push("<li class=\"ui-focus\" data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "<i class=\"iconfont icon-close\" ></i></li>");
            }
            html.push("</ul>");
            html.push("</div></div>");
            return html.join("");
        },
        event: function (dialog) {
            // 功能描述：选择
            $("#" + dialog.id + " .ui-dialog-bd").on("click", "li", function () {
                name = unescape($(this).data("name") || "");
                code = unescape($(this).data("code") || "");

                obj.data("code", code);
                obj.data("name", name);
                obj.html(name);

                dialog.destory();
            });

            // 功能描述：删除
            $("#" + dialog.id + " .ui-dialog-bd").on("click", ".iconfont", function () {
                //此处增加代码处理删除事件
                if (confirm("是否删除?")) {
                    $(this).parent().remove();
                }
                return false;
            });

            // 功能描述：新增
            $("#" + dialog.id + " dl button[type=button]").click(function () {
                // 此处增加代码处理新增事件
                var name = $("#" + dialog.id + " dl input[type=text]").val() || "";
                var data = { code: new Date().getTime(), name: name };
                $("#" + dialog.id + " ul").append("<li class=\"ui-focus\" data-code=\"" + escape(data.code || "") + "\" data-name=\"" + escape(data.name || "") + "\" >" + (data.name || "") + "<i class=\"iconfont icon-close\" ></i></li>");

                $("#" + dialog.id + " dl input[type=text]").val("");
            });
        }
    });
}

// 功能描述：计量单位
function loadUnit(obj) {
    var code = "", name = "";
    $.dialog({
        className: "edit",
        title: "新增产品计量",
        method: "local",
        data: [{ code: "01", name: "件" }, { code: "02", name: "克" }, { code: "03", name: "升" }],
        create: function (data) {
            var html = [];
            html.push("<dl>");
            html.push("<dt><input type=\"text\" placeholder=\"请输入产品计量名称\" /></dt>");
            html.push("<dd><button type=\"button\">新增</button></dd>");
            html.push("</dl>");
            html.push("<div id=\"wrapper\" style=\"max-height:240px;\"><div class=\"scroller\">");
            html.push("<ul>");
            for (var i = 0; i < data.length; i++) {
                html.push("<li class=\"ui-focus\" data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "<i class=\"iconfont icon-close\" ></i></li>");
            }
            html.push("</ul>");
            html.push("</div></div>");
            return html.join("");
        },
        event: function (dialog) {
            // 功能描述：选择
            $("#" + dialog.id + " .ui-dialog-bd").on("click", "li", function () {
                name = unescape($(this).data("name") || "");
                code = unescape($(this).data("code") || "");

                obj.data("code", code);
                obj.data("name", name);
                obj.html(name);

                dialog.destory();
            });

            // 功能描述：删除
            $("#" + dialog.id + " .ui-dialog-bd").on("click", ".iconfont", function () {
                //此处增加代码处理删除事件
                if (confirm("是否删除?")) {
                    $(this).parent().remove();
                }
                return false;
            });

            // 功能描述：新增
            $("#" + dialog.id + " dl button[type=button]").click(function () {
                // 此处增加代码处理新增事件
                var name = $("#" + dialog.id + " dl input[type=text]").val() || "";
                var data = { code: new Date().getTime(), name: name };
                $("#" + dialog.id + " ul").append("<li class=\"ui-focus\" data-code=\"" + escape(data.code || "") + "\" data-name=\"" + escape(data.name || "") + "\" >" + (data.name || "") + "<i class=\"iconfont icon-close\" ></i></li>");

                $("#" + dialog.id + " dl input[type=text]").val("");
            });
        }
    });
}

// 功能描述：货币
function loadCurrency(obj) {
    var code = "", name = "";
    $.dialog({
        className: "currency",
        title: "选择货币类型",
        method: "local",
        data: [{ code: "01", name: "人民币" }, { code: "02", name: "美元" }, { code: "03", name: "欧元" }, { code: "04", name: "英镑" }, { code: "05", name: "日元" }],
        create: function (data) {
            var html = [];
            for (var i = 0; i < data.length; i++) {
                html.push("<li class=\"ui-focus\" data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "</li>");
            }
            return "<ul>" + html.join("") + "</ul>";
        },
        event: function (dialog) {
            $("#" + dialog.id + " .ui-dialog-bd li").click(function () {
                name = unescape($(this).data("name") || "");
                code = unescape($(this).data("code") || "");

                obj.data("code", code);
                obj.data("name", name);
                obj.html(name);

                dialog.destory();
            })
        }
    });
}

function loadPerson(obj) {
    $.dialog({
        className: "mutil",
        title: "员工列表",
        method: "remote",
        ajax: { url: "/home/getemp", type: "POST", data: { type: "01" }, page: { pageIndex: 1, pageSize: 12 } },
        loadmoreauto: "custom",
        create: function (result) {
            if (!result || isNaN(result.code) || result.code == 6) {
                alert(result.message || "数据返回异常~");
                return;
            }
            var data = result.data || [];
            var html = [];
            var code = obj.data("code") || "";
            var temp = (code == "" ? [] : code.split(";"));
            for (var i = 0; i < data.length; i++) {
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "<input type=\"checkbox\" " + ($.inArray(data[i].code, temp) >= 0 ? "checked=\"checked\"" : "") + " /></li>");
            }
            return "<div id=\"wrapper\" style=\"max-height:240px;\"><div class=\"scroller\"><ul>" + html.join("") + "</ul></div></div><div class=\"ui-dialog-more\">查看更多...<i class=\"iconfont icon-unfold\"></i></div><div class=\"button\"><button type=\"button\">确定</button></div>";
        },
        loadmore: function (dialog, result) {
            if (!result || isNaN(result.code) || result.code == 6) {
                alert(result.message || "数据返回异常~");
                return;
            }
            var data = result.data || [];
            if (!$.isArray(data) || data.length == 0) {
                $("#" + dialog.id + " .ui-dialog-more").addClass("ui-disabled");
                $("#" + dialog.id + " .ui-dialog-more").html("没有更多内容了...");
            } else {
                $("#" + dialog.id + " .ui-dialog-more").removeClass("ui-disabled");
            }
            var html = [];
            var code = obj.data("code") || "";
            var temp = (code == "" ? [] : code.split(";"));
            for (var i = 0; i < data.length; i++) {
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "<input type=\"checkbox\" " + ($.inArray(data[i].code, temp) >= 0 ? "checked=\"checked\"" : "") + " /></li>");
            }
            var bd = $("#" + dialog.id + " .ui-dialog-bd");
            var ul = bd.find("ul");
            ul.append(html.join(""));
            bd.scrollTop(ul.offset().height);
        },
        event: function (dialog) {
            $("#" + dialog.id + " .ui-dialog-bd .button button[type=button]").click(function () {
                var code = "", name = "";
                $(this).parent().parent().find("input[type=checkbox]").each(function () {
                    if (!$(this).is(":checked")) return;

                    code += unescape($(this).parent().data("code") || "") + ";";
                    name += unescape($(this).parent().data("name") || "") + ";";
                });

                code = code.replace(/;$/, "");
                name = name.replace(/;$/, "");

                obj.data("code", code);
                obj.data("name", name);
                obj.html(name.replace(/;/gi, "、"));

                dialog.destory();
            })
        }
    });
}

$(function () {
    $(".ui-focus").click(function () {
        var type = $(this).data("type") || "";
        if (type == "") return;

        var obj = $(this).find("span");
        var option = {};
        switch (type) {
            case "currency": //货币
                loadCurrency(obj);
                break;
            case "unit": //计量单位
                loadUnit(obj);
                break;
            case "category": //分类
                loadCategory(obj);
                break;
            case "supplier": // 供应商
                loadSupplier(obj);
                break;
            case "maker": // 生产商
                loadMaker(obj);
                break;
            case "product": // 产品图片详情
                var src = $(this).find("img").attr("src") || "";
                if (src == "../../images/bg-white.jpg") {
                    return;
                }
                var url = $(this).parent().data("url") || "";
                var url_del = $(this).parent().data("url-del") || "";
                loadProduct({
                    obj: $(this),
                    url: url,
                    callback: function (option) {
                        if (!option || !option.cur || !option.img) return;

                        var cur = option.cur, img = option.img, dialog = option.dialog;
                        var code = cur.data("code") || "";
                        $.ajax({
                            url: url_del,
                            data: { code: code },
                            success: function () {
                                img.parent().remove();

                                var next = $("#" + dialog.id + " .ui-dialog-bd li.cur").next();
                                if (next.length > 0) {
                                    cur.remove();
                                    next.addClass("cur");
                                    return;
                                }
                                var prev = $("#" + dialog.id + " .ui-dialog-bd li.cur").prev();
                                if (prev.length > 0) {
                                    cur.remove();
                                    prev.addClass("cur");
                                    return;
                                }

                                cur.remove();
                            }
                        })
                    }
                });
                break;
            case "perlist"://员工列表
                loadPerson(obj);
                break;
        }
    });

    $(".ui-select-employee").click(function () {
        var obj = $(this).parent().parent().find(".ui-employee");
        loadPerson(obj);
    });
})