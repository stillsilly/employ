define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        status: 1,
        page: 0,
        list: [],
        allSort:true,
        allRange:false,
        allScore:false,
        allRangeImg:true,
        allScoreImg:false,
        allRangeArr:0,
        allScoreArr:0,
        loadBottom:true,
        bottomShow:false,
        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        load: function () {
            var me = this;
            
             this.getMsg();
            $(window).scroll(this.loadMore);
        },
         loadMore:function(){
                // 当滚动到最底部以上100像素时， 加载新内容
                // 核心代码
            if ($(document).height() - $(window).scrollTop() - $(window).height()==0){
              this.getMsg();
            }
        },
        active:function(msg){
            if (msg=='allSort') {
                this.allSort=true;
                this.allRange=false;
                this.allScore=false;
            } else if (msg=='allRange') {
                this.allSort=false;
                this.allRange=true;
                this.allScore=false;
                if(this.allRangeArr){
                    this.allRangeImg=!this.allRangeImg;
                }
                this.allRangeArr++;
                this.allScoreArr=0;
                this.loadBottom=true;
                this.page=0;
                this.getMsg('range');
                document.body.scrollTop=0;
            } else if (msg=='allScore') {
                this.allSort=false;
                this.allRange=false;
                this.allScore=true;
                if(this.allScoreArr){
                    this.allScoreImg=!this.allScoreImg;
                }
                this.allRangeArr=0;
                this.allScoreArr++;
                this.loadBottom=true;
                this.page=0;
                this.getMsg('score');
                document.body.scrollTop=0;
            }
        },
        getMsg : function (item) {
            var me = this;
            let order='dic1';
            if (!this.loadBottom) {
                return
            }
            if (item == 'range') {
                if (this.allRangeImg) {
                    order = 'dic2';
                } else {
                    order = 'dic1';
                }
            } else if (item == 'score') {
                if (this.allScoreImg) {
                    order = 'scr2';
                } else {
                    order = 'scr1';
                }
            }
            this.bottomShow=true;
            this.page++;
            $.utils.ajax({
                url: "/requirement/invite/userservice/list",
                data: { order: order, jobID: this.nav.id ,page:this.page,pageSize:'20'},
                type: "GET",
                success: function (data, result) {
                    if(result.status==0){
                        //    for(var i=0;i<20;i++){
                        // data.list.push({headerImg:"http://wx.qlogo.cn/mmopen/0OLudAC7Q77ibZnjfFrA0HrAuHTXpcREc6WBje7wfGk5oLdSibWHVYm2Kw3Z9icqRZdAQupE9MepIecgxQ9WaCZQXWjevUAdTJU/0",
                        //             id:25,mobile:"18210836579",
                        //             realName:"",
                        //             score:"3",
                        //             sexual:"男",
                        //             status:3,
                        //             tag:["有健康证", "沟通能力强", "积极主动"],
                        //             taskTime:0})
                        // }
                        if(data.total==0){
                            $.poptips("无数据");
                        }
                        if(me.page==1){
                            me.list = data.list || [];
                        }else{
                            for(var i=0;i<data.list.length;i++){
                                me.list.push(data.list[i]);
                            }
                        }
                        if(me.list.length==data.total){
                            me.loadBottom=false;
                        }
                        me.bottomShow=false;
                         // me.list[0].distance='<500M'
                    }
                },
                error: function () {
                    // me.list = [];
                     me.loadBottom=false;
                    me.bottomShow=false;
                }
            })
        },
        // 功能描述：执行动作
        message: function (code, id) {
            switch (code) {
                case 8:
                    this.isInvite(id);
                    break;
            }
        },

        // 功能描述：是否已邀请
        isInvite: function (id) {
            var me = this;
            $.utils.ajax({
                url: "/common/invite/check",
                data: { userID: id, jobID: this.nav.id },
                type: "GET",
                success: function (data, result) {
                    if (!data) {
                        me.send(id);
                    } else {
                        $.poptips("已邀请该校园大使");
                    }
                },
                error: function () {
                    $.poptips("发送邀请失败");
                }
            })
        },

        // 功能描述：发送邀请
        send: function (id) {
            $.confirm("确认发送职位邀请？", function () {
                $.utils.ajax({
                    url: "/requirement/userservice/invite",
                    data: { userID: id, jobID: this.nav.id },
                    type: "GET",
                    success: function (data, result) {
                        $.poptips("已发送邀请");
                    },
                    error: function () {
                        $.poptips("发送邀请失败");
                    }
                })
            }.bind(this));
        }
    }
    return module;
});