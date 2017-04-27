/*
dialog 参数
method: ["remote", "local"] // 数据获取方式：可选项（远程、本地、无）
ajax: // 同ajax参数
   type:
   url:
   data:
create: //创建回调函数
event: //事件绑定回调函数
*/
(function ($) {
    var dialog = function (option) {
        var defaults = {
            title: '温馨提示',
            content: '这是消息正文'
        }
        if (option.button) {
            option.isScroll = false;
        }
        this.option = $.extend({}, defaults, option)
        this.init(this.option);
    }
    dialog.prototype = {
        id: null,
        option: null,
        scroll: null,
        isScroll: true,
        handler: function (e) {
            e.preventDefault();
        },

        // 功能描述：初始化
        init: function (option) {
            this.load(option);
        },

        // 功能描述：加载
        load: function (option) {
            this.isScroll = option.isScroll === false ? false : true;            
            var method = option.method || "";
            var me = this;
            switch (option.method) {
                case "remote":
                    if (option.ajax && option.ajax.page) {
                        option.ajax.data = option.ajax.data || {};
                        option.ajax.data.pageIndex = option.ajax.page.pageIndex || 1;
                        option.ajax.data.pageSize = option.ajax.page.pageSize || 12;
                        option.loadmoreauto = option.loadmoreauto || "auto";
                    }
                    $.ajax({
                        type: option.ajax.type || "POST",
                        url: option.ajax.url || "",
                        data: option.ajax.data || {},
                        dataType: option.ajax.dataType || "json",
                        success: function (result) {
                            if ($.isFunction(option.create)) {
                                option.content = option.create(result);
                                me.create(option, result);
                            } else {
                                if (isNaN(result.code) || result.code != 0) {
                                    alert("dialog 数据返回错误：" + (result ? (result.message || "") : ""));
                                    return;
                                }
                                option.content = result.data;
                                me.create(option);
                            }
                        },
                        error: function (e) {
                            alert("dialog 数据返回错误：" + (e ? (e.message || "") : ""));
                        }
                    });
                    break;
                case "local":
                    if ($.isFunction(option.create)) {
                        option.content = option.create(option.data);
                        me.create(option);
                    } else {
                        option.content = option.data;
                        me.create(option);
                    }
                    break;
                default:
                    option.content = "<div class=\"ui-dialog-content\">" + option.content + "</div>" + this.button(option.button);
                    me.create(option);
                    break;
            }
        },

        // 功能描述：加载更多
        loadmore: function (option, loading) {
            var me = this;
            option.ajax.data = option.ajax.data || {};
            option.ajax.data.pageIndex = option.ajax.page.pageIndex || 1;
            option.ajax.data.pageSize = option.ajax.page.pageSize || 12;

            $.ajax({
                type: option.ajax.type || "POST",
                url: option.ajax.url || "",
                data: option.ajax.data || null,
                dataType: option.ajax.dataType || "json",
                success: function (result) {
                    if ($.isFunction(option.loadmore)) {
                        option.loadmore(me, result);
                        setTimeout(function () {
                            me.scroll && me.scroll.refresh();
                        }, 300);                        
                    }
                    loading.destory();
                },
                error: function () {
                    alert("dialog 远程调用失败~");
                }
            });
        },
        
        // 功能描述：按钮
        button: function (button) {
            if (!$.isArray(button)) return "";

            var html = [];
            for (var i = 0; i < button.length; i++) {
                html.push("<li class=\"ui-dialog-button-status-" + i + "\" data-code=\"" + i + "\" data-name=\"" + escape(button[i]) + "\" >" + button[i] + "</li>");
            }
            return "<div class=\"ui-dialog-button\"><ul>" + html.join("") + "</ul></div>";
        },

        // 功能描述：创建
        create: function (option, result) {
            this.id = "dialog" + new Date().getTime();
            var className = option.className || "";
            className = className == "" ? "ui-dialog-extend-default" : "ui-dialog-extend-" + className;

            var isHasScroll = /id\=\"wrapper\"/.test(option.content);
            var html = [];
            html.push("<div class=\"ui-dialog " + className + "\" id=\"" + this.id + "\" >");
            html.push("    <div class=\"ui-dialog-mask\"></div>");
            html.push("    <div class=\"ui-dialog-box\">");
            html.push("        <div class=\"ui-dialog-hd\">");
            html.push("            <em>" + option.title + "</em>");
            html.push("            <i class=\"iconfont icon-close ui-dialog-close\"></i>");
            html.push("        </div>");
            if (isHasScroll || !this.isScroll) {
                html.push("        <div class=\"ui-dialog-bd\" " + (isNaN(option.maxHeight) ? "" : "style=\"max-height:" + option.maxHeight + "px;\"") + " >");
                html.push(option.content);
                html.push("        </div>");
            } else {
                html.push("        <div class=\"ui-dialog-bd\" " + (isNaN(option.maxHeight) ? "" : "style=\"max-height:" + option.maxHeight + "px;\"") + " id=\"wrapper\">");
                html.push("        <div class=\"scroller\">");
                html.push(option.content);
                html.push("        </div>");
                html.push("        </div>");
            }
            if (option.ajax && option.ajax.page && option.loadmoreauto == "auto" && result && result.data && result.data.length > 0) {
                html.push("<div class=\"ui-dialog-more\">查看更多...<i class=\"iconfont icon-unfold\"></i></div>");
            }
            html.push("    </div>");
            html.push("</div>");
            $(document.body).append(html.join(""));

            $("#" + this.id).addClass("ui-dialog-active");
            
            this.event(option);
        },

        // 功能描述：事件绑定
        event: function (option) {
            var me = this;

            $("#" + this.id + " .ui-dialog-close").click(function () {
                me.destory(option);
            });

            $("#" + this.id + " .ui-dialog-mask").click(function () {
                me.destory(option);
            });
                        
            $("#" + this.id + " .ui-dialog-mask").bind("touchmove", function (e) {
                e = e || window.event;
                me.stopEventBubble(e);
                me.preventDetault(e);
                return false;
            });
            
            $("#" + this.id + " .ui-dialog-hd").bind("touchmove", function (e) {
                e = e || window.event;
                me.stopEventBubble(e);
                me.preventDetault(e);
                return false;
            });

            $("#" + this.id + " .ui-dialog-more").bind("touchmove", function (e) {
                e = e || window.event;
                me.stopEventBubble(e);
                me.preventDetault(e);
                return false;
            });

            // 支持滚动
            if ($("#wrapper").length > 0) {
                this.scroll = new iScroll('wrapper');
            }
            
            if (option.ajax && option.ajax.page) {
                $("#" + this.id + " .ui-dialog-more").click(function () {
                    if ($(this).hasClass("ui-disabled")) return;
                    me.option.ajax.page.pageIndex = isNaN(me.option.ajax.page.pageIndex) ? 1 : Number(me.option.ajax.page.pageIndex) + 1;
                    me.loadmore(me.option, $.loading({ message: "正在加载中..." }));
                });
            }

            if ($.isFunction(option.event)) {
                option.event(this);
            }
        },

        // 功能描述：销毁对象
        destory: function () {
            if ($.isFunction(this.option.destory)) {
                this.option.destory(this);
            }
            $("#" + this.id).remove();
        },

        // 功能描述：阻止事件冒泡
        stopEventBubble: function (e) {
            if (e && e.stopPropagation) {
                e.stopPropagation()
            } else {
                e.cancelBubble = true;
            }
        },
        // 功能描述：阻止默认行文
        preventDetault: function (e) {
            if (e && e.preventDefault) {
                e.preventDefault()
            } else {
                window.event.returnValue = false;
            }
            return false;
        }
    }
    $.dialog = function (option) {
        return new dialog(option);
    };
    $.dialog_common = function (obj, option) {
        var code = "", name = "";
        return $.dialog({
            className: option.className || "common",
            title: option.title || "请选择",
            method: option.method || "local",
            ajax: option.ajax || {},
            data: option.data,
            maxHeight: option.maxHeight,
            create: function (result) {
                var data = result;
                if (option.ajax) {
                    if (!result || isNaN(result.code) || result.code == 6) {
                        alert(result.message || "数据返回异常~");
                        return;
                    }
                    data = result.data || [];
                }
                var html = [];
                var name ="";
                for (var i = 0; i < data.length; i++) {
                    name = data[i].name || "";
                    if(option.link && data[i].url){
                        name = "<a href=\"" + data[i].url + "\">" + name + "</a>";
                    }
                    html.push("<li class=\"ui-focus\" data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + name + "</li>");
                }

                var rtn = "<ul>" + html.join("") + "</ul>";
                if (option.remarks) {
                    rtn = "<div class=\"ui-dialog-remarks\">" + option.remarks + "</div>" + rtn;
                }
                return "<div id=\"wrapper\" style=\"max-height:" + (isNaN(option.maxHeight) ? 240 : option.maxHeight) + "px;\"><div class=\"scroller\">" + rtn + "</div></div>";
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
                    html.push("<li class=\"ui-focus\" data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" >" + (data[i].name || "") + "</li>");
                }
                var bd = $("#" + dialog.id + " .ui-dialog-bd");
                var ul = bd.find("ul");
                ul.append(html.join(""));
            },
            event: function (dialog) {
                $("#" + this.id + " .ui-dialog-close").click(function () {
                    if ($.isFunction(option.destory)) {
                        option.destory(dialog);
                    }
                });

                $("#" + this.id + " .ui-dialog-mask").click(function () {
                    if ($.isFunction(option.destory)) {
                        option.destory(dialog);
                    }
                });

                $("#" + dialog.id + " .ui-dialog-bd").on("click", "li", function () {
                    name = unescape($(this).data("name") || "");
                    code = unescape($(this).data("code") || "");

                    if ($.isFunction(option.callback)) {
                        option.callback({ code: code, name: name }, dialog);
                    } else if (obj) {
                        obj.data("code", code);
                        obj.data("name", name);
                        obj.html(name);
                        dialog.destory();
                    } else {
                        dialog.destory();
                    }
                });
            },
            destory: $.isFunction(option.destory) ? option.destory : null
        });
    }
    // 功能描述：filter控件
    var filter = function (option) {
        if (!option || !option.container || !option.data) return;
        this.init(option);
    }
    filter.prototype = {
        id: null,

        // 功能描述：初始化
        init: function (option) {
            this.load(option);
            this.event(option);
        },

        // 功能描述：加载
        load: function (option) {
            var html = [];
            var current = "";
            var data = option.data || [];
            this.id = "filter" + new Date().getTime();

            html.push("<div class=\"ui-filter\" id=\"" + this.id + "\" >");
            html.push("    <div class=\"ui-filter-mask ui-hidden\"></div>");
            html.push("    <div class=\"ui-filter-hd\">");
            html.push("        <ul>");
            for (var i = 0; i < data.length; i++) {
                current = data[i].current === true ? " class=\"on\" " : "";
                html.push("<li " + current + " data-type-code=\"" + escape(data[i].type ? (data[i].type.code || "") : "") + "\" data-type-name=\"" + escape(data[i].type ? (data[i].type.name || "") : "") + "\" data-code=\"" + escape(data[i].code || "") + "\" data-name=\"" + escape(data[i].name || "") + "\" ><span>" + (data[i].name || "") + "</span>");
                //if (data[i].data && data[i].data.length > 0) {
                    html.push("<i class=\"iconfont icon-unfold\"></i>");
                //}
                html.push("</li>");
            }
            html.push("        </ul>");
            html.push("    </div>");
            html.push("    <div class=\"ui-filter-bd\">");
            for (var i = 0; i < data.length; i++) {
                if (!data[i].data || data[i].data.length == 0) continue;

                html.push("        <ul class=\"ui-filter-bd-item" + i + "\" data-index=\"" + i + "\" >");
                for (var j = 0; j < data[i].data.length; j++) {
                    html.push("            <li class=\"" + (data[i].data[j].code == data[i].code ? "cur" : "") + "\" data-code=\"" + escape(data[i].data[j].code) + "\" data-name=\"" + escape(data[i].data[j].name || "") + "\" >" + (data[i].data[j].name || "") + "</li>");
                }
                html.push("        </ul>");
            }
            html.push("    </div>");
            html.push("</div>");
            option.container.append(html.join(""));
        },

        // 功能描述：重置
        reset: function (data) {
            var me = this;
            $("#" + this.id + " .ui-filter-hd li").each(function () {
                var type = $(this).data("type-code") || "";
                if (type == data.type) {
                    $(this).data("code", data.code);
                    $(this).data("name", escape(data.name));
                    if ($(this).find("s").length > 0) {
                        var s = $(this).find("s").html() || "";
                        $(this).find("span").html(data.name + "<s>" + s + "</s>");
                    } else {
                        $(this).find("span").html(data.name);
                    }

                    var sub = $("#" + me.id + " .ui-filter-bd .ui-filter-bd-item" + $(this).index());
                    sub.find("li").each(function () {
                        var code = $(this).data("code") || "";
                        if (code == "") return;

                        if (code = data.code) {
                            $(this).addClass("cur").siblings().removeClass("cur");
                        }
                    });

                    return false;
                }
            });
        },

        // 功能描述：事件绑定
        event: function (option) {
            var me = this;
            var hd = $("#" + this.id + " .ui-filter-hd li");
            var bd = $("#" + this.id + " .ui-filter-bd ul");
            var mask = $("#" + this.id + " .ui-filter-mask");
            hd.click(function () {
                if (option.use_dialog === true) {
                    me.dialog($(this), option, hd, me);
                } else {
                    //if ($(this).hasClass("on")) {
                        hd.removeClass("on");
                        bd.removeClass("on");
                        mask.addClass("ui-hidden");
                    //} else {
                        hd.removeClass("on");
                        $(this).addClass("on");
                        bd.removeClass("on");                        
                        var sub = $("#" + me.id + " .ui-filter-bd .ui-filter-bd-item" + $(this).index());
                        if (sub.length > 0) {
                            sub.addClass("on");
                            mask.removeClass("ui-hidden");
                        } else {
                            mask.addClass("ui-hidden");
                            if ($.isFunction(option.callback)) {
                                option.callback(me.getFilterData(), me);
                            }
                        }
                    //}
                }
            });

            $("#" + this.id + " .ui-filter-bd ul li").click(function () {
                $(this).addClass("cur").siblings().removeClass("cur");
                var code = $(this).data("code") || "";
                var name = unescape($(this).data("name") || "");

                var obj = hd.eq($(this).parent().data("index"));
                obj.data("code", code);
                obj.data("name", escape(name));

                obj.find("span").html(name);

                if (!(option.use_dialog === true)) {
                    //hd.removeClass("on");
                    bd.removeClass("on");
                    mask.addClass("ui-hidden");
                }

                if ($.isFunction(option.callback)) {
                    option.callback(me.getFilterData(), me);
                }
            });

            mask.click(function () {
                hd.removeClass("on");
                bd.removeClass("on");
                mask.addClass("ui-hidden");
            })
        },

        // 功能描述：获取过滤参数
        getFilterData: function () {
            var data = {};
            data.datasource = [];
            $("#" + this.id + " .ui-filter-hd li").each(function () {
                var temp = {};
                temp.code = $(this).data("code") || "";
                temp.name = $(this).data("name") || "";
                temp.type_code = $(this).data("type-code") || "";
                temp.type_name = $(this).data("type-name") || "";
                if (temp.code == "" || temp.type_code == "") return;

                if ($(this).hasClass("on")) {
                    data["_current"] = {};
                    data["_current"][temp.type_code] = temp.code;
                    data.obj = $(this);
                }
                data[temp.type_code] = temp.code;
                data.datasource.push(temp);
            });

            return data;
        },

        // 功能描述：获取选项数据
        getOptionData: function (code, data) {
            if (!code || !data) return;
            for(var i=0;i<data.length;i++){
                if(!data[i].type) continue;
                if (data[i].type.code == code) {
                    return data[i].data;
                }
            }
        },

        // 功能描述：对话框
        dialog: function (obj, option, hd, me) {
            if (!obj || obj.length == 0) return;

            var code = unescape(obj.data("type-code") || "");
            var name = unescape(obj.data("type-name") || "");
            var data = this.getOptionData(code, option.data);

            $.dialog_common(obj, {
                title: "选择" + name,
                data: data || [],
                callback: function (result, dialog) {
                    if (!result) return;

                    obj.data("code", result.code);
                    obj.data("name", result.name);

                    var span = obj.find("span");
                    span.html(result.name);

                    dialog.destory();
                    
                    hd.removeClass("on");
                    if ($.isFunction(option.callback)) {
                        option.callback(me.getFilterData());
                    }
                }
            });
        }
    }
    $.filter = function (option) {
        new filter(option);
    };

    var page = function (option) {
        if (!option || !option.url) return;
        option.pageIndex = option.pageIndex || 1;
        option.pageSize = option.pageSize || 12;
        this.init(option);
    }
    page.prototype = {
        // 功能描述：初始化
        init: function (option) {
            this.load(option, this.event);
        },

        // 功能描述：加载
        load: function (option, callback) {
            var loading = $.loading();
            var data = option.data || {};
            var me = this;
            $.ajax({
                url: option.url,
                data: data,
                type: "POST",
                dataType: "json",
                success: function (result) {
                    if (result && !isNaN(result.code) && result.code == 6) {
                        $(".ui-page-more").html("没有更多内容了...")
                        $(".ui-page-more").addClass("disabled");
                    }
                    if ($.isFunction(option.create)) {
                        option.create(result);
                    }
                    if ($.isFunction(callback)) {
                        callback(option, me);
                    }
                    setTimeout(function () {
                        loading.destory();
                        $(".ui-page-more").removeClass("ui-hidden");
                    }, 1000);
                }
            });
        },

        // 功能描述：事件绑定
        event: function (option, me) {
            option.container.append("<div class=\"ui-page-more ui-hidden\">加载更多...<i class=\"iconfont icon-unfold\"></i></div>");

            $(".ui-page-more").click(function () {
                if ($(this).hasClass("disabled")) return;

                option.data = option.data || {};
                option.data.pageIndex = isNaN(option.data.pageIndex) ? 1 : Number(option.data.pageIndex) + 1;
                me.load(option, me);
            })
        }
    }
    $.page = function (option) {
        new page(option);
    }

    var pie = function (option) {
        if (!option) return;
        this.type = null;
        this.id = null;
        this.total = 0;
        this.container = null;
        this.data = [];
        this.title = "";
        this.init(option);
        this.render();
    };
    pie.prototype = {
        defaultBgcolor: ['#83d65a', '#c73737', '#a0d9f6', 'deeppink', 'mediumslateblue', 'chartreuse', 'goldenrod', "#ffff00", "#2F368F", "#F6A25D", "#2CA8E0", "#77D1F6", '#181818', '#45AB35', "#336699", "#5fD1F6"],

        // 功能描述：初始化
        init: function (options) {
            for (var p in options) {
                this[p] = options[p];
            }
            this.container = document.getElementById(this.id);
        },

        // 功能描述：百分比
        percentize: function () {
            if (this.type && this.type == '%') {
                var sum = 0;
                for (var i = 0; i < this.data.length; i++) {
                    sum += this.data[i][1];
                    if (this.data[i + 1] && (sum + this.data[i + 1][1]) > 100) {
                        break;
                    }
                }
                if (i != this.data.length) {
                    this.data = this.data.splice(0, i + 1);
                }
                if (sum != 100) {
                    this.data.push(['?', Math.ceil(100 - sum), '#282828']);
                }
            } else {
                var sum = 0;
                for (var i = 0; i < this.data.length; i++) {
                    sum += this.data[i][1];
                }
                if (0 == this.total) {
                    this.total = sum;
                }
                if (this.total - sum > 0) {
                    this.data.push(['?', this.total - sum, '#282828']);
                }
                for (var i = 0; i < this.data.length; i++) {
                    this.data[i][1] = Math.round((this.data[i][1] / this.total) * 100);
                }
            }
        },

        // 功能描述：渲染饼图
        renderPie: function () {
            var width = $(window).width() - 120;
            width = width > 500 ? 500 : width;
            var x = width / 2;
            var y = width / 2;
            var radius = x - 10;
            this.container.width = width;
            this.container.height = width;
            var ctx = this.container.getContext("2d");
            var startPoint = 0;
            for (var i = 0; i < this.data.length; i++) {
                if (null == this.data[i][2]) {
                    this.data[i][2] = this.defaultBgcolor[i % this.defaultBgcolor.length];
                }
                ctx.fillStyle = this.data[i][2];
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.arc(x, y, radius, startPoint, startPoint + Math.PI * 2 * (this.data[i][1] / 100), false);
                ctx.fill();
                startPoint += Math.PI * 2 * (this.data[i][1] / 100);
            }
            return true;
        },

        // 功能描述：渲染标题
        renderLabel: function () {
            var ul = ['<ul>'];
            for (var i = 0; i < this.data.length; i++) {
                ul.push('<li style="border-color:' + this.data[i][2] + '">' + this.data[i][0]);
                //if (this.type && this.type == '%') {
                //    ul.push(this.data[i][1] + "%");
                //} else {
                //    ul.push(Math.ceil(this.total * this.data[i][1] / 100));
                //}
                ul.push("</li>");
            }
            ul.push("</ul>");
            $(this.container).parent().append(ul.join(""));
            $(this.container).parent().append("<label>" + this.title + "</label>");;
        },
        
        // 功能描述：渲染
        render: function () {
            this.percentize();
            this.renderPie();
            this.renderLabel();
            return true;
        }
    }
    $.pie = function (option) {
        new pie(option);
    }

    var product = function (obj, option) {
        var ajax = {};
        ajax.url = "/home/getproduct_parts";
        ajax.data = {};
        ajax.data.type = "01";
        ajax.page = {};
        ajax.page.pageIndex = 1;
        ajax.page.pageSize = 12;
        option.ajax = ajax;
        this.init(obj, option);
    }
    product.prototype = {
        // 功能描述：初始化
        init: function (obj, option) {
            this.load(obj, option);
        },

        // 功能描述：加载
        load: function (obj, option) {
            var me = this;
            var code = "", name = "";
            $.dialog({
                className: "product",
                title: option.title || "选择产品或零件",
                method: "remote",
                ajax: option.ajax || {},
                data: option.data || [],

                // 功能描述：创建
                create: function (result) {                    
                    var html = [];
                    html.push("<div class=\"ui-dialog-product-hd\">");
                    if (option.type == "") {
                        html.push("    <ul>");
                        html.push("        <li class=\"on\" data-type=\"01\" >现有产品</li>");                    
                        html.push("        <li data-type=\"02\" >现有零件</li>");
                        html.push("    </ul>");
                    }
                    html.push("    <div class=\"search\">");
                    html.push("        <div><input type=\"text\" placeholder=\"请输入产品名称或编号\" /></div><i class=\"iconfont icon-search\"></i>");
                    html.push("    </div>");
                    html.push("</div>");
                    html.push("<div class=\"ui-dialog-product-bd\">");
                    html.push("    <div class=\"ui-dialog-product-filter\">");
                    html.push("    </div>");
                    html.push("    <div class=\"ui-dialog-product-list\" id=\"wrapper\">");
                    html.push("        <div class=\"scroller\">");
                    html.push("            <div class=\"ui-dialog-product-list-inner\">");
                    html.push(me.create(result.data));
                    html.push("            </div>");
                    html.push("        </div>");
                    html.push("    </div>");
                    html.push("</div>");
                    return html.join("");
                },

                // 功能描述：加载更多
                loadmore: function (dialog, result) {
                    if (!result) {
                        alert(result.message || "数据返回异常~");
                        return;
                    }
                    var data = result.data || [];
                    if (isNaN(result.code) || result.code == 6 || !$.isArray(data) || data.length == 0) {
                        $("#" + dialog.id + " .ui-dialog-more").addClass("ui-disabled");
                        $("#" + dialog.id + " .ui-dialog-more").html("没有更多内容了...");
                    } else {
                        $("#" + dialog.id + " .ui-dialog-more").removeClass("ui-disabled");
                    }

                    var html = me.create(data);
                    var list = $("#" + dialog.id + " .ui-dialog-product-list-inner");
                    list.append(html);
                    list.parent().scrollTop(list.offset().height);
                },

                // 功能描述：事件绑定
                event: function (dialog) {
                    var list = $("#" + dialog.id + " .ui-dialog-product-list-inner");
                    var input = $("#" + dialog.id + " .ui-dialog-product-hd div.search input");

                    // 设置过滤
                    me.filter(dialog);

                    // 选择产品、零件
                    if (option.type == "") {
                        $("#" + dialog.id + " .ui-dialog-product-hd li").click(function () {
                            if ($(this).hasClass("on")) return;

                            $(this).siblings().removeClass("on");
                            $(this).addClass("on");

                            var type = $(this).data("type") || "";

                            dialog.option.ajax.data.type = type;
                            dialog.option.ajax.page.pageIndex = 1;
                            $("#" + dialog.id + " .ui-dialog-more").removeClass("ui-disabled");
                            $("#" + dialog.id + " .ui-dialog-more").html("查看更多...<i class=\"iconfont icon-unfold\"></i>");
                            me.build({
                                list: list, loading: $.loading(), ajax: dialog.option.ajax, callback: function () {
                                    setTimeout(function () {
                                        dialog.scroll && dialog.scroll.refresh();
                                    }, 300);
                                }
                            });
                        });
                    }

                    // 列表
                    $("#" + dialog.id + " .ui-dialog-product-list").on("click", ".ui-dialog-product-item", function () {
                        name = unescape($(this).data("name") || "");
                        code = unescape($(this).data("code") || "");

                        if (obj) {
                            obj.data("code", code);
                            obj.data("name", name);
                            obj.html(name);
                        }
                        if ($.isFunction(option.callback_select)) {
                            option.callback_select({ code: code, name: name });
                        }
                        dialog.destory();
                    });

                    $("#" + dialog.id + " .ui-dialog-product-hd div.search .iconfont").click(function () {
                        var keyword = input.val() || "";
                        if (keyword == "") return;

                        var type = option.type == "" ? ($("#" + dialog.id + " .ui-dialog-product-hd li.on").data("type") || "") : option.type;
                        dialog.option.ajax.data.type = type;
                        dialog.option.ajax.page.pageIndex = 1;
                        dialog.option.ajax.page.keyword = keyword;
                        $("#" + dialog.id + " .ui-dialog-more").removeClass("ui-disabled");
                        $("#" + dialog.id + " .ui-dialog-more").html("查看更多...<i class=\"iconfont icon-unfold\"></i>");
                        me.build({
                            list: list, loading: $.loading(), ajax: dialog.option.ajax, callback: function () {
                                setTimeout(function () {
                                    dialog.scroll && dialog.scroll.refresh();
                                }, 300);
                            }
                        });
                    });

                    if (option.loading) {
                        setTimeout(function () {
                            option.loading.destory();
                        }, 1200);
                    }
                }
            });
        },

        // 功能描述：过滤条件
        filter: function (dialog) {
            var list = $("#" + dialog.id + " .ui-dialog-product-list-inner");
            var input = $("#" + dialog.id + " .ui-dialog-product-hd div.search input");
            var me = this;

            $.filter({
                container: $("#" + dialog.id + " .ui-dialog-product-filter"),
                use_dialog: true,
                callback: function (result) {
                    delete result.datasource;

                    var type = $("#" + dialog.id + " .ui-dialog-product-hd li.on").data("type") || "";
                    var keyword = input.val() || "";

                    dialog.option.ajax.data.type = type;
                    dialog.option.ajax.page.pageIndex = 1;
                    dialog.option.ajax.page.keyword = keyword;
                    dialog.option.ajax.data.filter = result;
                    $("#" + dialog.id + " .ui-dialog-more").removeClass("ui-disabled");
                    $("#" + dialog.id + " .ui-dialog-more").html("查看更多...<i class=\"iconfont icon-unfold\"></i>");
                    me.build({ list: list, loading: $.loading(), ajax: dialog.option.ajax });
                },
                data: [
                    {
                        type: { code: "type", name: "类型" },
                        code: "01",
                        name: "类型不限",
                        data: [
                            { code: "01", name: "不限", chn: "类型不限" },
                            { code: "02", name: "自产", chn: "自产" },
                            { code: "03", name: "委托加工", chn: "委托加工" },
                            { code: "04", name: "来料加工", chn: "来料加工" },
                            { code: "05", name: "外购", chn: "外购" }
                        ]
                    },
                    {
                        type: { code: "time", name: "时间" },
                        code: "02",
                        name: "时间不限",
                        data: [
                            { code: "01", name: "不限", chn: "时间不限" },
                            { code: "02", name: "近3天", chn: "近3天" },
                            { code: "03", name: "近1周", chn: "近1周" },
                            { code: "04", name: "近1月", chn: "近1月" },
                            { code: "05", name: "1个月以上", chn: "1个月以上" }
                        ]
                    },
                    {
                        type: { code: "status", name: "状态" },
                        code: "03",
                        name: "状态不限",
                        data: [
                            { code: "01", name: "不限", chn: "状态不限" },
                            { code: "02", name: "正常", chn: "正常" },
                            { code: "03", name: "冻结", chn: "冻结" }
                        ]
                    },
                ]
            });
        },

        // 功能描述：创建
        create: function (data) {
            if (!data || isNaN(data.length) || data.length == 0) return "";

            var html = [];
            for (var i = 0; i < data.length; i++) {
                html.push("        <div class=\"ui-dialog-product-item\" data-code=\"" + escape(data[i].code || "") + "\"  data-name=\"" + escape(data[i].name || "") + "\">");
                html.push("            <ul>");
                html.push("                <li><em>" + (data[i].name || "") + "</em></li>");
                html.push("                <li>" + (data[i].type ? "" : (data[i].type.name || "")) + "</li>");
                html.push("                <li>" + (data[i].status ? "" : (data[i].status.name || "")) + "</li>");
                html.push("            </ul>");
                html.push("            <ul>");
                html.push("                <li>" + (data[i].code || "") + "</li>");
                html.push("                <li><a href=\"" + (data[i].url || "") + "\">查看详情</a></li>");
                html.push("                <li>" + (data[i].date || "") + "</li>");
                html.push("            </ul>");
                html.push("        </div>");
            }

            return html.join("");
        },

        // 功能描述：加载产品、零件数据
        build: function (option) {
            var list = option.list || null;
            var data = [];

            var me = this;
            option.ajax.data = option.ajax.data || {};
            option.ajax.data.pageIndex = option.ajax.page.pageIndex || 1;
            option.ajax.data.pageSize = option.ajax.page.pageSize || 12;

            $.ajax({
                type: option.ajax.type || "POST",
                url: option.ajax.url || "",
                data: option.ajax.data || {},
                dataType: option.ajax.dataType || "json",
                success: function (result) {
                    var html = me.create(result.data);
                    list.html(html);

                    if (option.loading) {
                        setTimeout(function () {
                            option.loading.destory();
                        }, 1200);
                    }
                    if ($.isFunction(option.callback)) {
                        option.callback();
                    }
                },
                error: function (e) {
                    alert("dialog 数据返回错误：" + (e ? (e.message || "") : ""));
                }
            });
        },
        
        // 功能描述：加载更多
        loadmore: function (option, loading) {
            var me = this;
            option.ajax.data = option.ajax.data || {};
            option.ajax.data.pageIndex = option.ajax.page.pageIndex || 1;
            option.ajax.data.pageSize = option.ajax.page.pageSize || 12;

            $.ajax({
                type: option.ajax.type || "POST",
                url: option.ajax.url || "",
                data: option.ajax.data || null,
                dataType: option.ajax.dataType || "json",
                success: function (result) {
                    if (!result) return;

                    var html = this.create(result.data);
                    list.append(html);
                    loading.destory();
                },
                error: function () {
                    alert("dialog 远程调用失败~");
                }
            });
        }
    }

    $.product = function (obj, option) {
        option = option || {};
        option.loading = $.loading();
        new product(obj, option);
    }

    // loading
    var loading = function (option) {
        option = option || {};
        this.init(option);
    }
    loading.prototype = {
        id: null,

        // 功能描述：初始化
        init: function (option) {
            this.load(option);
            this.event(option);
        },

        // 功能描述：加载
        load: function (option) {
            this.id = "loading" + new Date().getTime();
            var html = [];

            html.push("<div class=\"ui-loading\" id=\"" + this.id + "\" >");
            html.push("    <div class=\"ui-loading-mask\"></div>");
            html.push("    <div class=\"ui-loading-box\">");
            html.push("    <div class=\"ui-loading-box-inner\">");
            html.push("        <i></i>");
            html.push("        <p>" + (option.message || "正在处理中...") + "</p>");
            html.push("    </div>");
            html.push("    </div>");
            html.push("</div>");

            $(document.body).append(html.join(""));
        },

        // 功能描述：事件绑定
        event: function (option) {
            var me = this;

            // 是否自动关闭
            if (option.auto === true) {
                $("#" + this.id).click(function () {
                    me.destory();
                })
            }

            // 超时关闭(默认两分钟)
            if (!isNaN(option.timeout)) {
                setTimeout(function () {
                    me.destory();
                }, option.timeout);
            }
        },

        // 功能描述：销毁
        destory: function () {
            $("#" + this.id).remove();
        }
    }

    $.loading = function (option) {
       return new loading(option);
    }
    $.poptips = function (option) {
        $(".ui-poptips").remove();
        $(document.body).append("<div class=\"ui-poptips\"><i class=\"iconfont icon-information\"></i>" + (option.message || "") + "</div>");
    }
    var check = function (option) {
        if (option.check === true) {
            this.result = this.check(option.fvalue, option);
            return;
        }
        this.init(option);
    }
    check.prototype = {
        reg: {
            integer: "^[0-9]*$",
            email: "^\\w+[-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
        },

        // 功能描述：初始化
        init: function (option) {
            this.event(option);
        },

        // 功能描述：事件绑定
        event: function (option) {
            var me = this;
            option.obj.on("blur", function () {
                var fvalue = $(this).val() || "";
                if (fvalue == "") return;

                me.check(fvalue, option);
            });
        },
        
        // 功能描述：check
        check: function (fvalue, option) {
            if (this.reg[option.code]) {
                // 校验数据类型
                var reg = new RegExp(this.reg[option.code], "gi");
                if (!reg.test(fvalue)) {
                    this.message("字段“" + (option.chn || "") + "”" + option.message);
                    return false;
                }

                // 校验数据长度
                if (!isNaN(option.len) && option.len > 0) {
                    if (fvalue.length > option.len) {
                        this.message("字段“" + (option.chn || "") + "”输入长度超长");
                        return false;
                    }
                }
            }
            return true;
        },

        // 功能描述：提示消息
        message: function (message) {
            $.poptips({ message: message });
        }
    }
    $.check = function (option) {
        var result = new check(option).result;
        return result === false ? false : true;
    }
    $.checkall = function (all) {
        all = all === false ? false : true;
        var success = true;
        $("input[type=text],input[type=password]").each(function () {
            var check = $(this).data("check") || "";
            if (check == "") return;

            var option = {};
            try {
                var temp = check.split(/,\s?/);
                if (!$.isArray(temp) || temp.length == 0) return;

                var item = null;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i].indexOf(":") < 0) continue;

                    item = temp[i].split(/\s?:\s?/);
                    if (!$.isArray(item) || item.length == 0) continue;

                    option[item[0]] = item[1];
                }
            } catch (e) {
                return;
            }
            if (all === true) {
                option.check = true;
                option.fvalue = $(this).val() || "";

                // 必输项
                if (option.require == "true" && option.fvalue == "") {
                    $.poptips({ message: "字段“" + (option.chn || "") + "”不能为空" });
                    success = false;
                    return false;
                }

                // 类型和长度
                if (!$.check(option)) {
                    success = false;
                    return false;
                }
            } else {
                option.obj = $(this);
                $.check(option);
            }
        });

        return success;
    }
    $.qrcode = function (option) {
        if (!option || !option.obj) return;

        window.wave = function (name) {
            $.dialog({ title: "提示", content: name });
            if ($.isFunction(option.callback)) {
                option.callback(name);
            }
        }

        window.clickOnHtml = function () {
            var fileName = window.jsdemo.clickOnAndroid();
        }

        var obj = option.obj;
        obj.click(function () {
            confirm(option.message || "扫描二维码");
        });
    }
    $.camera = function (option) {
        if (!option || !option.obj) return;

        window.wave = function (name) {
            $.dialog({ title: "提示", content: name });
            var img = $(obj.parent().find(".ui-empty")[0]).find("img");
            if (img.length == 0) return;
            img.attr("src", name);
            img.parent().removeClass("ui-empty");
            if ($.isFunction(option.callback)) {
                option.callback(img, name);
            }
        }
        window.clickOnHtml = function () {
            var fileName = window.jsdemo.clickOnAndroid();
        }

        var obj = option.obj;
        obj.click(function () {
            confirm("选择图片?");
        });
    }
})(Zepto);

