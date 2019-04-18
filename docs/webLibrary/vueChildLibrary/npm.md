# npm(包管理工具)
---
NPM是随同NodeJS一起安装的包管理工具，我们可以通过输入 "npm -v" 来测试是否成功安装。

* npm install moduleName

安装相应模块到项目node_modules目录下，不会将模块依赖写入package.json文件中，运行 npm install 初始化项目时不会下载模块。

* npm install -g moduleName

安装相应模块到全局环境中，不会在项目node_modules目录下保存，不会将模块依赖写入package.json文件中，运行 npm install 初始化项目时不会下载模块。

* npm install moduleName --save

安装相应模块到项目node_modules目录下，会将模块依赖写入package.json(dependencies发布后还需要依赖的模块)文件中，运行 npm install 初始化项目时会下载模块。

* npm install moduleName --save-dev

安装相应模块到项目node_modules目录下，会将模块依赖写入package.json(devDependencies开发时的依赖发布后用不到)文件中，运行 npm install 初始化项目时会下载模块。

* npm run dev

启动项目

* npm run build

打包项目

> 2019/4/18 14:00