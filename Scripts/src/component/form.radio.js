define(["utils"], function (utils) {
    var dict = utils.getDict();
    return {
        template: '<dd class="ui-radio-row">\
                        <em v-if="chn">{{chn}}：</em>\
                        <div :class="status == 1 ? \'ui-radio on\' : \'ui-radio\'">\
                            <div class="ui-radio-button" @click="change(1, type)"></div>\
                            <template v-if="type==1">\
                                <input type="number" placeholder="" style="width:60px;" v-model="salary" /><span class="split">元 / </span>\
                                <div class="ui-radio-select">\
                                    <select v-model=\"time_unit_id\" id="sel">\
                                         <option v-for=\"option in options\" v-bind:value=\"option.value\">\
                                         {{ option.name }}\
                                         </option>\
                                    </select>\
                                    <!--<input type="text" disabled readonly v-model=\"time_unit_id\" id="sel">\
                                    <ul class="selUl">\
                                    <li v-for=\"option in options\" v-bind:value=\"option.value\">\
                                        {{ option.name }}\
                                    </li>\
                                    </ul>-->\
                                    <div class="ui-select" @click="imgClick"></div>\
                                </div>\
                            </template>\
                            <template v-if="type==2">\
                                <span>按提成,按销售额的</span>\
                                <input type="number" v-model="push_money_percent" placeholder="" />\
                                <span>%</span>\
                            </template>\
                        </div>\
                    </dd>\
                    <dd class="ui-radio-row">\
                        <div :class="status == 2 ? \'ui-radio on\' : \'ui-radio\'">\
                            <div class="ui-radio-button" @click="change(2, type,true);"></div>\
                            <template v-if="type==1" >\
                                <b>面议</b>\
                            </template>\
                            <template v-if="type==2">\
                                <span>按奖金,超过</span>\
                                <input type="number" style="width:50px;padding:3px 6px;" v-model="bonus_condition" placeholder="" />\
                                <span style="margin-right:3px;">奖励</span><input style="width:50px;padding:3px 6px;" type="number" v-model="bonus_reward" placeholder="" />\
                                <span>元</span>\
                            </template>\
                        </div>\
                    </dd>',
        props: ['chn', 'type','sar', 'salary', 'time_unit_id', 'push_money_percent', 'bonus_condition', 'bonus_reward', 'salary_type', 'reward_type'],
        data: function () {
            return {
                status:1,
                options: dict["time_unit"] || [],
                showXin:true
            }
        },
        watch:{
            sar:function(newV){
                if(newV){
                    this.change(2, this.type,true);
                }
            },
            reward_type:function(newV){
                if(newV){
                   this.reward_type&&(this.status=this.reward_type);
                }
            }
        },
        created:function(){
            
        },
        methods: {
            imgClick:function(){
                // console.log(this.time_unit_id)
                $("#sel").change(function () {  
                    // console.log(222222)
                });  
                $('#sel').trigger("change");  
            },
            change: function (status, type,showXin) {
                console.log(status)
                console.log(this.status)
                if (type == 1) {
                    this.salary_type = status;
                    if(showXin==1){
                        this.$emit('hide',true);
                    }else{
                        this.$emit('hide',false);
                    }
                     
                } else if (type == 2) {
                    this.reward_type = status;
                }
                this.status = status;
            }
        }
    }
});