$(function () {
    $(".ui-product-select").click(function () {
        var option = {};
        option.type = $(this).data("type") || "";

        switch (option.type) {
            case "product":
                option.title = "选择产品";
                option.data = [
                    { code: "01", name: "产品名称1", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "02", name: "产品名称2", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "03", name: "产品名称3", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "04", name: "产品名称4", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "05", name: "产品名称5", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "06", name: "产品名称6", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "07", name: "产品名称7", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "08", name: "产品名称8", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "09", name: "产品名称9", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                ];
                break;
            case "parts":
                option.title = "选择零件";
                option.data = [
                    { code: "01", name: "零件名称1", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "02", name: "零件名称2", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "03", name: "零件名称3", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "04", name: "零件名称4", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "05", name: "零件名称5", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "06", name: "零件名称6", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "07", name: "零件名称7", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "08", name: "零件名称8", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "09", name: "零件名称9", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                ];
                break;
            default:
                option.title = "选择产品或零件";
                option.data = [
                    { code: "01", name: "产品名称1", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "02", name: "产品名称2", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "03", name: "产品名称3", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "04", name: "产品名称4", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "05", name: "产品名称5", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "06", name: "产品名称6", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "07", name: "产品名称7", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "08", name: "产品名称8", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                    { code: "09", name: "产品名称9", type: { code: "01", name: "类型" }, status: { code: "01", name: "状态" }, url: "http://www.baidu.com", date: "2015-05-10" },
                ];
                break;
        }
        var obj = $(this).find("span");
        $.product(obj, option);
    });

    $.checkall(false);

    $(".ui-protocol").click(function () {
        $.protocol();
    })

})

// 协议
$.protocol = function () {
    $.dialog({
        className: "protocol",
        title: "服务协议",
        method: "local",
        create: function () {
            var html = [];
            //html.push("<p>制造助手平台服务协议</p>");
            //html.push("<h3>【首部及导言】</p>");
            html.push("<p>欢迎你使用制造助手平台！</p>");
            html.push("<p>为使用制造助手平台服务（以下简称“本服务”），你应当阅读并遵守《制造助手平台服务协议》（以下简称“本协议”），以及《制造助手服务协议》、《制造助手软件许可及服务协议》、《制造助手平台服务协议》以及专项规则等。请你务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示你注意。</p>");
            html.push("<p>除非你已阅读并接受本协议所有条款，否则你无权使用制造助手平台服务。你对本服务的登录、查看、发布信息等行为即视为你已阅读并同意本协议的约束。</p>");
            html.push("<p>如果你未满18周岁，请在法定监护人的陪同下阅读本协议及其他上述协议，并特别注意未成年人使用条款。</p>");
            html.push("<h3>一、【协议的范围】</h3>");
            html.push("<p>1.1 本协议是你与制造助手之间关于你使用制造助手平台服务所订立的协议。“制造助手”是指上海千寸毫信息技术有限公司及其相关服务可能存在的运营关联单位。“用户”是指注册、登录、使用制造助手帐号的个人或组织，在本协议中更多地称为“你”。“其他用户”是指包括其他制造助手帐号用户和制造助手用户等除用户本人外与制造助手平台服务相关的用户。</p>");
            html.push("<p>1.2 本服务是制造助手向用户提供的信息发布、客户服务、企业管理以及与此相关的互联网技术服务。制造助手帐号分为订阅号、服务号和企业账号。制造助手用户关注订阅号或服务号后将成为该帐号关注用户，关注企业账号并成功进行身份验证后将成为企业账号关注用户。制造助手帐号可以通过制造助手平台为相关用户提供服务，包括群发信息、单发信息、用户消息处理等。</p>");
            html.push("<p>1.3 本协议被视为《制造助手服务协议》及《制造助手制造助手软件许可及服务协议》的补充协议，是其不可分割的组成部分，与其构成统一整体。本协议与上述内容存在冲突的，以本协议为准。本协议内容同时包括制造助手可能不断发布的关于本服务的相关协议、服务声明、业务规则及公告指引等内容（以下统称为“专项规则”）。上述内容一经正式发布，即为本协议不可分割的组成部分，你同样应当遵守。</p>");
            html.push("<h3>二、【帐号注册与认证】</h3>");
            html.push("<p>2.1 你在使用本服务前需要注册一个制造助手帐号。制造助手帐号通过手机号码进行绑定注册，请你使用未与制造助手帐号绑定的手机号码注册制造助手帐号。制造助手有权根据用户需求和产品需要对帐号注册和绑定的方式进行变更，关于你使用帐号的具体规则，请遵守相关帐号使用协议以及制造助手为此发布的专项规则。</p>");
            html.push("<p>2.2 用户在注册制造助手帐号时需要选择帐号类型，且选择后将无法更改。订阅号、服务号在注册完成后，系统将为你自动匹配制造助手号，你可以对制造助手号进行设置，但仅可设置一次，设置制造助手号后将无法修改。企业账号不配置制造助手号，在注册完成后，你可以通过系统后台生成二维码或名片推荐等方式，供制造助手用户关注。</p>");
            html.push("<p>2.3 用户符合一定条件后可以对制造助手帐号申请制造助手平台认证。认证审核包括帐号资质审核与帐号名称审核。完成所有审核流程后，由制造助手作出认证成功的判断。制造助手平台认证服务内容仅限于对用户提交的资料及信息进行甄别与核实，制造助手将对用户提交的资料和信息进行合理、谨慎的形式审查，但在制造助手的合法权限和合理能力范围内，制造助手无法实质审查用户的实际经营、运营以及推广等行为，并不为此提供任何担保。因用户行为导致与其他用户或第三方发生争议的，由用户独立对外承担责任，因此给制造助手、其他用户或第三方造成损害的，你应当依法予以赔偿。</p>");
            html.push("<p>为向用户提供更专业的服务，你同意授权制造助手可以委托第三方对你所提交的认证资料进行审核，并根据审核情况进行独立判断后确定认证结果。同时，为依法保护相关权利人的在先权利并规范平台运营，部分制造助手帐号需要认证才能注册和使用。关于制造助手平台认证的具体规则，请阅读并遵守《制造助手平台认证服务协议》。</p>");
            html.push("<p>2.4 用户应当如实填写和提交帐号注册与认证资料，并对资料的真实性、合法性、准确性和有效性承担责任。如用户提供服务或内容需要取得相关法律法规规定的许可或进行备案的，用户应当在帐号注册与认证时进行明确说明并提交相应的许可或备案证明。否则，制造助手有权拒绝或终止提供本服务，并依照本协议对违规帐号进行处罚。因此给制造助手或第三方造成损害的，你应当依法予以赔偿。</p>");
            html.push("<h3>三、【用户个人信息保护】</h3>");
            html.push("<p>3.1 保护用户个人信息是制造助手的一项基本原则，制造助手将会采取合理的措施保护用户的个人信息。除法律法规规定的情形外，未经用户许可制造助手不会向第三方公开、透露用户个人信息。制造助手对相关信息采用专业加密存储与传输方式，保障用户个人信息的安全。</p>");
            html.push("<p>3.2 你在申请本服务过程中，需要填写一些必要的信息，请保持这些信息的真实、准确、合法、有效并注意及时更新，以便制造助手向你提供及时有效的帮助，或更好地为你提供服务。根据相关法律法规和政策，请你填写真实的身份信息。若你填写的信息不完整或不准确，则可能无法使用本服务或在使用过程中受到限制。</p>");
            html.push("<p>3.3 一般情况下，你可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如帐号申诉服务）的考虑，你可能无法修改注册时提供的初始注册信息及其他验证信息。</p>");
            html.push("<p>3.4 制造助手将运用各种安全技术和程序建立完善的管理制度来保护你的个人信息，以免遭受未经授权的访问、使用或披露。</p>");
            html.push("<p>3.5 未经你的同意，制造助手不会向制造助手以外的任何公司、组织和个人披露你的个人信息，但法律法规另有规定的除外。</p>");
            html.push("<p>3.6 制造助手非常重视对未成年人个人信息的保护。若你是18周岁以下的未成年人，在使用制造助手的服务前，应事先取得你家长或法定监护人的书面同意。</p>");
            html.push("<p>3.7 你应对通过本服务了解、接收或可接触到的包括但不限于其他用户在内的任何人的个人信息予以充分尊重，你不应以搜集、复制、存储、传播或以其他任何方式使用其他用户的个人信息，否则，由此产生的后果由你自行承担。</p>");
            html.push("<h3>四、【企业账号特别条款】</h3>");
            html.push("<p>4.1 本条被视为制造助手企业账号的特别条款。本条对企业账号的约定与本协议其他内容存在冲突的，以本条为准。关于制造助手企业账号运营的具体规则，请阅读并遵守《制造助手企业账号运营规范》。</p>");
            html.push("<p>4.2 企业账号是企业用户的员工、关联组织与企业内部信息网络系统建立联系的移动应用平台。你应当审慎确定制造助手关注用户的范围，企业账号应仅限于向企业员工、供应商、经销商等提供服务，不应诱导终端用户（如购买、使用企业最终商品或者接受企业最终服务的用户）关注企业账号并开展商业活动。</p>");
            html.push("<p>4.3 制造助手非常重视对企业信息安全的保护。采用关键信息加密存储、信息通讯全程加密等多种技术手段和分级权限管理、关注验证、保密消息等业务实现方案以保护信息安全，你应当正确使用前述技术手段和方案，以共同保护企业信息的机密性、完整性和可用性。</p>");
            html.push("<p>4.4 企业账号及企业账号发送的所有信息均不支持被未关注该企业账号的其他用户搜索；制造助手会采取合理的措施保护企业账号发送或待发送的所有信息及被允许关注的制造助手用户个人信息不被未经授权的用户访问、查看、阅读或披露；制造助手不会搜集、复制、传播或以其他方式使用前述信息。</p>");
            html.push("<p>4.5 企业账号用户应当建立信息安全保护制度，包括但不限于：构建完备的企业账号管理员体系，合理设定管理员权限；合理选择信息发送的范围及方式；提醒或要求被允许关注的制造助手用户保护企业信息安全，不对企业账号发送的保密信息进行传播或分享；提醒或要求被允许关注的制造助手用户保护制造助手帐号安全，防止帐号被他人使用而导致的信息泄露。</p>");
            html.push("<h3>五、【用户行为规范】</h3>");
            html.push("<h3>5.1 【信息内容规范】</h3>");
            html.push("<p>5.1.1 本条所述信息内容是指用户使用本服务过程中所制作、复制、发布、传播的任何内容，包括但不限于制造助手帐号头像、名称、用户说明等注册信息及认证资料，或文字、语音、图片、视频、图文等发送、回复或自动回复消息和相关链接页面，以及其他使用制造助手帐号或制造助手平台服务所产生的内容。</p>");
            html.push("<p>5.1.2 你理解并同意，制造助手平台一直致力于为用户提供文明健康、规范有序的网络环境，你不得利用制造助手帐号或制造助手平台服务制作、复制、发布、传播如下干扰制造助手平台正常运营，以及侵犯其他用户或第三方合法权益的内容：</p>");
            html.push("<p>5.1.2.1 发布、传送、传播、储存违反国家法律法规禁止的内容：</p>");
            html.push("<p>（1）违反宪法确定的基本原则的；</p>");
            html.push("<p>（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</p>");
            html.push("<p>（3）损害国家荣誉和利益的；</p>");
            html.push("<p>（4）煽动民族仇恨、民族歧视，破坏民族团结的；</p>");
            html.push("<p>（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</p>");
            html.push("<p>（6）散布谣言，扰乱社会秩序，破坏社会稳定的；</p>");
            html.push("<p>（7）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</p>");
            html.push("<p>（8）侮辱或者诽谤他人，侵害他人合法权益的；</p>");
            html.push("<p>（9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</p>");
            html.push("<p>（10）以非法民间组织名义活动的；</p>");
            html.push("<p>（11）不符合《即时通信工具公众信息服务发展管理暂行规定》及遵守法律法规、社会主义制度、国家利益、公民合法利益、公共秩序、社会道德风尚和信息真实性等“七条底线”要求的；</p>");
            html.push("<p>（12）含有法律、行政法规禁止的其他内容的。</p>");
            html.push("<p>5.1.2.2 发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</p>");
            html.push("<p>5.1.2.3 涉及他人隐私、个人信息或资料的内容；</p>");
            html.push("<p>5.1.2.4 发表、传送、传播骚扰信息、广告信息及垃圾信息或含有任何性或性暗示的内容；</p>");
            html.push("<p>5.1.2.5 其他违反法律法规、政策及公序良俗、社会公德或干扰制造助手平台正常运营和侵犯其他用户或第三方合法权益内容的信息。</p>");
            html.push("<h3>5.2 【平台使用规范】</h3>");
            html.push("<p>5.2.1 本条所述平台使用是指用户使用本服务所进行的任何行为，包括但不限于注册登录、申请认证、帐号运营推广以及其他使用制造助手帐号或制造助手平台服务所进行的行为。关于制造助手帐号运营的具体规则，请阅读并遵守《制造助手平台运营规范》。同时，制造助手平台提供多个接口供用户开发使用，关于接口使用请阅读并遵守《制造助手平台开发者服务协议》及相关接口使用规范。</p>");
            html.push("<p>5.2.2 你不得利用制造助手帐号或制造助手平台服务进行如下行为：</p>");
            html.push("<p>5.2.2.1 提交、发布虚假信息，或冒充、利用他人名义的；</p>");
            html.push("<p>5.2.2.2 强制、诱导其他用户关注帐号、点击链接页面或分享信息的；</p>");
            html.push("<p>5.2.2.3 虚构事实、隐瞒真相以误导、欺骗他人的；</p>");
            html.push("<p>5.2.2.4 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；</p>");
            html.push("<p>5.2.2.5 填写和提交帐号注册与认证资料违反本协议规定，或申请制造助手认证资料与注册信息内容不一致，以及运营行为与注册或认证信息所公示身份无关的；</p>");
            html.push("<p>5.2.2.6 未能按照制造助手平台业务流程注册和使用本服务，违反本服务功能限制或运营策略，或采取任何措施规避前述流程、限制或策略，干扰制造助手平台正常运营的；</p>");
            html.push("<p>5.2.2.7 未经制造助手书面许可利用其他制造助手帐号、制造助手帐号和任何功能，以及第三方运营平台进行推广或互相推广的；</p>");
            html.push("<p>5.2.2.8 未经制造助手书面许可使用插件、外挂或通过其他第三方工具、运营平台或任何服务接入本服务和相关系统的；</p>");
            html.push("<p>5.2.2.9 利用制造助手帐号或制造助手平台服务从事任何违法犯罪活动的；</p>");
            html.push("<p>5.2.2.10 制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；</p>");
            html.push("<p>5.2.2.11 其他违反法律法规规定、违反《制造助手平台运营规范》、侵犯其他用户合法权益、干扰产品正常运营或制造助手未明示授权的行为。</p>");
            html.push("<h3>5.3【对自己行为负责】</h3>");
            html.push("<p>你理解并同意，制造助手平台仅为用户提供信息分享、传播及获取的平台，你必须为自己注册帐号下的一切行为负责，包括你所发表的任何内容以及由此产生的任何后果。你应对本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。制造助手无法且不会对因前述风险而导致的任何损失或损害承担责任。</p>");
            html.push("<h3>六、【帐号管理】</h3>");
            html.push("<p>6.1 制造助手帐号的所有权归上海千寸毫信息技术有限公司所有，用户完成申请注册手续后，获得制造助手帐号的使用权，该使用权仅属于初始申请注册人。若进行制造助手平台认证时，该公众帐号在帐号资质审核阶段提交的用户信息与初始申请注册人不一致的，帐号资质审核成功之后使用权属于通过资质审核的用户。帐号使用权禁止赠与、借用、租用、转让或售卖。</p>");
            html.push("<p>6.2 制造助手帐号密码由你自行设定。制造助手特别提醒你应妥善保管你的帐号和密码。制造助手与你共同负有维护帐号安全的责任。制造助手会采取并不断更新技术措施，努力保护你的帐号在服务器端的安全。你需要采取特定措施保护你的帐号安全，包括但不限于妥善保管制造助手帐号与密码、安装防病毒木马软件、定期更改密码等措施。当你使用完毕后，应安全退出。你同意在任何情况下不向他人透露帐号或密码信息。因你保管不善可能导致帐号被他人使用（包括但不限于遭受盗号、密码失窃）或信息数据泄漏，责任由你自行承担。你理解并同意，在你未进行举报或提出帐号申诉等方式明确告知制造助手帐号被他人使用或信息数据泄漏等情况并提供相关证明材料前，制造助手有理由相信该帐号行为是你使用帐号的行为。</p>");
            html.push("<p>6.3 在你怀疑他人在使用你的帐号或密码时，你同意立即通知上海千寸毫信息技术有限公司。如果你当前使用的制造助手帐号并不是你初始申请注册的或者通过制造助手提供的其他途径获得的，但你却知悉该帐号当前的密码，你不得用该帐号登录或进行任何操作，并请你在第一时间通知制造助手或者该帐号的初始申请注册人。如果制造助手发现你并非该帐号初始申请注册人，制造助手有权在未经通知的情况下终止你使用该帐号。</p>");
            html.push("<p>6.4 你理解并同意，为保护你及其他用户的数据安全，防止用户信息泄露、毁损、篡改或者丢失，制造助手有权对你接入的信息系统实行接入审查，包括但不限于技术水平审查、安全水平审查、主体资质审查等，并根据审查结果向你提出防入侵、防病毒等措施建议。若你的信息系统仍无法符合保护用户数据安全的要求，制造助手有权拒绝或终止提供本服务。</p>");
            html.push("<p>6.5 如你违反相关法律法规、本协议以及专项规则的规定，制造助手有权进行独立判断并随时限制、冻结或终止你对制造助手帐号的使用，且根据实际情况决定是否恢复使用。由此给你带来的损失（包括但不限于通信中断，用户资料及相关数据清空等），由你自行承担。</p>");
            html.push("<p>6.6 如果你的制造助手帐号被盗、密码遗忘或因其他原因导致无法正常登录，你可以按照制造助手的申诉途径进行申诉。制造助手并不承诺你一定能通过申诉找回帐号。</p>");
            html.push("<p>6.7 为了充分利用帐号资源，如果你存在注册制造助手帐号后未及时进行初次登录使用，或长期未登陆使用制造助手帐号等情形，制造助手有权终止该帐号的使用。</p>");
            html.push("<h3>七、【收费服务】</h3>");
            html.push("<p>7.1 制造助手平台部分服务是以收费方式提供的（如制造助手平台完整企业服务等），如你使用收费服务，请遵守相关的专项规则。</p>");
            html.push("<p>7.2 制造助手可能根据实际需要对收费服务的收费标准、方式进行修改和变更，制造助手也可能会对部分免费服务开始收费。前述修改、变更或开始收费前，制造助手将在相应服务页面进行通知或公告。如果你不同意上述修改、变更或付费内容，则应停止使用该服务。</p>");
            html.push("<h3>八、【数据的储存】</h3>");
            html.push("<p>8.1 制造助手不对你在本服务中相关数据的删除或储存失败负责。</p>");
            html.push("<p>8.2 制造助手有权根据实际情况自行决定单个用户在本服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。你可根据自己的需要自行备份本服务中的相关数据。</p>");
            html.push("<p>8.3 如果你停止使用本服务或服务被终止或取消，制造助手可以从服务器上永久地删除你的数据。在服务停止、终止或取消后，制造助手没有义务向你返还任何数据。</p>");
            html.push("<h3>九、【风险及免责】</h3>");
            html.push("<p>9.1 你理解并同意：为了向你提供有效的服务，本服务会利用你终端设备的处理器和带宽等资源。本服务使用过程中可能产生数据流量的费用，用户需自行向运营商了解相关资费信息，并自行承担相关费用。</p>");
            html.push("<p>9.2 用户在使用本服务时，须自行承担如下制造助手不可掌控的风险内容，包括但不限于：</p>");
            html.push("<p>9.2.1 由于受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏等不可抗拒因素可能引起的信息丢失、泄漏等风险；</p>");
            html.push("<p>9.2.2 用户或制造助手的电脑软件、系统、硬件和通信线路出现故障；</p>");
            html.push("<p>9.2.3 用户操作不当或通过非制造助手授权的方式使用本服务；</p>");
            html.push("<p>9.2.4 用户发布的内容被他人转发、分享，因此等传播可能带来的风险和责任；</p>");
            html.push("<p>9.2.5 由于网络信号不稳定等原因，所引起的制造助手平台登录失败、资料同步不完整、页面打开速度慢等风险；</p>");
            html.push("<p>9.2.6 其他制造助手无法控制或合理预见的情形。</p>");
            html.push("<p>9.3 你理解并同意，用户通过制造助手平台群发的内容可能会被其他用户或第三方复制、转载、修改或做其他用途，脱离你的预期和控制，用户应充分意识到此类风险的存在，任何你不愿被他人获知的信息都不应在制造助手平台发布。如果相关行为侵犯了你的合法权益，你可以向制造助手平台投诉，我们将依法进行处理。</p>");
            html.push("<p>9.4 制造助手依据本协议约定获得处理违法违规内容或行为的权利，该权利不构成制造助手的义务或承诺，制造助手不能保证及时发现违法违规情形或进行相应处理。</p>");
            html.push("<p>9.5 你理解并同意，因业务发展需要，制造助手保留单方面对本服务的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、限制、终止或撤销的权利，用户需承担此风险。</p>");
            html.push("<h3>十、【知识产权声明】</h3>");
            html.push("<p>10.1 制造助手在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归制造助手所有，用户在使用本服务中所产生的内容的知识产权归用户或相关权利人所有，订阅号及服务号的用户通过制造助手平台发布的群发信息（以下统称为“公开群发信息”）一经发布即向公众传播和共享。</p>");
            html.push("<p>10.2 制造助手平台是一个获取、分享及传播信息的平台，为向所有用户提供更优质的服务，制造助手可能会对制造助手帐号的昵称、头像、认证信息、公开群发信息等公开非保密内容在法律允许的范围内进行使用，包括但不限于提供搜索、链接等服务。</p>");
            html.push("<p>10.3 除另有特别声明外，制造助手提供本服务时所依托软件的著作权、专利权及其他知识产权均归制造助手所有。</p>");
            html.push("<p>10.4 制造助手在本服务中所使用的“制造助手”、“千寸毫”、“Qiancunhao”、“zhizaozhushou”、\"DataOnSite\"、“Labs”、制造助手图标及造LOGO等商业标识，其著作权或商标权归上海千寸毫信息技术有限公司所有。</p>");
            html.push("<p>10.5 上述及其他任何本服务包含的内容的知识产权均受到法律保护，其他未经制造助手、用户或相关权利人许可的第三人，不得以任何形式进行使用或创造相关衍生作品。</p>");
            html.push("<h3>十一、【法律责任】</h3>");
            html.push("<p>11.1 如果制造助手发现或收到他人举报或投诉用户违反本协议约定的，制造助手有权不经通知随时对相关内容进行删除、屏蔽，并视行为情节对违规帐号处以包括但不限于警告、删除部分或全部关注用户、限制或禁止使用部分或全部功能、帐号封禁直至注销的处罚，并公告处理结果。制造助手平台认证帐号除上述处罚措施外，制造助手有权取消其帐号认证身份，并视情节决定临时或永久封禁相关帐号认证资质。如果你发现任何人违反本协议规定或以其他不当的方式使用制造助手平台服务，请立即向制造助手平台举报或投诉，我们将依法进行处理。</p>");
            html.push("<p>11.2 你理解并同意，制造助手有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何人士采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应独自承担由此而产生的一切法律责任。</p>");
            html.push("<p>11.3 你理解并同意，因你违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，你应当独立承担责任；制造助手因此遭受损失的，你也应当一并赔偿。</p>");
            html.push("<h3>十二、【其它】</h3>");
            html.push("<p>12.1 你使用本服务即视为你已阅读并同意受本协议的约束。制造助手有权在必要时修改本协议条款。你可以在相关服务页面查阅最新版本的条款。本协议条款变更后，如果你继续使用制造助手平台服务，即视为你已接受修改后的协议。如果你不接受修改后的协议，应当停止使用制造助手平台服务。</p>");
            html.push("<p>12.2 本协议签订地为中华人民共和国上海市浦东新区。</p>");
            html.push("<p>12.3 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p>");
            html.push("<p>12.4 若你和制造助手之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，你同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。</p>");
            html.push("<p>12.5 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>");
            html.push("<p>12.6 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>");
            return html.join("");
        },

        // 功能描述：事件绑定
        event: function (dialog) {
            $("#" + dialog.id + " .ui-dialog-bd").height(($(window).height() - 180) + "px");
        }
    });
}
