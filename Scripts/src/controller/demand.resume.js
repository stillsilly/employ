define(function () {
    var module = function () {
        //
    };
    module.prototype = {
        status: 1,
        page: 0,
        list: [],
         loadBottom:true,
        bottomShow:false,
        // 功能描述：初始化
        ready: function () {
            this.load();
        },

        load: function (e) {
            console.log(e)
            if(e){
                this.status=e;
            }
            this.loadBottom=true;
            this.page=0;
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
        getMsg:function(){
            var me = this;
            if(!this.loadBottom){
                return
            }
            this.bottomShow=true;
            this.page++;
            $.utils.ajax({
                url: "/requirement/receiveresume",
                data: { status: this.status - 1, page: this.page,pageSize:'20', jobID: this.nav.id || 1 },
                type: "GET",
                success: function (data, result) {
                    if(result.status==0){
                        // for(var i=0;i<20;i++){
                        // data.push({headerImg:"http://wx.qlogo.cn/mmopen/0OLudAC7Q77ibZnjfFrA0HrAuHTXpcREc6WBje7wfGk5oLdSibWHVYm2Kw3Z9icqRZdAQupE9MepIecgxQ9WaCZQXWjevUAdTJU/0",
                        //             id:25,mobile:"18210836579",
                        //             realName:"",
                        //             score:"3",
                        //             sexual:"男",
                        //             status:3,
                        //             tag:["有健康证", "沟通能力强", "积极主动"],
                        //             taskTime:0})
                        // }
                        if(me.page==1){
                            me.list = data.list|| [];
                        }else{
                            for(var i=0;i<data.length;i++){
                                me.list.push(data[i]);
                            }
                        }
                        if(me.list.length==data.total){
                            me.loadBottom=false;
                        }
                        me.bottomShow=false;
                    }
                },
                error: function () {
                    // me.loadBottom=false;
                    me.bottomShow=false;
                    me.list =[];
                }
            })
        },
        // 功能描述：执行动作
        message: function (code, id,msg) {
            switch (code) {
                case 1:
                    this.ignore(id);
                    break;
                case 2:
                    this.pass(id);
                    break;
                case 3:
                    this.ignore(id);
                    break;
                case 4:
                    this.notice(id);
                    break;
                case 5:
                    this.evaluate(id);
                    break;
                case 6:
                    this.signWork(id,msg);
                    break;
                case 8:
                    this.payConfirm(id,msg);
                    break;
            }
        },

        // 忽略
        ignore: function (id) {
            $.confirm("确认忽略该简历吗？", function () {
                this.passorignore(id, 2);
            }.bind(this));
        },

        // 通过
        pass: function (id) {
            $.confirm("确认通过该简历吗？", function () {
                this.passorignore(id, 1);
            }.bind(this));
        },

        // 忽略或通过
        passorignore: function (id, type) {
            $.utils.ajax({
                url: "requirement/resume/passorignore",
                data: { jobID: this.nav.id, userID: id, type: type },
                type: "GET",
                success: function (data, result) {
                    $.poptips(data ? "操作成功" : "操作失败", function () {
                        if (data) {
                            window.location.reload();
                        }
                    });
                },
                error: function () {
                    $.poptips("操作失败");
                }
            })
        },
        // 待结算
        payConfirm:function(id,msg){
            $.jump("/Demand/PayConfirm?id=" + this.nav.id + "&uid=" + id+'&taskID='+msg.taskID);
        },
        // 通知
        notice: function (id) {
            $.jump("/Demand/Task?id=" + this.nav.id + "&uid=" + id);
        },
        // 评价
        evaluate: function (id) {
            $.jump("/Demand/EvaluateEdit?id=" + this.nav.id + "&uid=" + id);
        },
        signWork: function (id,msg) {
            $.jump("/Demand/SignInfo?taskid=" +msg.taskID + "&uid=" + id);
        },
    }
    return module;
});