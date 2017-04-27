define(function () {
    return {
        template: '<div :class="type==\'register\'?\'ui-button register\':\'ui-button\'"><button type="button" @click="submit()">{{text}}</button></div>',
        props: ['text', 'type'],
        methods: {
            submit: function () {
                this.$emit('message');
            }
        }
    }
});