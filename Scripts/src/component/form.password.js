define(function () {
    return {
        template: '<div class="ui-password">\
                       <div class=\"ui-input\">\
                            <input :type=\"type\" v-model=\"model\" :placeholder=\"placeholder\" />\
                            <i class=\"ui-input-close\" @click="clear()"></i>\
                       </div>\
                       <div :class="type==\'password\' ? \'ui-eye\' : \'ui-eye open\'" @click="change()"></div>\
                   </div>',
        props: ['model', 'placeholder'],
        data: function () {
            return {
                type: "password"
            }
        },
        methods: {
            clear: function () {
                this.model = "";
            },
            change: function () {
                this.type = this.type == "text" ? "password" : "text"
            }
        }
    }
});