define(function () {
    return {
        template: '<label v-if="type==\'label\'">{{text}}</label>\
                   <div v-if="type==\'tips\'" class="ui-tips">{{text}}</div>\
                   <div v-else>{{text}}</div>',
        props: ['type', 'text'],
        methods: {

        }
    }
});