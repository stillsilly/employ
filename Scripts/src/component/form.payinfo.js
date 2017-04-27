define(function () {
    return {
        template: '<div class="ui-pay-hd">\
            <div>人员匹配</div>\
            <ul>\
                <li><em>招聘人数：</em>{{number || 0}}人</li>\
                <li><em>到岗人数：</em>{{work_number || 0}}人</li>\
            </ul>\
        </div>',
        props: ['number', 'work_number'],
        methods: {

        }
    }
});