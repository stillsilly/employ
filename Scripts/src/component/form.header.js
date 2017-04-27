define(function () {
	return {
		template: '<div :class="transparent ? \'ui-head ui-head-transparent\' : \'ui-head\'">\
						<i class="iconfont icon-left" @click="back()"></i>\
						{{title}}\
                        <a v-if="right" href="javascript:void();" @click="jump()">{{right}}</a>\
					</div>',
		props: ['title', 'transparent', 'right', 'url'],
		methods: {
			back: function () {
				window.history.back();
			},
			jump: function () {
			    if (this.url) {
			        $.jump(this.url);
			    } else {
			        this.$emit('message');
			    }
			}
		},
	}
});