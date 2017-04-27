define(function () {
    var module = function (obj, getItem, onScroll) {
        this.pullDownEl = obj.find('.pullDown');
        this.pullDownLabel = obj.find('.pullDownLabel');
        this.pullUpEl = obj.find('.pullUp');
        this.pullUpLabel = obj.find('.pullUpLabel');
        this.wrapper = obj[0];
        this.thelist = obj.find(".thelist");
        this.getItem = getItem;
        this.onScroll = onScroll || function (type, $this) { };
        this.init();
    };
    module.prototype = {
        myScroll: null,
        pullDownEl: null,
        pullDownLabel: null,
        pullDownOffset: null,
        pullUpEl: null,
        pullUpLabel: null,
        pullUpOffset: null,
        wrapper: null,
        thelist: null,
        lock: false,
        getItem: function () {
        },

        // 功能描述：加载
        init: function () {
            var me = this;
            me.pullDownOffset = me.pullDownEl[0].offsetHeight;
            me.pullUpOffset = me.pullUpEl[0].offsetHeight;

            // 设置高度
            // $(this.wrapper).height($(window).height() - 43 * 3 - 10);

            me.myScroll = new iScroll(this.wrapper, {
                useTransition: true,
                topOffset: me.pullDownOffset,

                // 功能描述：刷新
                onRefresh: function () {
                    console.log("onRefresh");
                    if (this.lock) return;

                    if (me.pullDownEl.hasClass('pullLoading')) {
                        me.pullDownEl.removeClass('pullLoading').removeClass('flip');
                        me.pullDownLabel.html('下拉刷新页面...');
                    } else if (me.pullUpEl.hasClass('pullLoading')) {
                        me.pullUpEl.removeClass('pullLoading').removeClass('flip');
                        me.pullUpLabel.html('向上拉加载更多...');
                    }
                },

                // 功能描述：正在滑动
                onScrollMove: function () {
                    console.log("onScrollMove");
                    if (this.lock) return;

                    if (this.y > 5 && !me.pullDownEl.hasClass('flip')) {
                        me.pullDownEl.addClass('flip');
                        me.pullDownLabel.html('释放刷新页面...');
                        this.minScrollY = 0;
                    } else if (this.y < 5 && me.pullDownEl.hasClass('flip')) {
                        me.pullDownEl.removeClass('flip');
                        me.pullDownLabel.html('向下拉加载更多...');
                        this.minScrollY = -me.pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !me.pullUpEl.hasClass('flip')) {
                        me.pullUpEl.addClass('flip');
                        me.pullUpLabel.html('释放刷新页面...');
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && me.pullUpEl.hasClass('flip')) {
                        me.pullUpEl.removeClass('flip');
                        me.pullUpLabel.html('向上拉加载更多...');
                        this.maxScrollY = me.pullUpOffset;
                    }

                    me.onScroll("onScrollMove", this);
                },

                // 功能描述：滑动停止
                onScrollEnd: function () {
                    console.log("onScrollEnd");
                    if (this.lock) return;

                    if (me.pullDownEl.hasClass('flip')) {
                        me.pullDownEl.addClass('pullLoading');
                        me.pullDownLabel.html('加载中...');
                        me.pullDownAction();
                    } else if (me.pullUpEl.hasClass('flip')) {
                        me.pullUpEl.addClass('pullLoading');
                        me.pullUpLabel.html('加载中...');
                        me.pullUpAction();
                    }

                    me.onScroll("onScrollEnd", this, me);
                }
            });

            this.thelist.on("click", ".ui-show-item", function (e) {
                var parent = $(this).parent();
                while (!parent.hasClass("ui-module-item")) {
                    parent = parent.parent();
                }
                var ul = parent.find(".ui-module-item-ul");
                var icon = $(this).find(".iconfont");
                if (ul && ul.length > 0) {
                    if (ul.hasClass("ui-hidden")) {
                        ul.removeClass("ui-hidden");
                        icon.removeClass("icon-xia").addClass("icon-shang");
                    } else {
                        ul.addClass("ui-hidden");
                        icon.removeClass("icon-shang").addClass("icon-xia");
                    }
                }
                me.myScroll.refresh();

                if (e && e.preventDefault)
                    //阻止默认浏览器动作(W3C) 
                    e.preventDefault();
                else
                    //IE中阻止函数器默认动作的方式 
                    window.event.returnValue = false;
                return false;
            });
        },

        // 功能描述：向下刷新
        pullDownAction: function () {
            console.log("pullDownAction");

            if (this.lock) return;

            var me = this;
            setTimeout(function () {
                if (typeof me.getItem == "function") {
                    me.getItem(function (html) {
                        me.thelist.append(html || "");
                        me.refresh();
                    }, 1);
                } else {
                    me.refresh();
                }
            }, 1000);
        },

        // 功能描述：向上加载
        pullUpAction: function () {
            console.log("pullUpAction");

            if (this.lock) return;

            this.lock = true;
            var me = this;
            setTimeout(function () {
                if (typeof me.getItem == "function") {
                    me.getItem(function (html) {
                        me.thelist.append(html || "");
                        me.refresh();
                    }, 0);
                } else {
                    me.refresh();
                }
            }, 1000);
        },

        // 功能描述：刷新
        refresh: function (timeout) {
            console.log("refresh");

            var me = this;
            setTimeout(function () {
                me.myScroll.refresh();
                me.lock = false;
            }, timeout || 500);
        },

        // 功能描述：滚动到
        scrollToTop: function () {
            var me = this;
            this.myScroll.scrollTo(0, 0, 300);
            setTimeout(function () {
                me.myScroll.refresh();
            }, 600);
        }
    }

    return module;
})