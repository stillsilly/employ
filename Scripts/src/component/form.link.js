define(function () {
    return {
        template: '{{chn}}<a href="javascript:void();" :class="class" @click="jump">{{text}}</a>',
        props: ['chn','href', 'class', 'text'],
        methods: {
            jump: function(){
                $.jump(this.href);
            }
        }
    }
});