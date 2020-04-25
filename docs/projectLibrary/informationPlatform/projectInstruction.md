# 项目总览
---

### 项目描述

该项目计划使用vue脚手架(vue-cli)，iview组件库和vue-quill-editor富文本编辑器搭建一个完整的头条新闻创作平台，主要功能包括
登录验证、头条新闻创作、头条新闻发布、头条新闻删除、以往新闻修改等。计划使用webpack打包发布项目。

### 项目创建
1.安装webpack：

使用npm全局安装webpack，打开命令行工具，输入 npm install webpack -g，安装完成之后，输入 webpack -v 即可查看当前安装版本。

![网站预览](/img/informationPlatformImg/informationPlatform1.png)

2.安装vue-cli：

在命令行输入 npm install --global vue-cli，安装完成之后，输入 vue -V查看当前版本号。

![网站预览](/img/informationPlatformImg/informationPlatform2.png)

3.使用vue-cli来构建项目:

进入文件夹，输入 vue init webpack projectName，其中projectName为新项目文件名。安装完成后进入项目使用 npm install安装依赖。 
> 如果npm安装很慢可以使用淘宝镜像，直接使用以下命令进行安装

> npm install --registry=https://registry.npm.taobao.org

![网站预览](/img/informationPlatformImg/informationPlatform3.png)

4.修改配置：

修改 config里面的index.js文件。

![网站预览](/img/informationPlatformImg/informationPlatform4.png)
修改端口号是为了防止端口号被占用，修改assetsPublicPath属性是因为打包后，外部引入js和css文件时，如果路径是以'/'开头，在本
地是无法找到对应文件的，所以如果要在本地打开打包后的文件，就得修改路劲为'./'

5.启动项目:

输入 npm run dev 启动项目。

![网站预览](/img/informationPlatformImg/informationPlatform5.png)

6.安装iview:

在命令行输入 npm install iview --save 安装完成后在入口文件main.js文件进行如下配置：
````js
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'   // 使用 CSS

Vue.config.productionTip = false;
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
````

7.安装vue-quill-editor:

在命令行中输入 npm install vue-quill-editor -S 安装完成后在入口文件main.js文件进行如下配置：
````js
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'   // 使用 CSS
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(VueQuillEditor);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
````
### 项目预览
1.登陆页面

![网站预览](/img/informationPlatformImg/informationPlatform6.png)

2.主页面

![网站预览](/img/informationPlatformImg/informationPlatform7.png)

3.创作页面

![网站预览](/img/informationPlatformImg/informationPlatform8.png)

4.管理页面

![网站预览](/img/informationPlatformImg/informationPlatform9.png)

5.修改页面

![网站预览](/img/informationPlatformImg/informationPlatform10.png)

### 项目代码

[项目代码](https://github.com/newbieHui/authoringPlatform.git)

