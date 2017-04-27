define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        status: 1,
        page: 1,
        list: [],
        loadBottom:true,
        bottomShow:false,
        // 功能描述：初始化
        ready: function () {
            this.status = this.nav.status || 1;
            this.load();
        },

        load: function () {
            var me = this;
               $.utils.ajax({
                url: "/requirement/published",
                data: { status: this.status, page: this.page },
                type: "GET",
                success: function (data, result) {
                    if(result.status==0){
                            me.list = data.list || [];
                        
                    }
                },
                error: function () {
                    me.list = [];
                }
            })
            // this.getMsg();
            // $(window).scroll(this.loadMore);
        },
        // loadMore:function(){
        //         // 当滚动到最底部以上100像素时， 加载新内容
        //         // 核心代码
        //     if ($(document).height() - $(window).scrollTop() - $(window).height()==0){
        //       this.getMsg();
        //     }
        // },
        // getMsg:function(){
        //     var me = this;
        //     if(!this.loadBottom){
        //         return
        //     }
            
        //     this.bottomShow=true;
        //     this.page++;
        //     $.utils.ajax({
        //         url: "/requirement/published",
        //         data: { status: this.status, page: this.page },
        //         type: "GET",
        //         success: function (data, result) {
        //             if(result.status==0){
        //                 // if(me.page==1){
        //                     me.list = data.list || [];
        //                 // }else{
        //                 //     for(var i=0;i<data.list.length;i++){
        //                 //         me.list.push(data.list[i]);
        //                 //     }
        //                 // }
        //                 // if(me.list.length==data.totalNum){
        //                 //     me.loadBottom=false;
        //                 // }
        //                 // me.bottomShow=false;
        //             }
        //         },
        //         error: function () {
        //             me.list = [];
        //             // me.loadBottom=false;
        //             // me.bottomShow=false;
        //         }
        //     })
        // },
        // 功能描述：执行动作
        message: function (code, item) {
            switch (code) {
                case 1:
                    $.confirm("确认终止该职位招聘信息？", function () {
                        this.stop(item);
                    }.bind(this));
                    break;
                case 2:
                    this.invite(item);
                    break;
                case 3:
                    $.confirm("是否重新发布该职位招聘信息？", function () {
                        this.repost(item);
                    }.bind(this));
                    break;
                case 4:
                    this.job(item);
                    break;
                case 5:
                    this.resume(item);
                    break;
            }
        },

        // 职位详情
        job: function (item) {
            if(this.status=='1'){
                $.jump("/Demand/Item?id=" + item.id);
            }else if(this.status=='2'){
                $.jump("/Demand/Item?id=" + item.id+'&hideItem=true');
            }
            
        },

        // 已收到简历
        resume: function (item) {
            $.jump("/Demand/Resume?id=" + item.id);
        },

        // 终止招聘
        stop: function (item) {
            var me = this;
            $.utils.ajax({
                url: "/requirement/stop",
                data: { jobID: item.id },
                type: "GET",
                success: function (data, result) {
                    $.poptips("终止招聘成功", me.load.bind(me));
                },
                error: function () {
                    me.list = [];
                }
            })
        },

        // 邀请大使
        invite: function (item) {
            $.jump("/Demand/ServiceList?id=" + item.id);
        },

        // 重新发布
        repost: function (item) {
            $.jump("/Demand/Add?id=" + item.id);
        }
    }
    return module;
});