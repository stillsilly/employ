define(function () {
    var dict = {
        "job": [
            { value: "1", name: "招聘中" },
            { value: "2", name: "已完成" },
        ],
        "resume": [
            { value: "1", name: "全部" },
            { value: "2", name: "已通过" },
            { value: "3", name: "待评价" },
        ]
    };
    return {
        template: '<div class=\"ui-tab-menu\">\
            <ul class=\"clearfix\" :style=\"style\">\
                <li v-for=\"option in options\"\
                    :key=\"option.value\"\
                    :class=\"option.value == model ? \'on\' : \'\' \"\
                     @click="change(option.value)" >\
                    {{ option.name }}\
                </li>\
            </ul>\
        </div>',
        props: ['model', 'dict'],
        data: function () {
            return {
                options: dict[this.dict] || [],
                style: "width:" + dict[this.dict].length * 80 + "px"
            }
        },
        methods: {
            change: function (value) {
                this.model = value;
                this.$emit('message',this.model);
            }
        }
    }
});