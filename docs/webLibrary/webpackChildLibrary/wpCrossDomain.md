# webpack跨域问题
---

### 1.问题描述
域名和域名对应相同IP是常见跨域场景中的一种，这种场景是不允许相互通信的。

在vue工程化项目中，我们使用**webpack在开发环境中**就会存在上述跨域问题。大多数情况下后台会帮我们做请求代理，但是如果没有后台的帮助，
这个问题就只能靠我们前端自己来解决了。

### 2.解决方法
找到config目录下index.js文件中的dev:{proxyTable: { }}写入要跨域代理的链接地址：

````js
proxyTable: {
			'/api': {
				target: 'http://...',   //服务地址:端口
				// secure: false,   // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				pathRewrite: {
					'^/api': ''
				}
			}
		}
		// 代理请求效果：localhost:8080/api     =>   http://...
````

````js
proxyTable: {
			'/api': {
				target: 'http://...',   //服务地址:端口
				// secure: false,   // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
				pathRewrite: {
					'^/api': '/api'
				}
			}
		}
		// 代理请求效果：localhost:8080/api     =>   http://.../api
````

> 2019/04/02 18:50