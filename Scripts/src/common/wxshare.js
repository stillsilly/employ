define(["wx"], function (wx) {
    var module = function (option) {
        if (!option) return;

        this.option = option;
        this.init();
    }
    module.prototype = {
        option: null,

        // 功能描述：初始化
        init: function () {
            this.load();
        },

        // 功能描述：加载配置
        load: function () {
            var jssdkConfig = {
                appId: this.option.appId,
                timestamp: this.option.timestamp,
                nonceStr: this.option.nonceStr,
                signature: this.option.signature,
                title: this.option.title || "网红平台",
                desc: this.option.desc || "",
                link: this.option.link || $.config.getFullUrl('/house'),
                imgUrl: this.option.imgUrl || $.config.getFullUrl('/images/share.jpg'),
                type: 'link',   //link, music, video
                dataUrl: '',
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"],
                monitor: 'false',
                success: function () {
                    // alert("success");
                },
                cancel: function () {
                    // alert("cancel");
                }
            };
            console.log("jssdkconfig", jssdkConfig);
            this.wxShare(jssdkConfig);
        },

        // 功能描述：微信分享
        wxShare: function (config) {
            wx.config({
                debug: false,
                appId: config.appId,
                timestamp: config.timestamp,
                nonceStr: config.nonceStr,
                signature: config.signature,
                jsApiList: config.jsApiList
            });

            wx.error(function (res) {
                console.log(res)
            });

            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: config.desc,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    success: config.success,
                    cancel: config.cancel
                });
                wx.onMenuShareAppMessage({
                    title: config.title,
                    desc: config.desc,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    type: (config.type || "link"),
                    dataUrl: (config.dataUrl || ""),
                    success: config.success,
                    cancel: config.cancel
                });
                wx.onMenuShareQQ({
                    title: config.title,
                    desc: config.desc,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    success: config.success,
                    cancel: config.cancel
                });
                wx.onMenuShareWeibo({
                    title: config.title,
                    desc: config.desc,
                    link: config.link,
                    imgUrl: config.imgUrl,
                    success: config.success,
                    cancel: config.cancel
                })
            })
        }
    }
    return module;
});