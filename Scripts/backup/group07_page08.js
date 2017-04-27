// 功能描述：行业
function loadIndustry(obj) {
    var code = "", name = "";
    $.dialog({
        className: "edit",
        title: "选择行业",
        method: "local",
        data: [{ code: "01", name: "行业1" }, { code: "02", name: "行业2" }, { code: "03", name: "行业3" }],
        create: function (data) {
            var html = [];
            html.push("<dl>");
            html.push("<dt><input type=\"text\" placeholder=\"请输入行业名称\" /></dt>");
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

// 功能描述：合作过
function loadCooper(obj) {
    var code = "", name = "";
    $.dialog({
        className: "currency",
        title: "是否合作过",
        method: "local",
        data: [{ code: "01", name: "不限" }, { code: "02", name: "已合作" }, { code: "03", name: "未合作" }],
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

$(function () {
    $(".ui-focus").click(function () {
        var type = $(this).data("type") || "";
        if (type == "") return;

        var obj = $(this).find("span");
        switch (type) {
            case "industry": //行业
                loadIndustry(obj);
                break;
            case "cooper": //合作过
                loadCooper(obj);
                break;
            case "province": //所在省份
                option = {
                    title: "选择所在省份",
                    data: city.data
                }
                $.dialog_common(obj, option);
                break;
            case "city": //所在城市
                var code = $("#province").data("code") || "";
                if (code == "") {
                    $.poptips({ message: "请先选择所在省份~" });
                    return;
                }
                var data = city.get(code);
                if (!$.isArray(data) || data.length == 0) {
                    $.poptips({ message: "请先选择所在省份~" });
                    return;
                }
                option = {
                    title: "选择所在城市",
                    data: data
                }
                $.dialog_common(obj, option);
                break;

        }
    })
})