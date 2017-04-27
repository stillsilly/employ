define(function () {
    var dict = {
        "job": [
            { value: "1", name: "招聘中" },
            { value: "2", name: "已完成" },
        ]
    };
    return {
        template: '<div class=\"ui-card ui-card-job\">\
            <dl @click="action(4)">\
                <dd class=\"ui-card-job-title\">{{model.requirementName || model.positionName}}<div class=\"right\">{{model.salary}}</div></dd>\
                <dd>\
                    <ul class=\"info\">\
                        <li><div class=\"ui-icon ui-icon-location\">{{model.cityName || model.city|| model.cityID || "暂无"}}</div><div class=\"ui-icon ui-icon-man\" v-show="model.number">{{model.number}}人</div></li>\
                        <li>{{model.storeName}}</li>\
                        <li>{{model.address}}</li>\
                        <li class=\"time\" v-if="!showtime">{{model.startDate}} 到 {{model.endDate}}</li>\
                        <li class=\"time\" v-if="!showtime" v-show="model.applyDeadline">截止招聘日：{{model.applyDeadline}}</li>\
                    </ul>\
                    <div class=\"right\" @click.stop="action(5)">\
                        <div v-if=\"status==1\" class=\"ui-icon-resume\" style="position:relative;width:50px;"><a class="infoTit" v-show="model.receiveResumeNum">{{model.receiveResumeNum}}</a></div>\
                        <em v-if=\"status==2\" :style=\"\'color:\' + color\">{{text}}</em>\
                    </div>\
                </dd>\
            </dl>\
            <div v-show="model.requirementsTagID" class="ui-tab-job clearfix">\
                        <i v-for="item in model.requirementsTagID">{{item}}</i>\
                    </div>\
            <div class=\"ui-card-foot\">\
                <ul v-if=\"status==1\">\
                    <li @click=action(1)>终止招聘</li>\
                    <li @click=action(2)>邀请大使</li>\
                </ul>\
                <div v-if=\"status==2\" @click=action(3)>重新发布</div>\
            </div>\
        </div>',
        props: ['status', 'model', 'color', 'text', 'showtime'],
        data: function () {
            return {
                options: dict["job"] || []
            }
        },//{{model.receiveResumeNum || model.currentApplyNum || 0}}封简历
        methods: {
            action: function (type) {
                this.$emit('message', type, this.model);
            }
        }
    }
});