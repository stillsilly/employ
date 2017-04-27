define(function () {
    return {
        template: '<textarea v-if="type==\'textarea\'" :placeholder=\"placeholder\" v-model=\"model\"></textarea>\
                   <div v-else class=\"ui-input\">\
                       <input :type="type || \'text\'" v-model=\"model\" :placeholder=\"placeholder\" />\
                       <i class=\"ui-input-close\" @click="clear()"></i>\
                   </div>',
        props: ['model', 'placeholder', 'type'],
        methods: {
            clear: function () {
                this.model = "";
            }
        }
    }
});