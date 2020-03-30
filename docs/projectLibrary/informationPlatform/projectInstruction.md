# 项目总览
---

### 项目描述

该项目计划使用vue脚手架(vue-cli)搭建一个完整的头条新闻创作平台，主要功能包括登录验证、头条新闻创作、头条新闻发布、头条新
闻删除、以往新闻修改等。计划使用webpack打包发布项目。

### 项目创建
1.安装webpack：

使用npm全局安装webpack，打开命令行工具，输入 npm install webpack -g，安装完成之后，输入 webpack -v 即可查看当前安装版本。

![网站预览](/img/informationPlatformImg/informationPlatform1.png)

2.安装vue-cli：

在命令行输入 npm install --global vue-cli，安装完成之后，输入 vue -V查看当前版本号。

![网站预览](/img/informationPlatformImg/informationPlatform2.png)

3.使用vue-cli来构建项目:

进入文件夹，输入 vue init webpack projectName，其中projectName为新项目文件名。安装完成后进入项目使用 npm install安装依赖。 

![网站预览](/img/informationPlatformImg/informationPlatform3.png)

4.修改配置：

修改 config里面的index.js文件。

![网站预览](/img/informationPlatformImg/informationPlatform4.png)
修改端口号是为了防止端口号被占用，修改assetsPublicPath属性是因为打包后，外部引入js和css文件时，如果路径是以'/'开头，在本
地是无法找到对应文件的，所以如果要在本地打开打包后的文件，就得修改路劲为'./'

5.启动项目:

输入 npm run dev 启动项目。

![网站预览](/img/informationPlatformImg/informationPlatform5.png)

### 项目预览

### 项目代码

[项目代码](https://github.com/newbieHui/authoringPlatform.git)

