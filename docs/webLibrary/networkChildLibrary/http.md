# HTTP协议
---

### HTTP的特性
* HTTP协议构建于TCP/IP协议之上，是一个应用层协议。
* HTTP是无连接无状态的。

### HTTP请求方法
常见的HTTP请求方法有GET,POST,PUT,DELETE。
* GET用于信息获取，该操作用于获取信息而非修改信息，而且对同一个URL的多个请求返回同样的结果。
* POST向指定资源提交数据进行处理请求，数据在请求体中，POST请求可能会导致新的资源建立或已有资源的修改。

### GET和POST
* GET在浏览器回退时是无害的，而POST会再次提交请求。
* GET请求只能进行url编码，而POST支持多种编码方式。
* GET请求在URL中的参数是有长度限制的，POST没有。
* GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息。
* GET参数通过URL传递，POST放在Request body中。
* GET产生一个TCP数据包；POST产生两个TCP数据包(并不是所有浏览器都会在POST中发送两次包，Firefox就只发送一次)。

### content-type
Content-Type，内容类型，一般是指网页中存在的Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、
什么编码读取这个文件。

三种常见的HTTP content-type：
* application/x-www-form-urlencoded
* multipart/form-data(此种方式多用于文件上传)
* application/json(消息主体是序列化的json字符串)

### HTTP状态码
* 200 - 请求成功
* 301 - 资源（网页等）被永久转移到其它URL
* 404 - 请求的资源（网页等）不存在
* 500 - 内部服务器错误
![httpErrorCode](/img/httpErrorCode.png)