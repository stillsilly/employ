define(function () {
    return {
        template: '<div class="ui-card-foot ui-card-button">\
            <ul v-if="status==0">\
                <li @click=action(1)><div class="ui-icon-ignore">忽略</div></li>\
                <li @click=action(2)><div class="ui-icon-pass">通过</div></li>\
            </ul>\
            <ul v-if="status==1">\
                <!--<li @click=action(3)><div class="ui-icon-ignore">忽略</div></li>-->\
                <li @click=action(4)><div class="ui-icon-notice">发送上班通知</div></li>\
            </ul>\
            <ul v-if="status==5">\
                <li @click="action(5)" style="text-align:center">去评价</li>\
            </ul>\
            <ul v-if="status==6">\
                <li @click=action(6) class="ui-icon-sign">签到详情</li>\
                <li @click=action(8) class="ui-icon-confirm">结算确认</li>\
            </ul>\
        </div>',
        props: ['status', 'model'],
        methods: {
            action: function (type) {
                this.$emit('message', type, this.model.id, this.model);
            }
        }
    }
});