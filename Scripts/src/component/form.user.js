define(function () {
    return {
        template: '<div v-if="type==1" class="info">\
            <div class="ui-icon-user">\
                <div class="head" @click="jump()" :style="\'background-image:url(\'+src+\')\'"></div>\
                <b>{{model}}</b>\
                <em>{{role}}</em>\
            </div>\
        </div>\
        <div v-if="type==2" class="info" style="padding:0;">\
            <div class="ui-icon-user" style="padding:15px 0 ">\
                <div class="head" :style="\'background-image:url(\'+src+\');\'+\'margin:0 auto;\'+\'position:relative;\'">\
                <input class="upload-file" style="width:80px;height:111px;" type="file" @change="upload" /></div>\
                <b style="margin-top:8px;font-weight:normal;opacity:.8;">更换头像</b>\
                <em>{{role}}</em>\
            </div>\
        </div>',
        props: ['model', 'type', 'role', 'src'],
        methods: {
            jump: function () {
                this.$emit('message');
            },
            upload: function (e) {
                var me = this;
                $.utils.upload(1, e.target.files, function (status, result) {
                    if (status == "2") {
                        me.src = result.data.fileUrl;
                        $.utils.ajax({
                            url: "/common/headimg/change",
                            data: { typeID: 2, new_header_img: result.data.fileUrl },
                            type: "GET",
                            success: function (data, result) {
                                $.poptips("头像更换成功");
                            },
                            error: function () {
                                $.poptips("头像更换失败");
                            }
                        })
                    }
                });
            }
        }
    }
});