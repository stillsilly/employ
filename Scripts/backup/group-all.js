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

// 功能描述：员工
function loadPerson(obj, appendAccount) {
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
            var account = "";
            for (var i = 0; i < data.length; i++) {
                account = appendAccount ? data[i].account || "" : "";
                account = account == "" ? "" : "<em>有账号</em>";
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + account + "<input type=\"checkbox\" " + ($.inArray(data[i].code, temp) >= 0 ? "checked=\"checked\"" : "") + " /></li>");
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
            var account = "";
            for (var i = 0; i < data.length; i++) {
                account = appendAccount ? data[i].account || "" : "";
                account = account == "" ? "" : "<em>有账号</em>";
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + account + "<input type=\"checkbox\" " + ($.inArray(data[i].code, temp) >= 0 ? "checked=\"checked\"" : "") + " /></li>");
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

// 功能描述：设备
function loadEquipment(obj) {
    $.dialog({
        className: "edit",
        title: "选择设备",
        method: "remote",
        ajax: { url: "/home/getequipment", type: "POST", data: { type: "01" }, page: { pageIndex: 1, pageSize: 12 } },
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
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "</li>");
            }
            var result = [];
            result.push("<dl>");
            result.push("<dt><input type=\"text\" placeholder=\"请输入设备名称\" /></dt>");
            result.push("<dd><button type=\"button\">搜索</button></dd>");
            result.push("</dl>");
            result.push("<div id=\"wrapper\" style=\"max-height:240px;\"><div class=\"scroller\"><ul>" + html.join("") + "</ul></div></div><div class=\"ui-dialog-more\">查看更多...<i class=\"iconfont icon-unfold\"></i></div>");
            return result.join("");
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
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "</li>");
            }
            var bd = $("#" + dialog.id + " .ui-dialog-bd");
            var ul = bd.find("ul");
            ul.append(html.join(""));
            bd.scrollTop(ul.offset().height);
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
        }
    });
}

// 功能描述：故障
function loadFault(obj) {
    $.dialog({
        className: "edit",
        title: "选择故障类型",
        method: "remote",
        ajax: { url: "/home/getfault", type: "POST", data: { type: "01" }, page: { pageIndex: 1, pageSize: 12 } },
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
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "</li>");
            }            
            return "<div id=\"wrapper\" style=\"max-height:240px;\"><div class=\"scroller\"><ul>" + html.join("") + "</ul></div></div><div class=\"ui-dialog-more\">查看更多...<i class=\"iconfont icon-unfold\"></i></div>";
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
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "</li>");
            }
            var bd = $("#" + dialog.id + " .ui-dialog-bd");
            var ul = bd.find("ul");
            ul.append(html.join(""));
            bd.scrollTop(ul.offset().height);
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
        }
    });
}

