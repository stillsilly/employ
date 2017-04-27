define(function () {
    var module = function (option) {
        this.option = option || {};
        this.init();
    };
    module.prototype = {
        option: null,
        
        // 功能描述：初始化
        init: function () {
            this.event();
        },
        
        // 功能描述：事件绑定
        event: function () {
            var me = this;
            $(".ui-container").on("click", ".ui-collect-icon", function (e) {
                var obj = $(this);
                if (!obj.hasClass("iconfont")) {
                    obj = $(this).find(".iconfont");
                }

                if (obj.hasClass("icon-like")) {                    
                    me.collect(obj, 1, $(this).data("id"));
                } else {
                    me.collect(obj, 0, $(this).data("id"));
                }
                return false;
            });
        },

        // 功能描述：收藏
        collect: function (obj, tag, kol_id) {
            if (!kol_id) return;

            var map = {                
                0: { url: "/favorite/remove", chn: "取消收藏KOL" },
                1: { url: "/favorite/add", chn: "收藏KOL" }
            }            

            $.utils.ajax({
                url: map[tag].url,
                data: { kol_id: kol_id },
                success: function (result) {
                    if (result.responseCode) {
                        $.dialog(result.responseMsg);
                        return;
                    }

                    var message = "";
                    switch (tag) {
                        case 0:
                            message = "取消收藏成功";
                            obj.removeClass("icon-favorite").addClass("icon-like");
                            break;
                        case 1:
                            message = "收藏成功";
                            obj.removeClass("icon-like").addClass("icon-favorite");
                            break;
                    }
                    $.poptips({ message: message });

                    // 收藏回调
                    if (window.fncollect && typeof window.fncollect == 'function') {
                        window.fncollect(obj, tag);
                    }
                }
            });
        }
    }
    return module;
});