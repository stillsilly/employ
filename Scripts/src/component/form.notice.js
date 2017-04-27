define(function () {
    return {
        template: '<div class="ui-notice">\
            请先与校园大使完成线下面试步骤，<br/>\
            若面试通过，则点击发送上班通知按钮，完成招聘。\
            <em>校园大使电话：<a @click="getPhone">{{model.userMobile}}</a></em>\
        </div>',
        props: ['model', 'placeholder'],
        methods: {
            clear: function () {
                this.model = "";
            },
            getPhone:function(){
                window.location.href='tel:'+this.model.userMobile;
            }
        }
    }
});