define([],function(){var e=function(){this.init()};return e.prototype={pageIndex:1,pageSize:12,init:function(){this.load(),this.event()},load:function(){},event:function(){var e=new Swiper(".swiper-container",{pagination:".swiper-pagination",paginationClickable:!0,loop:!0,autoplay:5e3});$("#btn_community").click(function(){$.dialog({isScroll:!1,title:"温馨提示",content:'<div class="ui-magic"></div><div>神秘建设中... 暂时保密哟~</div>'})}),$.page({url:"/home/getproduct",data:{pageIndex:1,pageSize:2},container:$(".event"),create:function(e){if(!e||isNaN(e.code)||e.code==6)return;var t=[],n=e.data||[];for(var r=0;r<n.length;r++)t.push('<li><a href="#" class="ui-nowrap"><em>王小二</em>记录了<em>无壳双卡样机01</em>产品256</a><i>10分钟前</i></li>');$(".ui-page-more").length>0?$(t.join("")).insertBefore($(".ui-page-more")):$(".event").append(t.join(""))}})}},e});