define(["comdate"], function (comdate) {
    return {
        template: '<em v-if=\"chn\">{{chn}}：</em>\
                   <input class="date" type="text" v-model=\"model\" readonly="readonly" :placeholder=\"placeholder\" @click="show" />\
                   <div class="ui-select"></div>',
        props: ['chn', 'model', 'placeholder', 'theme'],
        methods: {
            show: function () {
                var me = this;
                // console.log(this.theme)
                
                new comdate({ theme: this.theme || "date" }, function (str) {
                    if(me.theme=='time'){
                        me.model=str;
                    }else {
                        var data = str.split('-');
                        if (!data || !data.length || data.length < 3) return;
                        var year = data[0];
                        var month = Number(data[1]);
                        var day = Number(data[2]);
                        me.model = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
                    }
                });
            }
        }
    }
});