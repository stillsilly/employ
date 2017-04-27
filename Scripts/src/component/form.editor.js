define(function () {
    var module = function (field) {
        this.field = field || {};
        this.container = field.container;
        this.init();
    }

    module.prototype = {
        ue: null,
        container: null,
        field: {},

        // 功能描述：初始化
        init: function () {
            this.load();
            this.event();
        },

        // 功能描述：加载
        load: function () {
            var html = "<dd class=\"ui-form-row ui-form-text\"><em>" + this.field.chn + (this.field.checked ? "<sup>*</sup>" : "") + "</em><script id=\"" + this.field.id + "\" type=\"text/plain\" style=\"max-width:800px;width:100%;height:auto;\">" + this.field.value + "</script></dd>";
            this.container.append(html);
        },
        
        // 功能描述：事件
        event: function () {
            var me = this;
            $.utils.ajax({
                url: "/resources/uetoken?category=1",
                success: function (result) {
                    me.ue = UE.getEditor(me.field.id, {
                        readonly: me.field.read == 1,
                        toolbars: [$.config.toolbar]
                    });
                    me.ue.ready(function () {
                        me.ue.execCommand('serverparam', {
                            'token': result.token
                        });
                    });
                }
            });
        },

        // 功能描述：事件
        getVal: function () {
            return this.field.getVal ? this.field.getVal() : this.ue.getContent() || "";
        },

        // 功能描述：校验数据
        check: function () {
            var val = this.getVal() || "";
            if (!val || val == "") {
                this.ue.focus();
                $.poptips("请输入：" + this.field.chn);
                return false;
            }
            return true;
        }
    }

    return module;
});