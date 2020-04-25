# 项目初始化
---
### 1.使用 vue-cli 初始化一个vue项目

![vue项目初始化](/img/vueComponentsDemoImg/createVuePro.png)

### 2.安装npm

如果使用 npm install 安装较慢可以使用如下命令安装cnpm
>npm install -g cnpm --registry=https://registry.npm.taobao.org

### 3.安装SCSS
SCSS是一种CSS预处理语言，编译后形成正常的css文件，为css增加一些编程特性，无需考虑浏览器的兼容性(完全兼容css3)，让css更加
简洁、适应性更强，可读性更佳，更易于代码的维护等诸多好处。

* 安装sass 依赖包:
````
cnpm  install sass-loader --save-dev
cnpm install node-sass --sava-dev
````

如果安装 sass-loader 报错，这是因为当前sass的版本太高，webpack编译时出现了错误，这个时候只需要换成低版本的就行
````
卸载当前版本   cnpm uninstall sass-loader
安装     cnpm install sass-loader@7.3.1 --save-dev
````

* 在build文件夹下的webpack.base.conf.js的rules里面添加配置:
````
{
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass']
}
````

* 使用scss时候在所在的style样式标签上添加lang=”scss”即可应用对应的语法，否则报错



