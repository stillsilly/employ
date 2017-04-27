({     
    baseUrl: './src',  
    dir: './dest',
    name: 'boot',
    fileExclusionRegExp: /^(r|build|swiper)\.js$/,
    optimizeCss: 'standard',
    optimize: 'uglify',
    removeCombined: true,
    paths: {
        zepto: 'lib/zepto.min',
        iscroll: 'lib/iscroll',
        iscroll_extend: 'lib/iscroll-extend',
        swiper: 'empty:',

        config: 'common/config',
        utils: 'common/utils',
        service: 'common/service',

        nav: 'component/nav',
        component: 'component/component'
    }
    //node r.js -o build.js paths.kindeditor=empty: paths.jquery=empty: paths.ztree=empty:
}) 