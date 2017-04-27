define(function () {
    return {
        template: '<div class="ui-upload" :style="\'background-image:url(\'+(progress?\'../Images/loading.gif\':\'\')+\')\'">\
            <img v-if="model" :src="model" alt="" />\
            <input class="upload-file" type="file" @change="upload" />\
            <em v-if="!model && !progress">{{text}}</em>\
        </div>',
        props: ['model', 'text'],
        data: function () {
            return {
                progress: 0
            }
        },
        methods: {
            upload: function (e) {
                var me = this;
                this.progress = 1;
                $.utils.upload(2, e.target.files, function (status, result) {
                    if (status == "2") {
                        me.model = result.data.fileUrl;
                        me.progress = 0;
                    }
                });
            }
        }
    }
});