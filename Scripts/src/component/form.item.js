define(function () {
    return {
        template: '<div class="ui-card ui-card-item">\
            <dl v-if=\"type==1\">\
                <dt>职位描述</dt>\
                <dd><em>薪资：</em>{{model.salary}}<br/>{{model.salaryDetail}}</dd>\
                <dd><em>工作日期：</em>{{model.startDate}}至{{model.endDate}}</dd>\
                <dd><em>上班时间：</em>{{model.officeHours}}</dd>\
                <dd><em>职位描述：</em>{{model.jobDesc}}</dd>\
                <dd v-show="model.applyDeadline"><em>截止招聘日：</em>{{model.applyDeadline}}</dd>\
            </dl>\
            <dl v-if=\"type==2\">\
                <dt>联系方式</dt>\
                <dd class="ui-icon-name">{{model.contactName}}</dd>\
                <dd class="ui-icon-phone"><a :href="\'tel:\'+ model.contactmobile">{{model.contactmobile}}</a></dd>\
            </dl>\
        </div>',
        props: ['type', 'model'],
        methods: {
            jump: function () {
                if (!this.url) return;

                $.jump(this.url);
            },
            action: function (type) {
                this.$emit('message', type, this.model.id);
            }
        }
    }
});