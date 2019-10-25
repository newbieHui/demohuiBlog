# 三省
---
#### 1.http和https
* http,超文本传输协议，是一个客户端和服务器端请求和应答的标准(TCP)
* https是以安全为目标的http通道，在http下加入SSL层，https的安全基础是SSL,https的SSL加密是在传输层实现的。https协议的主要
作用是建立一个信息安全通道，确保数据的传输和网站的真实性。

#### 2.HTTP支持的方法
* GET, POST, HEAD, OPTIONS, PUT, DELETE, TRACE, CONNECT

#### 2.get和post
* get参数通过url传递，post放在request body中。
* get请求在url中传递的参数是有长度限制的，而post没有。
* get比post更不安全，因为参数直接暴露在url中，所以不能用来传递敏感信息。
* get请求只能进行url编码，而post支持多种编码方式。
* get请求会浏览器主动cache。
* get请求参数会被完整保留在浏览历史记录里，而post中的参数不会被保留。
* get和post本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。GET
产生一个TCP数据包；POST产生两个TCP数据包。

#### 2.状态码
* 200，OK，请求成功。
* 400，Bad Request，请求语义参数有误。前端提交的数据格式不符合后端规范。
* 401，Unauthorized，当前请求需要用户验证。
* 403，Forbidden，服务器收到请求，但拒绝执行。
* 404, Not Unauthorized，服务器无法根据客户端的请求找到资源(网页)。
* 500，Internal Server Error，服务器内部错误，无法完成请求。
* 502，Bad Gateway，作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应。
* 504，Gateway Time-out，充当网关或代理的服务器，未及时从远端服务器获取请求。
* 505，HTTP Version not supported，服务器不支持请求的HTTP协议的版本，无法完成处理。

#### 3.cookie、sessionStorage,localStorage
* cookie,cookie数据始终在同源的http请求中携带，即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自
动把数据发给服务器，仅在本地保存。cookie数据还有路径(path)的概念，可以限制cookie只属于某个路径下,存储的大小很小只有4K
左右。cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
* cookie的作用：
1. 保存用户登录状态：例如将用户id存储于一个cookie内，这样当用户下次访问该页面时就不需要重新登录了。cookie还可以设置过期
时间，当超过时间期限后，cookie就会自动消失。
2. 跟踪用户行为：例如一个天气预报网站，能够根据用户选择的地区显示当地的天气情况。如果每次都需要选择所在地是烦琐的，当利
用了cookie后就会显得很人性化了，系统能够记住上一次访问的地区，当下次再打开该页面时，它就会自动显示上次用户所在地区的天气
情况。因为一切都是在后台完成，所以这样的页面就像为某个用户所定制的一样，使用起来非常方便。
* sessionStorage，仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持。
* localStorage，始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据。
* sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage：在所有同源窗口都是共享的；cookie：也是在所有
同源窗口中共享的。

#### 4.cookie和session
1. cookie数据存放在客户的浏览器上，session数据放在服务器上。
2. cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗，考虑到安全应当使用session。
3. session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用COOKIE。
4. 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

#### 5.cookie如何防范XSS攻击
XSS（跨站脚本攻击）是指攻击者在返回的HTML中嵌入javascript脚本，为了减轻这些攻击，需要在HTTP头部配上'set-cookie：httponly'
这个属性可以防止XSS,它会禁止javascript脚本来访问cookie。'secure'这个属性告诉浏览器仅在请求为https的时候发送cookie。

#### 6.web worker
* 当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本执行完成。web worker是运行在后台的js，独立于其他脚本，不会
影响页面的性能。在此过程中可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。并且通过
postMessage将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了。
* 如何创建web worker：
1. 检测浏览器对于web worker的支持性
````js
if(typeof(Worker)!=="undefined")
{
    // 是的! Web worker 支持!
    // 一些代码.....
}
else
{
    //抱歉! Web Worker 不支持
}
````
2. 在一个外部JavaScript中创建我们web worker
````js
var i=0;

function timedCount()
{
    i=i+1;
    postMessage(i);
    setTimeout("timedCount()",500);
}

timedCount();   //以上代码中重要的部分是 postMessage() 方法 - 它用于向 HTML 页面传回一段消息。
````

**注意: web worker 通常不用于如此简单的脚本，而是用于更耗费 CPU 资源的任务。**

3. 创建web worker对象
````js
//下面的代码检测是否存在 worker，如果不存在，它会创建一个新的 web worker 对象
if(typeof(w)=="undefined")
{
    w=new Worker("demo_workers.js");
}

w.onmessage=function(event){
    document.getElementById("result").innerHTML=event.data;
};
````
4. 终止web worker
当我们创建 web worker 对象后，它会继续监听消息（即使在外部脚本完成之后）直到其被终止为止。
如需终止 web worker，并释放浏览器/计算机资源，请使用 terminate() 方法：
````js
w.terminate();
````
#### 7.HTML语义化标签
语义化的标签，旨在让标签有自己的含义。
1. 代码结构清晰，方便阅读，有利于团队合作开发。
2. 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以语义的方式来渲染网页。
3. 有利于搜索引擎优化（SEO）。
如结构化语义标签：
````html
<header>页眉</header>
<footer>页脚</footer>
<main>网页主体</main>
<nav>导航栏</nav>
<article>文档独立区域</article>
<section>文章的一个章节<section>
<aside>侧边栏</aside>
<figure>文档独立流内容</figure>
<address>文档中的联系信息</address>
<hgroup>标题分组</hgroup>
````

#### 8.前端优化
* 降低请求量：合并资源，减少HTTP 请求数，minify / gzip 压缩，webP，lazyLoad。
* 加快请求速度：预解析DNS，减少域名数，并行加载，CDN 分发。
* 缓存：HTTP 协议缓存请求，离线缓存 manifest，离线数据缓存localStorage。
* 渲染：JS/CSS优化，加载顺序，服务端渲染，pipeline。
