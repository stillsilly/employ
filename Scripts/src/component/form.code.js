define(function () {
    return {
        template: '<div v-bind:class="status == \'disabled\' ? \'ui-code ui-code-disabled\' : \'ui-code\' ">\
                       <div class=\"ui-input\">\
                            <input :type="type ||\'text\'" v-model=\"model\" :placeholder=\"placeholder\" />\
                            <i class=\"ui-input-close\" @click="clear()"></i>\
                       </div>\
                       <button type=\"button\" @click="submit()">{{text}}</button>\
                   </div>',
        props: ['model', 'placeholder', 'text', 'status','type'],
        methods: {
            clear: function () {
                this.model = "";
            },
            submit: function () {
                if (this.status == "disabled") return;
                this.$emit('message');
            }
        }
    }
});