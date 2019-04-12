# vue-cli
---

### 1.favicon图标
在实际开发中，我们常常需要配置网站顶部标题左侧小图标，也就是favicon图标。那么如何在vue-cli项目中配置favicon图标呢？其实favicon图标的配置也很简单，
下面我们就来说说配置方法。

vue-cli默认帮我们安装了html-webpack-plugin（如果没有，可以自己npm安装），我们只需在html-webpack-plugin插件中添加favicon选项即可。
html-webpack-plugin插件需要配置两处，一处是在开发环境下配置，另一处是在生产环境下配置。

* 开发环境（webpack.dev.conf.js）
````js
new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            title: 'Demo',
            favicon:'src/assets/images/123.png',
            inject: true,
        })
````

* 生产环境(webpack.prod.conf.js)
````js
new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            title: 'Demo',
            favicon:'src/assets/images/123.png',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunksSortMode: 'dependency'
        })
````

**注意：配置favicon图标的路径是相对路径！**