// 功能描述：工作
function loadJob(obj) {
    $.dialog({
        className: "mutil",
        title: "岗位列表",
        method: "remote",
        ajax: { url: "/home/getjob", type: "POST", data: { type: "01" }, page: { pageIndex: 1, pageSize: 12 } },
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

// 功能描述：选择企业
function loadCompany(obj) {
    var code = "", name = "", address = "", cooperation = "";
    var mydialog = $.dialog({
        className: "search",
        title: "自建供应商",
        method: "remote",
        isScroll: false,
        ajax: { url: "/home/getcompany", data: { search: "" }, page: { pageIndex: 1, pageSize: 12 } },
        //data: [
        //    { code: "01", name: "宁波浩钛金属制品有限公司01", address: "浙江宁波振洲区望春工业园秋实路88号", cooperation: "0" },
        //    { code: "02", name: "宁波浩钛金属制品有限公司02", address: "浙江宁波振洲区望春工业园秋实路89号", cooperation: "1" },
        //    { code: "03", name: "宁波浩钛金属制品有限公司03", address: "浙江宁波振洲区望春工业园秋实路90号", cooperation: "1" }
        //],
        create: function (result) {
            if (!result || isNaN(result.code) || result.code == 6) {
                alert(result.message || "数据返回异常~");
                return;
            }
            var data = result.data || [];
            var html = [];
            html.push("<dl>");
            html.push("<dt>");
            //html.push("<div class=\"search-tab clearfix\">")
            //html.push("<div class=\"on\" data-type=\"1\" >我的供应商</div>");
            //html.push("<div data-type=\"2\" >所有企业</div>");
            //html.push("</div>")
            html.push("<div class=\"search\"><div><input type=\"text\" placeholder=\"请输入供应商名称\" /></div><i class=\"iconfont icon-search\"></i></div>")
            html.push("</dt>");
            html.push("<dd class=\"search-tab-bd\">");
            html.push("<div id=\"wrapper\" style=\"max-height:240px;\"><div class=\"scroller\">");
            html.push("<ul>");
            for (var i = 0; i < data.length; i++) {
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" data-address=\"" + escape(data[i].address || "") + "\" data-cooperation=\"" + escape(data[i].cooperation || "0") + "\" >" + (data[i].name || "") + "<s>" + (data[i].address || "") + "</s><u>" + (data[i].cooperation == "1" ? "已合作" : "未合作") + "</u></li>");
            }
            html.push("</ul>");
            html.push("</div></div>");
            html.push("</dd>");
            html.push("</dl>");
            return html.join("");
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
            for (var i = 0; i < data.length; i++) {
                html.push("<li data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" data-address=\"" + escape(data[i].address || "") + "\" data-cooperation=\"" + escape(data[i].cooperation || "0") + "\" >" + (data[i].name || "") + "<s>" + (data[i].address || "") + "</s><u>" + (data[i].cooperation == "1" ? "已合作" : "未合作") + "</u></li>");
            }
            var ul = $("#" + dialog.id + " .ui-dialog-bd .search-tab-bd ul");
            ul.append(html.join(""));
        },
        event: function (dialog) {
            $("#" + dialog.id + " .ui-dialog-bd").on("click", "li", function () {
                name = unescape($(this).data("name") || "");
                code = unescape($(this).data("code") || "");
                address = unescape($(this).data("address") || "");
                cooperation = unescape($(this).data("cooperation") || "");

                obj.data("code", code);
                obj.data("name", name);
                obj.data("address", address);
                obj.data("cooperation", cooperation);
                obj.html(name);
                dialog.destory();
            });

            //$("#" + dialog.id + " .ui-dialog-bd .search-tab div").click(function () {
            //    if ($(this).hasClass("on")) return;

            //    $(this).siblings().removeClass("on");
            //    $(this).addClass("on");

            //    var type = $(this).data("type") || "";
            //    if (type == "") return;

            //    var ul = $("#" + dialog.id + " .ui-dialog-bd .search-tab-bd ul");
            //    ul.html("");
            //    mydialog.option.ajax.data.type = type;
            //    mydialog.option.ajax.page.pageIndex = 1;
            //    mydialog.option.ajax.data.search = "";
            //    mydialog.loadmore(mydialog.option, $.loading({ message: "正在加载中..." }));
            //});

            $("#" + dialog.id + " .ui-dialog-bd .search > .iconfont").click(function () {
                var type = $("#" + dialog.id + " .ui-dialog-bd .search-tab div.on").data("type") || "";
                if (type == "") return;

                var search = $("#" + dialog.id + " .ui-dialog-bd .search input[type=text]").val() || "";
                if (search == "") return;

                $("#" + dialog.id + " .ui-dialog-bd ul").html("");

                mydialog.option.ajax.data.type = type;
                mydialog.option.ajax.data.search = search;
                mydialog.option.ajax.page.pageIndex = 1;
                mydialog.loadmore(mydialog.option, $.loading({ message: "正在加载中..." }));
            });
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
                                img.parent().html("");

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
                var appendAccount = obj.data("append_account") || "";
                loadPerson(obj, appendAccount);
                break;
            case "emp"://员工列表
                option = {
                    title: "员工列表",
                    method: "local",
                    data: [{ code: "01", name: "员工1" }, { code: "02", name: "员工2" }, { code: "03", name: "员工3" }, { code: "04", name: "员工4" }, { code: "05", name: "员工5" }, { code: "06", name: "员工6" }]
                }
                $.dialog_common(obj, option);
                break;
            case "line": //生产线
                option = {
                    title: "选择生产线",
                    method: "remote",
                    ajax: { url: "/home/getline", type: "POST", data: { type: "line" }, page: { pageindex: 1, pagesize: 12 } }
                }
                $.dialog_common(obj, option);
                break;
            case "station": //工位
                option = {
                    title: "选择工位",
                    data: [{ code: "01", name: "工位1" }, { code: "02", name: "工位2" }, { code: "03", name: "工位3" }, { code: "04", name: "工位4" }, { code: "05", name: "工位5" }]
                }
                $.dialog_common(obj, option);
                break;
            case "shift": //班次
                var me = $(this);
                option = {
                    title: "选择班次",
                    method: "remote",
                    ajax: { url: "/home/getgroup", type: "POST", data: { type: "group" }, page: { pageindex: 1, pagesize: 12 } }
                }
                $.dialog_common(obj, option);
                break;
            case "group": //班组
                option = {
                    title: "选择班组",
                    method: "remote",
                    ajax: { url: "/home/getgroup2", type: "POST", data: { type: "group" }, page: { pageindex: 1, pagesize: 12 } }
                }
                $.dialog_common(obj, option);
                break;
            case "cycle": //周期
                option = {
                    title: "选择周期",
                    method: "local",
                    data: [{ code: "01", name: "每班" }, { code: "02", name: "每天" }, { code: "03", name: "每7天" }, { code: "04", name: "每30天" }, { code: "05", name: "每90天" }, { code: "06", name: "每180天" }]
                }
                $.dialog_common(obj, option);
                break;
            case "remind": //提醒
                option = {
                    title: "选择提醒",
                    method: "local",
                    data: [{ code: "01", name: "永不" }, { code: "02", name: "20分钟前" }, { code: "03", name: "1小时前" }]
                }
                $.dialog_common(obj, option);
                break;
            case "equipment": //设备
                loadEquipment(obj);
                break;
            case "fault": //故障
                loadFault(obj);
                break;
            case "job": //岗位
                loadJob(obj);
                break;
            case "company": //岗位
                loadCompany(obj);
                break;
        }
    });

    $(".ui-select-employee").click(function () {
        var obj = $(this).parent().parent().find(".ui-employee");
        var appendAccount = obj.data("append_account") || "";
        loadPerson(obj, appendAccount);
    });
})