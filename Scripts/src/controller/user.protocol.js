define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        title: "",
        article: "",

        // 功能描述：初始化
        ready: function () {
            this.title = decodeURIComponent(this.nav.title);
            this.load();
        },

        // 功能描述：加载
        load: function () {
            var me = this;
            $.utils.ajax({
                url: "/common/article",
                data: { articleID: this.nav.type || 2 },
                success: function (data, result) {
                    me.article = data;
                }
            })
        }
    }
    return module;
});