# 项目搭建
---

* 全局安装vue-cli

````
npm install --global vue-cli
````
___
* 创建一个基于webpack的新项目

````
vue init webpack my-project
````

* 安装依赖

````
cd my-project
npm install
````

* 项目启动

````
npm run dev
````

* 项目打包

````
npm run build
````

> 2019/04/15 18:50

### 1.webpack配置

#### 1.网站title和favicon配置
在实际开发中，我们常常需要配置网站顶部标题和左侧小图标。那么如何在vue-cli项目中配置网站标题和favicon图标呢？其实favicon图标的配置也很简单，
下面我们就来说说配置方法。

我们只需在html-webpack-plugin插件中添加title和favicon选项即可。
html-webpack-plugin插件需要配置两处，一处是在开发环境(webpack.dev.conf.js)下配置，另一处是在生产环境(webpack.prod.conf.js)下配置。

````js
new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            // 这里设置网站title和title左侧小图标
            // title:'网站标题',
            // favicon: 'src/assets/images/***.png'
        })
````

**注意：配置favicon图标的路径是相对路径！**

#### 2.打包后，index.html引用资源的的相对地址配置
* assetsSubDirectory: 除了 index.html 之外的静态资源要存放的路径
* assetsPublicPath: 代表打包后，index.html里面引用资源的的相对地址

所以要配置index.html中引用资源的相对地址我只需更改config目录下index.js文件中dev和build中的assetsPublicPath值。

#### 3.webpack跨域问题
[开发环境中跨域问题](https://newbiehui.github.io/webLibrary/webpackChildLibrary/wpCrossDomain.html)

### 2.路由配置
Vue Router是Vue.js官方的路由管理器。它和Vue.js的核心深度集成，从而使得构建单页面应用变得简单。

如果我们在执行vue init webpack my-project命令中没有选择安装路由，那么我们需要在项目中手动安装router,具体步骤如下，

#### 1.安装
在项目目录下输入命令 **npm install vue-router --save** 

#### 2.配置
如果需要在项目中使用我们安装的vue-router，必须要通过Vue.use()明确的安装路由功能。

我们在src目录下新建router目录，然后在router目录中index.js中写入以下代码来使用路由：
````js
// 引入
import Vue from 'vue'
import Router from 'vue-router'

// 注册
Vue.use(Router)
````

在main.js文件中写入
````js
import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
````

#### 3.路由拆分
如果路由设计中涉及到了动态路由，我们就需要路由拆分，将路由拆分为静态路由(登陆，欢迎，404页面等)和动态路由(需要权限验证)。

### 3.状态管理
在大型项目中，值得传递和保存是一个令人抓狂的事情，但是在vuex的帮助下这一切将会变得轻而易举。让我们先来看看vuex是什么：
>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应规则保证状态以一种可预测的方式发生变化。

#### 1.安装
**npm install vuex --save**

#### 2.配置
在src目录下新建store目录，然后在store中新建index.js注册Vuex

````js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({

});

export default store
````
___

````js
// src/main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})

````

### 4.平台布局

#### 1.安装Element-ui
**npm i element-ui -S**

````js
// src/main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>'
})
````

#### 2.在vue-cli项目中使用icon

**npm install svg-sprite-loader --save-dev**

在webpack.base.conf.js文件中写入如下代码：
````js
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],   //加入次行代码
        options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
    },
    //写入以下代码
    {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
            symbolId: 'icon-[name]'
        }
    }
````

在src目录下建立components/SvgIcon/index.vue文件



