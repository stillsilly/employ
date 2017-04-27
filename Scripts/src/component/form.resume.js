define(function () {
    return {
        template: '<div class="ui-card ui-card-resume">\
            <div v-if=\"status\" class="info" @click="jump(url)">\
                <div class="ui-icon-head">\
                    <div class="ui-icon-head-pic" :style="model.headerImg ? \'background-image:url(\' + model.headerImg + \')\': \'\'"></div>\
                    <b>{{model.realName || model.name }}</b>\
                    <em><i>平台兼职次数：</i>{{model.taskTime || 0}}次</em>\
                    <em v-if="model.distance"><i>距离：</i>{{model.distance}}</em>\
                     <em v-if="detailMsg" style="float:right;margin-right:10px;">{{detailMsg}}</em>\
                </div>\
                <div class="summary"><em><i>评分：</i>{{model.score || 0}}分</em><em><i>性别：</i>{{model.sexual }}</em><em @click="getPhone"><i>电话：</i>{{model.mobile || ""}}</em></div>\
            </div>\
            <div v-else class="info" @click="jump(url)">\
                <div class="ui-icon-head">\
                    <div class="ui-icon-head-pic" :style="model.headerImg ? \'background-image:url(\' + model.headerImg + \')\': \'\'"></div>\
                    <b>{{model.realName || model.name }}</b>\
                </div>\
                <div class="summary"><em><i>年龄：</i>{{model.age}}岁</em><em><i>性别：</i>{{model.sexual}}</em><em @click="getPhone"><i>电话：</i>{{model.mobile}}</em></div>\
                <div class="summary"><em><i>平台兼职次数：</i>{{model.taskTime || 0}}次</em><em><i>评分：</i>{{model.score||0}}分</em></div>\
            </div>\
            <div v-if="model && model.tag" class="ui-tab-job clearfix">\
                <i v-for="item in model.tag" >{{item}}</i>\
            </div>\
            <div v-if="status==0" v-show="model.status==0" class="ui-card-foot ui-card-button">\
                <ul>\
                    <li @click=action(1)><div class="ui-icon-ignore">忽略</div></li>\
                    <li @click=action(2)><div class="ui-icon-pass">通过</div></li>\
                </ul>\
            </div>\
            <div v-if="status==1" v-show="model.status==1" class="ui-card-foot ui-card-button">\
                <ul>\
                    <!--<li @click=action(3)><div class="ui-icon-ignore">忽略</div></li>-->\
                    <li @click=action(4)><div class="ui-icon-notice">发送上班通知</div></li>\
                </ul>\
            </div>\
            <div v-if="status==9" v-show="model.status==9" class="ui-card-foot ui-card-button">\
                <ul>\
                    <li  @click=action(6) ><div class="ui-icon-notice">签到详情</div></li>\
                    <li><div class="ui-icon-notice">已结算</div></li>\
                </ul>\
            </div>\
            <div v-if="status==3" v-show="model.status==3" class="ui-card-foot ui-card-button">\
                <ul>\
                    <li @click=action(6) ><div class="ui-icon-notice">签到详情</div></li>\
                    <!--<li><div class="ui-icon-notice">待工作</div></li>-->\
                </ul>\
            </div>\
            <div v-if="status==5" class="ui-card-foot ui-card-button">\
                <ul>\
                    <li @click=action(6) class="ui-icon-sign">签到详情</li>\
                    <li @click=action(5) class="ui-icon-confirm">去评价</li>\
                </ul>\
            </div>\
            <div v-if="status==6" class="ui-card-foot ui-card-button">\
                <ul>\
                    <li @click=action(6) class="ui-icon-sign">签到详情</li>\
                    <li @click=action(8) class="ui-icon-confirm">结算确认</li>\
                </ul>\
            </div>\
             <div v-if="status==4" class="ui-card-foot ui-card-button">\
                <ul>\
                    <li @click=action(6) class="ui-icon-sign">签到详情</li>\
                    <!--<li  class="ui-icon-confirm">已改派</li>-->\
                </ul>\
            </div>\
            <div v-if="status==16" class="ui-card-foot ui-card-button" @click=action(8) class="ui-icon-sign">发送邀请</div>\
            <div v-if="status==7" class="ui-card-foot ui-card-button" @click=action(9) class="ui-icon-sign">查看详情</div>\
        </div>',
        props: ['status', 'model', 'color', 'text', 'url'],
        data:function(){
                return{
                    detailMsg:''
                }
        },
        created:function(){
            if(this.model.sexual=='1'){
                this.model.sexual='男';
            }else if(this.model.sexual=='2'){
                this.model.sexual='女';
            }
            if(this.model.relationStatus){
                this.model.status=this.model.relationStatus;
                this.status=this.model.relationStatus;
            }
            if(this.model.status=='1'){
                this.detailMsg='简历通过';
            }else if(this.model.status=='3'){
                this.detailMsg='待工作';
            }else if(this.model.status=='4'){
                this.detailMsg='已改派';
            }else if(this.model.status=='5'){
                this.detailMsg='待评价';
            }else if(this.model.status=='6'){
                this.detailMsg='待确认';
            }else if(this.model.status=='7'){
                this.detailMsg='待审核';
            }else if(this.model.status=='8'){
                this.detailMsg='待结算';
            }else if(this.model.status=='9'){
                this.detailMsg='已结算';
            }else if(this.model.status=='10'){
                this.detailMsg='已失效';
            }else if(this.model.status=='11'){
                this.detailMsg='服务方已评价';
            }
        },
        methods: {
            getPhone:function(){
                window.location.href='tel:'+this.model.mobile;
            },
            jump: function () {
                if (!this.url) return;

                $.jump(this.url);
            },
            action: function (type) {
                this.$emit('message', type, this.model.id, this.model);
            }
        }
    }
});