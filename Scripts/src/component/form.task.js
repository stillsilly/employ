define(function () {
    return {
        template: '<div class="ui-card ui-card-task">\
            <h3>任务描述</h3>\
            <ul>\
                <li><em>工作日期：</em>{{model.taskInfo.startDate}} 至 {{model.taskInfo.endDate}}</li>\
                <li><em>上班时间：</em>{{model.taskInfo.workHours}} - {{model.taskInfo.offHours}}</li>\
                <li><em>薪资：</em>{{model.taskInfo.salary}}<br/>{{model.taskInfo.salaryDetail}}</li>\
                <li><em>工作地点：</em>（门店）{{model.taskInfo.storeName}}<br/>（地址）{{model.taskInfo.address}}</li>\
                <li><em>备注：</em>{{model.taskInfo.jobDesc}}</li>\
            </ul>\
            <ul>\
                <li><em>联系人：</em>{{model.taskInfo.contactName}}</li>\
                <li><em>联系电话：</em>{{model.taskInfo.contactmobile}}</li>\
            </ul>\
        </div>',
        props: ['model', 'placeholder'],
        methods: {
            clear: function () {
                this.model = "";
            }
        }
    }
});