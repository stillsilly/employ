define(function () {
    return {
        template: '<div class="ui-card ui-card-resume">\
            <div class="info">\
                <div class="ui-icon-head">\
                    <div class="ui-icon-head-pic" :style="model.headerImg ? \'background-image:url(\' + model.headerImg + \')\': \'\'"></div>\
                    <b>{{model.name}}</b>\
                </div>\
                <div class="summary"><em><i>评分：</i>{{model.score}}</em><em><i>性别：</i>{{model.sexual}}</em><em><i>电话：</i>{{model.mobile}}</em></div>\
            </div>\
            <div style="border-top:1px solid #eee;padding:5px 15px;">\
                <div :class="type_id == 2 ? \'ui-radio on\' : \'ui-radio\'" @click="change(2)">\
                    <div class="ui-radio-button"></div>\
                    正常上班\
                </div>\
                <div :class="type_id == 1 ? \'ui-radio on\' : \'ui-radio\'" @click="change(1)">\
                    <div class="ui-radio-button"></div>\
                    面试成功，没来上班\
                </div>\
            </div>\
        </div>',
        props: ['model', 'type_id'],
        methods: {
            change: function (type_id) {
                this.type_id = type_id;
            }
        }
    }
});