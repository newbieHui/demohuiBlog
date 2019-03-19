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
        logo: '/img/homePage.jpg',
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
                    title: 'JavaScript',
                    collapsable: true,
                    children: [
                        'jsChildLibrary/dateChange',
                        'jsChildLibrary/commonAlgorithm',
                        'jsChildLibrary/prototypeChain',
                        'jsChildLibrary/direction',
                        'jsChildLibrary/arrayOperation',
                        'jsChildLibrary/es6',
                    ]
                },
                {
                    title: 'CSS',
                    collapsable: true,
                    children: [
                        'cssChildLibrary/boxModel',
                        'cssChildLibrary/elementCenter',
                    ]
                },
                {
                    title: 'Vue',
                    collapsable: true,
                    children: []
                },
                {
                    title: 'React',
                    collapsable: true,
                    children: [
                        'reactChildLibrary/reactStart',
                    ]
                },
                {
                    title: 'Element-ui',
                    collapsable: true,
                    children: [
                        'elmChildLibrary/formInput',
                    ]
                },
            ],
            '/projectLibrary/': [
                {
                    title: 'Vue项目',
                    collapsable: true,
                    children: [
                        'vueChildLibrary/translateOnline'
                    ]
                },
                {
                    title: 'React项目',
                    collapsable: true,
                    children: [
                        'reactChildLibrary/firstReact',
                        'reactChildLibrary/reactFamilyBucket',
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
                        'musicChildLibrary/music1'
                    ]
                },
            ]
        }
    }
};