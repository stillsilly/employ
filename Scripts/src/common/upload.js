define(function () {
    var module = function (option) {
        if (!option || !option.type) return;

        this.type = option.type;
        this.cb = option.cb;
        this.init();
    };
    module.prototype = {
        init: function () {
            this.load();
            this.event();
        },

        load: function () {
            this.myfile = document.getElementById('myfile');
        },

        event: function () {
            var me = this;
            this.myfile.onchange = function () {
                me.upload();
            }
        },

        upload: function (files, ty) {
            var xhr = new XMLHttpRequest();
            var url = $.config.getServiceUrl("/common/upload");
            var fd = new FormData();
            fd.append("app_id", window.localStorage.getItem("app_id"));
            fd.append("header_img", window.localStorage.getItem("header_img"));
            fd.append("type", this.type);
            fd.append("file", fileObj);
            fd.append("acttime", new Date().toString());
            xhr.open("POST", url, true);
            xhr.send(fd);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var result = xhr.responseText;
                    document.getElementById("result").innerHTML = result;
                }
            }
            //进度条部分
            xhr.upload.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    document.getElementById('progress').value = percentComplete;
                    document.getElementById('progressNumber').style.width = percentComplete + "%";
                }
            };
        }
    }

    return module;
});