define([],function(){var e=function(){this.data=JSON.parse($("#json_data").val()||""),this.init()};return e.prototype={data:null,init:function(){this.load(),this.event()},load:function(e){var t=this.get_like(this.data.id),n=$(".icon-like");t=="1"&&(n.addClass("on"),n.addClass("icon-favorite").removeClass("icon-like"))},event:function(e){var t=this;$(".ui-article-hd em span .iconfont").click(function(){var e=$(this).data("type")||"";if(!e)return;switch(e){case"like":t.like($(this));break;case"share":t.share($(this))}})},like:function(e){var t=this,n={};n.id=e.data("id")||"",n.like=e.hasClass("on")?"0":"1";var r=e.data("num")||"";r=isNaN(r)?0:Number(r);var i=e.find("s");$.service.SetLike({data:n,callback:function(s){n.like=="0"?(e.removeClass("icon-favorite").addClass("icon-like"),e.removeClass("on"),r--):(e.addClass("icon-favorite").removeClass("icon-like"),e.addClass("on"),r++),t.set_like(n.id,n.like),i.html("点赞("+r+")")}})},set_like:function(e,t){if(window.localStorage)try{var n=window.localStorage.getItem("like");n=n?JSON.parse(n):{},n[e]=t,window.localStorage.setItem("like",JSON.stringify(n))}catch(r){window.localStorage.removeItem("like")}},get_like:function(e){if(window.localStorage){var t=window.localStorage.getItem("like");return t=t?JSON.parse(t):{},t[e]}},share:function(e){e.hasClass("on")?e.removeClass("on"):e.addClass("on")}},e});