define(["utils"], function (utils) {
    var dict = utils.getDict();
    return {
        template: '<em v-if=\"chn\">{{chn}}：</em>\
                   <select v-if=\"dict\" v-model=\"model\">\
                       <option v-for=\"option in options\" v-bind:value=\"option.value\">\
                        {{ option.name }}\
                       </option>\
                   </select>\
                   <template v-else>\
                   <textarea style="resize:none;" v-if=\"textarea\" v-model=\"model\" :disabled="disabled" :readonly="disabled" :placeholder=\"placeholder\" ></textarea>\
                   <input v-else :type="type || \'text\'" v-model=\"model\" :placeholder=\"placeholder\" />\
                   </template>\
                   <div v-if=\"dict || tips\" :class="dict ? \'ui-select\' : \'ui-tips\'">{{tips}}</div>',
        props: ['chn', 'model', 'placeholder','disabled', 'dict', 'tips', 'textarea', 'type', 'province_id', 'city_id', 'region_id', 'system_id'],
        data: function () {
            return {
                options: dict[this.dict] || []
            }
        },
        events: {
            'system-broadcast': function () {
                if (this.dict == "mystore") {
                    
                }
            },
            'city-broadcast': function () {
                if (this.dict == "mystore") {
                    
                }
            }
        },
        methods: {
        }
    }
});