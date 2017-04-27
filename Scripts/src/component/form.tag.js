define(["utils"], function (utils) {
    var dict = utils.getDict();
    return {
        template: '<em v-if=\"chn\">{{chn}}：</em>\
                   <div class="ui-tab-job clearfix">\
                   <i v-for=\"option in options\" :key=\"option.value\" @click=\"change(option)\" :class=\"option.on?\'on\':\'\' \">{{ option.name }}</i>\
                   </div>',
        props: ['chn', 'model', 'placeholder', 'dict','tag_id'],
        data: function () {
            var options = dict[this.dict] || [];
            for (var i = 0; i < options.length; i++) {
                options[i].on = "";
            }
            return {
                options: options
            }
        },
        watch:{
            tag_id:function(newV){
                if(newV){
                    var arr=newV.split(",");
                    for(var i=0;i<arr.length;i++){
                        for(var r=0;r<this.options.length;r++){
                            if(this.options[r].value==arr[i]){
                                this.change(this.options[r]);
                            }
                        }
                    }
                }
            }
        },
        methods: {
            change: function (option) {
                option.on = option.on ? "" : "on";
                var result = [];
                for (var i = 0; i < this.options.length; i++) {
                    if (this.options[i].on) {
                        result.push(this.options[i].value);
                    }
                }
                this.model = result.join(",");
            }
        }
    }
});