define(function () {
    return {
        template: '<em v-if=\"chn\">{{chn}}：</em>\
                   <input class="date" type="text" v-model=\"model\" readonly="readonly" :placeholder=\"placeholder\" @click="show" />\
                   <div class="ui-select"></div>',
        props: ['chn', 'placeholder', 'model','store_id','system_id','province_id','city_id','region_id','area_id'],
        methods: {
            show: function () {
                window.vm  && 
                    window.vm.$broadcast("showcity-broadcast",
                                        {store_id:this.store_id,
                                         system_id:this.system_id,
                                         province_id:this.province_id,
                                         city_id:this.city_id,
                                         region_id:this.region_id,
                                         area_id:this.area_id
                                        });
            }
        },
        events: {
            showname:function(){
                this.$emit('message','');
            }
        },
        watch:{
            model:function(newV){
                // this.$emit('message','');
            },
            area_id:function(newV){
                window.vm  && 
                    window.vm.$broadcast("showname-broadcast",
                                        {store_id:this.store_id,
                                         system_id:this.system_id,
                                         province_id:this.province_id,
                                         city_id:this.city_id,
                                         region_id:this.region_id,
                                         area_id:this.area_id
                                        });
            }
        }
    }
});