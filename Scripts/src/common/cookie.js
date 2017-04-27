define(function () {
    var cookie = {
        // 功能描述：获取cookie
        get: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            return arr = document.cookie.match(reg) ? unescape(arr[2]) : null;
        },

        // 功能描述：设置cookie
        set: function (name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
        },

        // 功能描述：移除cookie
        remove: function () {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.get(name);
            if (cval != null) {
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        }
    }

    return cookie;
});