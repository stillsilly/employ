require.config({
    urlArgs: (function () {
        //    var date = new Date();
        //    return date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay()+ "_" + date.getDate() + "_" + date.getHours() + "_" + date.getMinutes();
        return "201703292253";
    })(),
    paths: {
        jquery: 'lib/zepto.min',
        vue: '//cdn.bootcss.com/vue/1.0.25/vue.min',
        md5: 'lib/md5',
        iscroll: 'lib/iscroll',

        config: 'common/config',
        utils: 'common/utils',
        service: 'common/service',

        code: 'component/form.code',
        text: 'component/form.text',
        link: 'component/form.link',
        label: 'component/form.label',
        input: 'component/form.input',
        button: 'component/form.button',
        password: 'component/form.password',
        header: 'component/form.header',
        tab: 'component/form.tab',
        tag: 'component/form.tag',
        card: 'component/form.card',
        resume: 'component/form.resume',
        comdate: 'component/date',
        date: 'component/form.date',
        cityselect: 'component/form.cityselect',
        city: 'component/form.city',
        radio: 'component/form.radio',
        row: 'component/form.row',
        user: 'component/form.user',
        task: 'component/form.task',
        notice: 'component/form.notice',
        sign: 'component/form.sign',
        school: 'component/form.school',
        group: 'component/form.group',
        evaluate: 'component/form.evaluate',
        score: 'component/form.score',
        payinfo: 'component/form.payinfo',
        item: 'component/form.item',
        upload: 'component/form.upload',
        system: 'component/form.system',
        store: 'component/form.store',
        register: 'component/form.register'
    },
    shim: {
        jquery: {
            exports: '$'
        }
    }
});

require([
    'jquery',
    'router',
    'config',
    'utils',
    'service',
    'iscroll'
], function (jquery, router, config, utils, service, iscroll) {
    $.config = config;
    $.utils = utils;
    $.service = service;
    $.dialog = function (message, btn, cb) {
        $(".ui-dialog").remove();

        function load() {
            btn = btn && btn.length ? btn : ["确定"];
            var button = [];
            for (var i = 0; i < btn.length; i++) {
                if (typeof btn[i] == "string") {
                    button.push("<li data-tag=\"" + i + "\">" + btn[i] + "</li>");
                }
            }
            return button.length ? "<ul>" + button.join("") + "</ul>" : ""
        }

        var html = "<div class=\"ui-dialog\">\
            <div class=\"ui-dialog-mask\"></div>\
            <div class=\"ui-dialog-box\">\
                <div class=\"ui-dialog-content\">" + message + "</div>\
                <div class=\"ui-dialog-button\">"+ load() + "</div>\
            </div>\
        </div>";

        $('body').append(html);

        $('.ui-dialog-button li').click(function () {
            $(".ui-dialog").remove();

            var tag = $(this).data("tag") || "";
            cb && cb(tag);
        });
        $('.ui-dialog-mask').click(function () {
            $(".ui-dialog").remove();
        });
    }
    $.confirm = function (message, ok, cancel) {
        $.dialog("<div class=\"ui-dialog-confirm\">" + message + "</div>", ["取消", "确认"], function (tag) {
            if (tag == 1) {
                ok && ok();
            } else {
                cancel && cancel();
            }
        });
    }
    $.poptips = function (message, callback) {
        $(".ui-poptips").remove();
        $('body').append("<div class=\"ui-poptips\"><i class=\"iconfont icon-information\"></i>" + (message || "") + "</div>");
        // $('body').append("<div class='bod-mask'></div>");
        callback ? callback() : null;
        setTimeout(function () {
            $(".ui-poptips").remove();
             // $(".bod-mask").remove();
        }, 2200);
    }
    var baseUrl = window.location.host.indexOf("cform") >= 0 ? "http://baby.mobile.cform.cn" : "http://employ.gdbbe.cn/employ";
    $.jump = function (href) {
        // window.location.href=href;
        if (/\?/.test(href)) {//r134edqe13eswe1ewe1e1wqd23d3e3e2
            href = href.replace(/\?(.*)$/, ".html?$1");
        } else {//http://img2.imgtn.bdimg.com/it/u=3637598656,3567466436%26fm=214%26gp=0.jpg
            href += ".html";
        }
        // 
        window.location.href =baseUrl+ href;
        // window.location.href =href;
    }

    // 设置openid
    if (!window.localStorage.getItem("app_id")) {
        window.localStorage.setItem("app_id", 'r134edqe13eswe1ewe1e1wqd23d3e3e2');
        window.localStorage.setItem("header_img", "http://img2.imgtn.bdimg.com/it/u=3637598656,3567466436%26fm=214%26gp=0.jpg");
    }

    // 解决样式被撑开问题
    $('body').css({ height: $(window).height() + "px" });

    // 加载基础数据
    if (/user/gi.test(window.location.pathname)) {
        new router();
    } else {
        $.service.getDict(function () {
            // 模块路由
            new router();
        })
    }
});