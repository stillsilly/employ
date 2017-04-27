define(function () {
    var utils = {
        // 功能描述：是否是Email
        isEmail: function (str) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
        },

        // 功能描述：是否为有效的用户名
        isUserName: function (str) {
            return /^[\u0391-\uFFE5A-Za-z-_0-9]{1,20}$/.test(str);
        },

        // 功能描述：是否为有效的用户名或密码（以字母开头，长度在6~18之间，只能包含字符、数字和下划线）
        isUserNameOrPassword: function (str) {
            return /\w{6,20}/.test(str);
        },

        // 功能描述：是否为有效的手机号码、电话号码
        isTelphone: function (tel) {
            var result = false;
            if (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel)) {
                result = true;
            } else if (/^1[34578]\d{9}$/.test(tel)) {
                result = true;
            }
            return result;
        },

        // 功能描述：获取URL参数
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return (unescape(r[2])); return;
        },

        // 功能描述：获取url的json字符串
        getQueryJSON: function () {
            var search = window.location.search || "";
            if (!search) return null;

            search = search.substr(1).split('&');
            var result = {};
            for (var i = 0; i < search.length; i++) {
                if (!search[i]) continue;
                var temp = search[i].split('=');
                if (!temp || temp.length != 2) continue;

                result[temp[0]] = temp[1];
            }

            return result;
        },

        // 功能描述：数字格式化
        toThousands: function (num, w, format) {
            w = isNaN(w) ? 100000 : w;
            format = format == false ? false : true;
            if (num >= w && format) {
                return Math.floor(num / 10000) + "<s>w+</s>";
            }
            return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        },

        // 功能描述：新闻审核
        checked: function (id, status, cb) {
            $.utils.ajax({
                url: "/news/" + id + "/audit",
                data: JSON.stringify({ status: status }),
                type: "put",
                success: function (result) {
                    cb && cb(result)
                }
            });
        },

        // 功能描述：ajax
        ajax: function (option) {
            if (!option || !option.url) return;
            var data = option.data || {};
            if (!data.app_id) {
                data.app_id = window.localStorage.getItem("app_id");
                data.header_img = window.localStorage.getItem("header_img")
            }
            $.ajax({
                url: $.config.getServiceUrl(option.url, option.bu),
                data: option.type == "GET" ? data : JSON.stringify(data),
                type: option.type || "POST",
                dataType: "json",
                contentType: "application/json; charset=UTF-8",
                async: option.async === false ? false : true,
                success: function (result) {
                    result = result || { errmsg: "服务返回为空" };
                    if (result.status == 0) {
                        option.success(result.data, result);
                    } else {
                        $.poptips(result.errmsg);
                        if ($.isFunction(option.error)) {
                            option.error(1, result.errmsg);
                        }
                    }
                },
                error: function (e) {
                    $.poptips(e.message || "网络异常，请重试！");
                    if ($.isFunction(option.error)) {
                        option.error(0, e);
                    }
                }
            });
        },

        // 功能描述：上传
        upload: function (type, files, cb) {
            if (!type || !files || !files.length) return;

            var fileObj = files[0];
            var xhr = new XMLHttpRequest();
            var url = $.config.getServiceUrl("/common/upload");
            var fd = new FormData();
            fd.append("app_id", window.localStorage.getItem("app_id"));
            fd.append("header_img", window.localStorage.getItem("header_img"));
            fd.append("type", type);
            fd.append("file", fileObj);
            fd.append("acttime", new Date().toString());
            xhr.open("POST", url, true);
            xhr.send(fd);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var text = xhr.responseText;
                    var result = text ? JSON.parse(text) : null;
                    cb && cb("2", result);
                }
            }
            xhr.upload.onprogress = function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    cb && cb("1", result);
                }
            };
        },

        // 功能描述：打开模态对话框
        showDialog: function (url) {
            var width = 660, height = 420;
            if (document.all) //IE  
            {
                feature = "dialogWidth:" + width + "px;dialogHeight:" + height + "px;status:no;help:no";
                window.showModalDialog(url, null, feature);
            } else {
                var awidth = 660;       //窗口宽度,需要设置  
                var aheight = 420;         //窗口高度,需要设置   
                var atop = (screen.availHeight - aheight) / 2;  //窗口顶部位置,一般不需要改  
                var aleft = (screen.availWidth - awidth) / 2;   //窗口放中央,一般不需要改  
                var param0 = "scrollbars=0,status=0,menubar=0,resizable=no,location=0,modal=yes"; //新窗口的参数  
                var params = "top=" + atop + ",left=" + aleft + ",width=" + awidth + ",height=" + aheight + "," + param0;
                var win = window.open(url, "视频上传", params); //打开新窗口  
                win.focus(); //新窗口获得焦点
            }
        },

        // 功能描述：转换
        translate: function (tpl, data) {
            if (!data || !data.length) return;

            var html = [];
            for (var i = 0; i < data.length; i++) {
                var temp = tpl;
                for (var m in data[i]) {
                    var reg = new RegExp("##" + m + "##", "gi");
                    temp = temp.replace(reg, data[i][m]);
                }
                html.push(temp);
            }

            return html.join("");
        },

        // 功能描述：下载文件
        download: function (url) {
            url = $.config.getFilesUrl(url);
            window.open(url, "_blank");
        },

        // 功能描述：设置值
        setItem: function (key, data) {
            if (window.localStorage) {
                window.localStorage.setItem(key, data);
            }
        },

        // 功能描述：提取值
        getItem: function (key) {
            if (!key) return;

            var data = null;
            if (window.localStorage) {
                data = window.localStorage.getItem(key);
            }
            return data;
        },

        // 功能描述：阻止事件扩散
        stopEvent: function (e) {
            utils.stopPropagation(e);
            utils.preventDefault(e);
            return false;
        },

        // 功能描述：阻止事件冒泡
        stopPropagation: function (e) {
            //如果提供了事件对象，则这是一个非IE浏览器
            if (e && e.stopPropagation)
                //因此它支持W3C的stopPropagation()方法
                e.stopPropagation();
            else
                //否则，我们需要使用IE的方式来取消事件冒泡 
                window.event.cancelBubble = true;
            return false;
        },

        // 功能描述：阻止默认行为
        preventDefault: function (e) {
            if (e && e.preventDefault)
                //阻止默认浏览器动作(W3C) 
                e.preventDefault();
            else
                //IE中阻止函数器默认动作的方式 
                window.event.returnValue = false;
            return false;
        },

        // 功能描述：加载图片
        loadImg: function (obj) {
            var src = obj && obj.data("src") || "";
            if (!src) return;

            var img = new Image();
            img.onload = function () {
                obj.attr("src", src);
            }
            img.src = src;
        },

        // 功能描述：加载所有图片
        loadImgFull: function (container) {
            if (typeof container == "string") {
                container = $(container);
            }
            if (!container || !container.find("img").length) return;

            var me = this;
            container.find("img").each(function () {
                me.loadImg($(this));
            });
        },

        // 功能描述：canvas截图
        cutImage: function (src) {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.crossOrigin = "*";
            img.src = src;
            canvas.height = 80;
            canvas.width = 80;
            ctx.drawImage(img, 175, 175, 80, 80, 0, 0, 80, 80);
            var str = canvas.toDataURL();
            console.log(str);
            return str;
        },

        // 功能描述：设置title
        setTitle: function (title) {
            document.title = title;
            var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                var $body = $('body');
                var $iframe = $('<iframe src="/favicon.ico"></iframe>');
                $iframe.on('load', function () {
                    setTimeout(function () {
                        $iframe.off('load').remove();
                    }, 0);
                }).appendTo($body);
            }
        },

        // 功能描述：跳转
        jump: function (url) {
            return "";
        },

        // 功能描述：格式化
        format: function (date, format) {
            if (!date) return;

            date = typeof date == "string" ? new Date(date.replace(/-/g, "/")) : date;
            var map = {
                "M": date.getMonth() + 1, //月份 
                "d": date.getDate(), //日 
                "h": date.getHours(), //小时 
                "m": date.getMinutes(), //分 
                "s": date.getSeconds(), //秒 
                "q": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
                var v = map[t];
                if (v !== undefined) {
                    if (all.length > 1) {
                        v = '0' + v;
                        v = v.substr(v.length - 2);
                    }
                    return v;
                }
                else if (t === 'y') {
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        },

        //功能描述：判断是否为Null或空
        isNullOrEmpty: function (str) {
            return !str || str == null || str == "";
        },

        //功能描述：替换全部
        replaceAll: function (strSource, strTarget, strReplace) {
            strSource = strSource || "";
            var reg = RegExp(strTarget, "g");
            return strSource.replace(reg, strReplace);
        },

        //功能描述：获取图片
        getImageAblum: function (url, size) {
            if (!url) return;
            return url + "?x-oss-process=image/resize,w_" + (size ? size : '120');
        },

        // 功能描述：深度克隆
        clone: function (obj, ext) {
            var clone = function (obj) {
                var o;
                if (typeof obj == "object") {
                    if (obj === null) {
                        o = null;
                    } else {
                        if (obj instanceof Array) {
                            o = [];
                            for (var i = 0, len = obj.length; i < len; i++) {
                                if ($.inArray(j, ext) == -1) {
                                    o.push(clone(obj[i]));
                                }
                            }
                        } else {
                            o = {};
                            for (var j in obj) {
                                if ($.inArray(j, ext) == -1) {
                                    o[j] = clone(obj[j]);
                                }
                            }
                        }
                    }
                } else {
                    o = obj;
                }
                return o;
            }

            return clone(obj);
        },

        // 功能描述：获取头像
        getHead: function (url) {
            return url || "data:image/jpg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/4QR0RXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAcAAAAcgEyAAIAAAAUAAAAjodpAAQAAAABAAAApAAAANAACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTMyBXaW5kb3dzADIwMTY6MDg6MDkgMDk6NTI6NDkAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAATqADAAQAAAABAAAATgAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEAAgAAAgEABAAAAAEAAAEuAgIABAAAAAEAAAM+AAAAAAAAAEgAAAABAAAASAAAAAH/2P/gABBKRklGAAECAABIAEgAAP/tAAxBZG9iZV9DTQAB/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgATgBOAwEiAAIRAQMRAf/dAAQABf/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A9HSSSSUpJJJJSkkkklKSSSSUpJJJJT//0PR0kkklKUXuDGlx4Ckg5RHouE6nj70lNR19zjO4j4aKdOS9rgHnc08z2QEkVOqkmBBEgyPEJ0FKSSSSU//R9HSSSSUpByaTY0Fv0moyZzmtEuIA80lOWnYxz3BreSpXFjrXFn0Twi4j62OdvIBMQSiptVs2MDPBTTAg6hOgpSSSSSn/0vR0kkklNTJyHtfsYYjkqsSXGSZPiVauxbLLC8EQY5nw+Ch9it8W/j/ckprpKx9it8W/j/cl9it8W/j/AHIqQte9n0SQruNc61p3fSb3QPsVvi38f7kbGpfVu3EHdER5IKTpJJJKf//T9HSSSSUpJJJJSkkkklKSSSSUpJJJJT//2f/tCUZQaG90b3Nob3AgMy4wADhCSU0EJQAAAAAAEAAAAAAAAAAAAAAAAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAgBIAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAB4OEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNBAoAAAAAAAEAADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAE4QklNBAIAAAAAAAQAAAAAOEJJTQQwAAAAAAACAQE4QklNBC0AAAAAAAYAAQAAAAI4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADPwAAAAYAAAAAAAAAAAAAAE4AAABOAAAABWcqaAeYmAAtADEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAE4AAABOAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABu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ME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM2IDQ2LjI3NjcyMCwgTW9uIEZlYiAxOSAyMDA3IDIyOjQwOjA4ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eGFwTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiB4YXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzMgV2luZG93cyIgeGFwOkNyZWF0ZURhdGU9IjIwMTYtMDgtMDlUMDk6NTI6NDkrMDg6MDAiIHhhcDpNb2RpZnlEYXRlPSIyMDE2LTA4LTA5VDA5OjUyOjQ5KzA4OjAwIiB4YXA6TWV0YWRhdGFEYXRlPSIyMDE2LTA4LTA5VDA5OjUyOjQ5KzA4OjAwIiB4YXBNTTpEb2N1bWVudElEPSJ1dWlkOjQ1RTE4NkUwRDM1REU2MTE5RkM4QzE0NkI2MzQxOEY3IiB4YXBNTTpJbnN0YW5jZUlEPSJ1dWlkOjQ2RTE4NkUwRDM1REU2MTE5RkM4QzE0NkI2MzQxOEY3IiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHBob3Rvc2hvcDpIaXN0b3J5PSIiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6WFJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpZUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOlJlc29sdXRpb25Vbml0PSIyIiB0aWZmOk5hdGl2ZURpZ2VzdD0iMjU2LDI1NywyNTgsMjU5LDI2MiwyNzQsMjc3LDI4NCw1MzAsNTMxLDI4MiwyODMsMjk2LDMwMSwzMTgsMzE5LDUyOSw1MzIsMzA2LDI3MCwyNzEsMjcyLDMwNSwzMTUsMzM0MzI7N0MzQTU3NUUzMUQ5MjAwNzU5N0ZGNTk3OUFDMjU3OUYiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI3OCIgZXhpZjpQaXhlbFlEaW1lbnNpb249Ijc4IiBleGlmOkNvbG9yU3BhY2U9IjEiIGV4aWY6TmF0aXZlRGlnZXN0PSIzNjg2NCw0MDk2MCw0MDk2MSwzNzEyMSwzNzEyMiw0MDk2Miw0MDk2MywzNzUxMCw0MDk2NCwzNjg2NywzNjg2OCwzMzQzNCwzMzQzNywzNDg1MCwzNDg1MiwzNDg1NSwzNDg1NiwzNzM3NywzNzM3OCwzNzM3OSwzNzM4MCwzNzM4MSwzNzM4MiwzNzM4MywzNzM4NCwzNzM4NSwzNzM4NiwzNzM5Niw0MTQ4Myw0MTQ4NCw0MTQ4Niw0MTQ4Nyw0MTQ4OCw0MTQ5Miw0MTQ5Myw0MTQ5NSw0MTcyOCw0MTcyOSw0MTczMCw0MTk4NSw0MTk4Niw0MTk4Nyw0MTk4OCw0MTk4OSw0MTk5MCw0MTk5MSw0MTk5Miw0MTk5Myw0MTk5NCw0MTk5NSw0MTk5Niw0MjAxNiwwLDIsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMjAsMjIsMjMsMjQsMjUsMjYsMjcsMjgsMzA7RUY5NTlFODg4OTBCOEI3QUM5NjNDNDQwNDgxNTdENEIiPiA8eGFwTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0idXVpZDo0NEUxODZFMEQzNURFNjExOUZDOEMxNDZCNjM0MThGNyIgc3RSZWY6ZG9jdW1lbnRJRD0idXVpZDo0NEUxODZFMEQzNURFNjExOUZDOEMxNDZCNjM0MThGNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZ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";
        },

        // 功能描述：获取账户
        getAccountId: function () {
            var data = window.localStorage.getItem("UserInfo");
            if (!data) {
                $.jump("/Login");
                return;
            }
            try {
                data = JSON.parse(data);
                return data.id;
            } catch (e) {
                console.log(e);
            }
        },

        // 功能描述：获取创建时间
        getCurrentDate: function () {
            return this.format(new Date(), "yyyy-MM-dd hh:mm:ss");
        },

        // 功能描述：打开窗口
        openWindow: function (url, name, iWidth, iHeight) {
            var url; //转向网页的地址;
            var name; //网页名称，可为空;
            var iWidth; //弹出窗口的宽度;
            var iHeight; //弹出窗口的高度;
            //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
            var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
            var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
            window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
        },
        randomString: function (len) {
            len = len || 32;
            var chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var maxPos = chars.length;
            var pwd = '';
            for (i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        },
        getDict: function () {
            var dict = window.localStorage.getItem("dict");
            dict = dict ? JSON.parse(dict) : {};
            dict.interview = [
                { value: "1", name: "需要" },
                { value: "2", name: "不需要" }
            ];
            return dict;
        }
    }
    return utils;
});
