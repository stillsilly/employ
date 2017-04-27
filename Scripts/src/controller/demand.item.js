define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        item: {},

        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        load: function () {
            var me = this;
            $.utils.ajax({
                url: "/service/requirement/detail",
                data: { requirementID: this.nav.id },
                type: "GET",
                success: function (data, result) {
                    me.item = data;
                },
                error: function () {
                    me.item = {};
                }
            })
        },

        // 邀请大使
        invite: function () {
            $.jump("/Demand/ServiceList?id=" + this.item.id);
        },

        // 已收到简历
        resume: function () {
            $.jump("/Demand/Resume?id=" + this.item.id);
        },
        again:function(){
            $.confirm("是否重新发布该职位招聘信息？", function () {
                        this.repost(this.item);
                    }.bind(this));
        },
        repost:function(){
            // 重新发布
            $.jump("/Demand/Add?id=" + this.item.id);
        }
    }
    return module;
});