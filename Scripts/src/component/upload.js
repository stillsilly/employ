define(["plupload"], function () {
    var module = function (option) {
        if (!option || !option.browse_button || !option.container) return;

        this.browse_button = option.browse_button;
        this.container = option.container;
        this.url = option.url || '/upload';
        this.size = option.size;
        this.type = option.type || "image";
        this.callback = option.callback || function () { };
        this.addcallback = option.addcallback;
        this.option = option;
        this.init();
    };
    module.prototype = {
        browse_button: null,
        container: null,
        url: null,
        uploader: null,
        voduploader:null,
        size: null,
        type: null,

        // 功能描述：初始化
        init: function () {
            var me = this;
            $.utils.ajax({
                url: '/resources/' + (this.type == "image" ? "ossimagetoken" : "ossvideotoken"),
                success: function (result) {
                    me.load(result);
                }
            });
        },

        // 功能描述：视频
        video:function(result){
            this.voduploader = new VODUpload({
                // 文件上传失败
                'onUploadFailed': function (fileName, code, message) {
                    console.log("onUploadFailed: " + fileName + code + "," + message);
                },
                // 文件上传完成
                'onUploadSucceed': function (fileName) {
                    console.log("onUploadSucceed: " + fileName);
                },
                // 文件上传进度
                'onUploadProgress': function (fileName, totalSize, uploadedSize) {
                    console.log("file:" + fileName + ", " + totalSize, uploadedSize, "percent:", Math.ceil(uploadedSize * 100 / totalSize));
                },
                // token超时
                'onUploadTokenExpired': function (callback) {
                    console.log("onUploadTokenExpired");
                }
            });

            this.voduploader.init(result.accessid, result.accesssecret, result.securitytoken, result.expire);
        },

        // 功能描述：加载
        load: function (result) {
            var me = this;
            var obj = $("#" + me.browse_button);
            this.uploader = new plupload.Uploader({
                runtimes: 'html5,flash,silverlight,html4',
                browse_button: this.browse_button,
                multi_selection: false,
                container: document.getElementById(this.container),
                flash_swf_url: '/scripts/src/lib/plupload-2.1.2/js/Moxie.swf',
                silverlight_xap_url: '/scripts/src/lib/plupload-2.1.2/js/Moxie.xap',
                url: result.host,

                multipart_params: {
                    Filename: "${filename}",
                    OSSAccessKeyId: result.accessid,
                    key: result.dir + "${filename}",
                    policy: result.policy,
                    signature: result.signature,
                    success_action_status: "200",
                    callback: result.callback,
                },

                init: {
                    PostInit: function () {
                        //document.getElementById('ossfile').innerHTML = '';
                        //document.getElementById('btn_img').onclick = function () {
                        //    set_upload_param(uploader, '', false);
                        //    return false;
                        //};
                    },

                    FilesAdded: function (up, files) {
                        //plupload.each(files, function (file) {
                        //    document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                        //    + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                        //    + '</div>';
                        //});
                        if (me.type == "image") {
                            obj.attr("src", "/images/loding.gif");
                            up.start();
                        } else {
                            //
                            var file = files[0].getNative();
                            if (!me.voduploader) {
                                var script = document.createElement("script");
                                script.onload = function () {
                                    me.video(result);
                                    me.voduploader.addFile(file, result.host, result.bucket, file.name, "");
                                    me.voduploader.startUpload();
                                }
                                script.src = "/Scripts/src/lib/aliyun-sdk.js";
                                document.getElementsByTagName('head')[0].appendChild(script);
                            } else {
                                me.voduploader.addFile(file, result.host, result.bucket, file.name, "");
                                me.voduploader.startUpload();
                            }
                        }
                    },

                    BeforeUpload: function (up, file) {
                        //check_object_radio();
                        //get_dirname();
                        //set_upload_param(up, file.name, true);
                    },

                    UploadProgress: function (up, file) {
                        //var d = document.getElementById(file.id);
                        //d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                        //var prog = d.getElementsByTagName('div')[0];
                        //var progBar = prog.getElementsByTagName('div')[0]
                        //progBar.style.width = 2 * file.percent + 'px';
                        //progBar.setAttribute('aria-valuenow', file.percent);
                    },

                    FileUploaded: function (up, file, info) {
                        try {
                            if (info.status == 200) {
                                info = JSON.parse(info.response);
                                me.FileUploaded(me, obj, up, file, info.data);
                            }
                            else {
                                //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    },

                    Error: function (up, err) {
                        //document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
                    }
                }
            });

            // 初始化uploader
            this.uploader.init();
        },

        // 功能描述：完成
        FileUploaded: function (me, obj, up, file, info) {
            var category = 1;
            var obj = $("#" + me.browse_button);
            var fullUrl = info.url;
            switch (me.type) {
                case "image":
                    obj.data("url", fullUrl);

                    // 图片缩放
                    //var ext = "imageMogr2/thumbnail/!30p";
                    //if (/\.tiff|\.tif/gi.test(fullUrl)) {
                    //    ext = "imageMogr2/format/jpg|" + ext;
                    //}

                    //fullUrl += "?"+ext;

                    var img = new Image();
                    img.onload = function () {
                        obj.attr("src", fullUrl);
                    }
                    img.src = fullUrl;
                    category = 1;
                    break;
                case "file":
                    if (me.addcallback) {
                        me.addcallback(fullUrl);
                    } else {
                        obj.html(file.name);
                        obj.data("url", fullUrl);
                        category = 2;
                    }
                    break;
            }

            me.callback("success", fullUrl);

            //// 上传记录到resource
            //var data = {
            //    category: category,
            //    name: file.name,
            //    key: url,
            //    url: fullUrl
            //}
            //$.utils.ajax({
            //    url: "/resources",
            //    data: JSON.stringify(data),
            //    type: "POST",
            //    success: function () {
            //        me.callback("success", data);
            //    },
            //    error: function () {
            //        me.callback("error", data);
            //    }
            //});
        }
    }

    return module;
});