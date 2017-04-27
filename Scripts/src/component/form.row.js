define(function () {
    return {
        template: '<li v-if="type" @click="jump()">\
            <em v-if="type==1" style="width:90px;">已收到的简历<i v-show="sss">{{content}}</i></em>\
            <div v-if="type==2"><img :src="content" />{{title}}</div>\
        </li>\
        <li v-else @click="jump()">\
        <div :class="icon"><div style="width:60px;height:30px;position:relative;" v-show="infotit"><i class="infoTit">{{infotit}}</i></div>{{title}}</div>\
        <em :class="arrow?\'arrow\':\'\'">{{content}}</em>\
        </li>',
        props: ['icon', 'title', 'content', 'arrow', 'html', 'type', 'href', 'infotit'],
        methods: {
            jump: function () {
                if (this.href) {
                    $.jump(this.href);
                } else {
                    this.$emit('message');
                }
            }
        },
        created:function(){
        }
    }
});