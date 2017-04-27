define(["utils"], function (utils) {
    var dict = utils.getDict();
    return {
        template: '<em v-if=\"chn\">{{chn}}：</em>\
                   <select v-model=\"model\" @change="change">\
                       <option v-for=\"option in options\" v-bind:value=\"option.value\">\
                        {{ option.name }}\
                       </option>\
                   </select>\
                   <div class="ui-select"></div>',
        props: ['chn', 'model'],
        data: function () {
            return {
                options: dict["mysystem"] || []
            }
        },
        methods: {
            change: function () {
                window.vm && window.vm.$broadcast("system-broadcast", this.model);
            }
        },
        watch:{
          model:function(newV){
            this.$emit('sys',newV);
          }
        }
    }
});