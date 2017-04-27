define(function () {
    return {
        template: '<div class="ui-module-sign">\
            <dl>\
                <dt><em>签到时间：</em>{{model.signTime}}</dt>\
                <dd v-for="img in imgs" :style="\'background-image:url(\'+img+\')\'"><em v-if="!img">照片</em></dd>\
            </dl>\
        </div>',
        props: ['model', 'placeholder'],
        data: function () {
            var imgs = [];
            if (this.model && this.model.signImg) {
                if (typeof this.model.signImg == "string") {
                    imgs.push(this.model.signImg);
                } else {
                    var list = JSON.parse(this.model.signImg);
                    for (var item in list) {
                        imgs.push(list[item]);
                    }
                }
            }
            return {
                imgs: imgs
            }
        },
        methods: {

        }
    }
});