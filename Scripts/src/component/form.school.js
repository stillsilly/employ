define(function () {
    return {
        template: '<div class="ui-card ui-card-school">\
            <div class="info" style="padding-bottom:10px;">\
                <div class="ui-icon-school">{{model.collegeName}}</div>\
                 <div style="position:relative;margin-top:8px;">\
                <em class="right" style="top:0;"><i>专业：</i>{{model.specialtyName}}</em>\
                <em><i>入学：</i>{{model.enteringSchoolDate}}</em>\
                </div>\
            </div>\
            <div class="summary">\
                <label>自我评价</label>\
                <div>{{model.selfEvaluation}}</div>\
                <label>附件照片（学生证）</label>\
                <div class="photo" v-for="item in model.studentCardImg" :style="model.studentCardImg ? \'background-image:url(\' + item + \')\': \'\'">\
                    <em :style="model.studentCardImg ? \'display:none\': \'\'">学生证照片</em>\
                </div>\
            </div>\
        </div>',
        props: ['status', 'model', 'color', 'text'],
        methods: {
            action: function (type) {
                this.$emit('message', type);
            }
        }
    }
});