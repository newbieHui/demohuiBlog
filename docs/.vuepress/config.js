/**
 * Created by DemoHui on 2019/3/5.
 */
module.exports = {
    title: 'DemoHui', // 设置网站标题
    head: [
        ['link', { rel: 'icon', href: 'img/myBlog.png' }]
    ],
    description: '明月装饰了你的窗子，你装饰了别人的梦。', //描述
    dest: './docs/.vuepress/dist',   // 设置输出目录
    port: 8080, //端口
    themeConfig: { //主题配置
        logo: '/img/self.jpg',
        // 添加导航栏
        nav: [
            { text: '主页', link: '/' }, // 导航条
            { text: '前端库', link: '/webLibrary/' },
            { text: '项目库', link: '/projectLibrary/' },
            { text: '随笔库', link: '/essayLibrary/' },
            { text: 'github',link:'https://github.com/newbieHui'}
        ],
        // 为以下路由添加侧边栏
        sidebar:{
            '/webLibrary/': [
                {
                    title: '目录',
                    collapsable: false,
                },
                {
                    title: 'JavaScript',
                    collapsable: true,
                    children: [
                        'jsChildLibrary/prototypeChain',
                        'jsChildLibrary/direction',
                        'jsChildLibrary/closures',
                        'jsChildLibrary/object',
                        'jsChildLibrary/array',
                        'jsChildLibrary/arguments',
                        'jsChildLibrary/commonAlgorithm',
                        'jsChildLibrary/regularExpressions',
                        'jsChildLibrary/dateChange',
                        'jsChildLibrary/jsValid',
                        'jsChildLibrary/codeOptimization',
                    ]
                },
                {
                    title: 'ES6',
                    collapsable: true,
                    children: [
                        'es6ChildLibrary/es6Basis',
                        'es6ChildLibrary/es6Class',
                    ]
                },
                {
                    title: 'TypeScript',
                    collapsable: true,
                    children: [
                        'tsChildLibrary/basicKnowledge',
                    ]
                },
                {
                    title: 'CSS',
                    collapsable: true,
                    children: [
                        'cssChildLibrary/basicKnowledge',
                        'cssChildLibrary/boxModel',
                    ]
                },
                {
                    title: 'Vue',
                    collapsable: true,
                    children: [
                        'vueChildLibrary/basicConcept',
                        'vueChildLibrary/projectConstruction',
                        'vueChildLibrary/npm',
                    ]
                },
                {
                    title: 'Vuex',
                    collapsable: true,
                    children: [
                        'vuexChildLibrary/vuexUseExample',
                    ]
                },
                {
                    title: 'Vue Router',
                    collapsable: true,
                    children: [
                        'vueRouterChildLibrary/routeJumpConveyValue',
                    ]
                },
                {
                    title: 'React',
                    collapsable: true,
                    children: [
                        'reactChildLibrary/reactStart',
                        'reactChildLibrary/redux',
                    ]
                },
                {
                    title: 'webpack',
                    collapsable: true,
                    children: [
                        'webpackChildLibrary/wpBasicConcept',
                        'webpackChildLibrary/wpBasicUse',
                        'webpackChildLibrary/wpCrossDomain',
                    ]
                },
                {
                    title: 'Element-ui',
                    collapsable: true,
                    children: [
                        'elmChildLibrary/elInput',
                        'elmChildLibrary/elUpload',
                        'elmChildLibrary/elTable',
                        'elmChildLibrary/elTree',
                    ]
                },
                {
                    title: 'Axios',
                    collapsable: true,
                    children: [
                        'axiosChildLibrary/axiosBasicConcept',
                    ]
                },
                {
                    title: '跨域',
                    collapsable: true,
                    children: [
                        'domainChildLibrary/crossDomain',
                    ]
                },
                {
                    title: '身份认证',
                    collapsable: true,
                    children: [
                        'authenticationChildLibrary/token',
                        'authenticationChildLibrary/session',
                    ]
                },
                {
                    title: '通信加密',
                    collapsable: true,
                    children: [
                        'encryptionChildLibrary/bilateralEncryption',
                    ]
                },
                {
                    title: '计算机网络',
                    collapsable: true,
                    children: [
                        'networkChildLibrary/http'
                    ]
                },
                {
                    title: '工具库',
                    collapsable: true,
                    children: [
                        'toolChildLibrary/webFrame',
                        'toolChildLibrary/codeTool',
                        'toolChildLibrary/fontEndTool',
                        'toolChildLibrary/studyManual',
                        'toolChildLibrary/interview',
                    ]
                },
            ],
            '/projectLibrary/': [
                {
                    title: '目录',
                    collapsable: false,
                },
                {
                    title: '联盟官网',
                    collapsable: true,
                    children: [
                        'lolwebsite/projectInstruction',
                    ]
                },
                {
                    title: '在线翻译',
                    collapsable: true,
                    children: [
                        'translationOnline/projectInstruction',
                    ]
                },
                {
                    title: '头条创作',
                    collapsable: true,
                    children: [
                        'informationPlatform/projectInstruction',
                    ]
                },
                {
                    title: 'vue组件封装',
                    collapsable: true,
                    children: [
                        'vueComponentsDemo/projectInitialization',
                        'vueComponentsDemo/buttonComponentsDemo',
                    ]
                },
            ],
            '/essayLibrary/': [
                {
                    title: 'Book',
                    collapsable: true,
                    children: [
                        'bookChildLibrary/book1'
                    ]
                },
                {
                    title: 'Movie',
                    collapsable: true,
                    children: [
                        'movieChildLibrary/movie1'
                    ]
                },
                {
                    title: 'Music',
                    collapsable: true,
                    children: [
                        'musicChildLibrary/lizhi'
                    ]
                },
                {
                    title: 'Experience',
                    collapsable: true,
                    children: [
                        // 'experienceLibrary/rtdl.md'
                    ]
                },
            ]
        }
    }
};
