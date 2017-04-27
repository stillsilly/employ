define(["utils"], function (utils) {
    var dict = utils.getDict();
    var data = dict.mystore || [];
    function getStore(province_id, city_id, region_id, system_id) {
        var result = [];
        for (var i = 0; i < data.length; i++) {
            if (/^1[0-3]0000/.test(data[i].cityID)) {
                if (data[i].cityID == province_id && data[i].regionID == city_id && data[i].systemID == system_id) {
                    if (data[i].cityID == '100000' || data[i].cityID=='110000'||data[i].cityID=='120000'||data[i].cityID=='130000'){
                        result.push(data[i]);
                    } else if (data[i].regionID == region_id) {
                        result.push(data[i]);
                    }
                }
            } else {//&& data[i].regionID == region_id//&& data[i].regionID == region_id
                if (data[i].cityID == city_id && data[i].systemID == system_id) {
                    if (data[i].cityID == '100000' || data[i].cityID=='110000'||data[i].cityID=='120000'||data[i].cityID=='130000'){
                        result.push(data[i]);
                    } else if (data[i].regionID == region_id) {
                        result.push(data[i]);
                    }
                    
                }
            }
        }
        return result;
    }
    return {
        template: '<em v-if=\"chn\">{{chn}}：</em>\
                   <select v-if=\"dict\" v-model=\"model\" @change="change">\
                       <option v-for=\"option in options\" v-bind:value=\"option.value\">\
                        {{ option.name }}\
                       </option>\
                   </select>\
                   <div class="ui-select"></div>',
        props: ['chn', 'model', 'dict', 'province_id', 'city_id', 'region_id', 'system_id', 'address'],
        data: function () {
            return {
                options: []
            }
        },
        events: {
            'system-broadcast': function (system_id) {
                this.model = -1;
                this.options = getStore(this.province_id, this.city_id, this.region_id, system_id);
            },
            'city-broadcast': function (store_id) {
                this.model =store_id|| -1;
                this.options = getStore(this.province_id, this.city_id, this.region_id, this.system_id);
            }
        },
        methods: {
            change: function () {
                if (!this.options || !this.options.length || !this.model) return;

                for (var i = 0; i < this.options.length; i++) {
                    if (this.options[i].value == this.model) {
                        this.address = this.options[i].address;
                    }
                }
            }
        }
    }
});