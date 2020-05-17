#
-
#### Http和Https
* http，超文本传输协议，是一个客户端和服务器端请求和应答的标准(TCP)。
* https，是以安全为目标的http通道，在http下加入SSL层，https的安全基础是SSL，https的SSL加密是在传输层实现的。https协议的主要
作用是建立一个信息安全通道，确保数据的传输和网站的真实性。

#### HTTP支持的方法
* GET(获取资源)，POST(传输实体主体)，HEAD(获得报文首部)， OPTIONS(询问支持的方法)，PUT(传输文件)，DELETE(删除文件)，TRACE
(追踪路径)，CONNECT(要求用隧道协议连接代理)，LINK(建立和资源之间的联系)，UNLINK)(断开连接关系)。

#### Get和Post
* get从指定的资源请求数据；post向指定的资源提交要被处理的数据。
* get参数通过url传递，post放在request body中。
* get请求在url中传递的参数是有长度限制的，而post没有。
* get比post更不安全，因为参数直接暴露在url中，所以不能用来传递敏感信息。
* get请求只能进行url编码，而post支持多种编码方式：1.application/x-www-form-urlencoded；2.multipart/form-data；
3.application/json；4.text/xml。
* get请求浏览器会主动cache，在html页面设置meta标签阻止cache：content="no-cache"。
* get请求参数会被完整保留在浏览历史记录里，而post中的参数不会被保留。
* get和post本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。
* get产生一个TCP数据包；post产生两个TCP数据包。
* 对于get方式的请求，浏览器会把http header和data一并发送出去，服务器响应200(返回数据)；而对于POST，浏览器先发送header，
服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

#### 状态码
> 1XX：信息状态码；2XX：成功状态码；3XX：重定向状态码；4XX：客户端错误状态码；5XX：服务端错误状态码
* 200，OK，请求成功。
* 400，Bad Request，请求语义参数有误。前端提交的数据格式不符合后端规范。
* 401，Unauthorized，当前请求需要用户验证。
* 403，Forbidden，服务器收到请求，但拒绝执行。
* 404，Not Found，服务器无法根据客户端的请求找到资源(网页)。
* 500，Internal Server Error，服务器内部错误，无法完成请求。
* 502，Bad Gateway，作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应。
* 504，Gateway Time-out，充当网关或代理的服务器，未及时从远端服务器获取请求。
* 505，HTTP Version not supported，服务器不支持请求的HTTP协议的版本，无法完成处理。

#### cookie、sessionStorage、localStorage
* cookie，cookie数据始终在同源的http请求中携带，即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自
动把数据发给服务器，仅在本地保存。cookie数据还有路径(path)的概念，可以限制cookie只属于某个路径下，存储的大小很小只有4K
左右。cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
* cookie的作用：1. 保存用户登录状态；2. 跟踪用户行为。
* sessionStorage，仅在当前浏览器窗口 **关闭前** 有效，自然也就不可能持久保持，可以保存5M的信息。
* localStorage，始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据，可以保存5M的信息。在IE8以上的IE版本才支持
localStorage这个属性。目前所有的浏览器中都会把localStorage的值类型限定为string类型，这个在对我们日常比较常见的JSON对象类
型需要一些转换。localStorage在浏览器的隐私模式下面是不可读取的。localStorage不能被爬虫抓取到。

sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage和cookie在所有同源窗口都是共享的。

#### cookie和session
1. cookie数据存放在客户的浏览器上，session数据放在服务器上。
2. cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗，考虑到安全应当使用session。
3. session会在一定时间内保存在服务器上。当访问增多，会比较占用服务器的性能，考虑到减轻服务器性能方面，应当使用COOKIE。
4. 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

#### Cookie如何防范XSS攻击
XSS(跨站脚本攻击)是指攻击者在返回的HTML中嵌入javascript脚本，为了减轻这些攻击，需要在HTTP头部配上'set-cookie：httponly'
这个属性可以防止XSS，它会禁止javascript脚本来访问cookie。'secure'这个属性告诉浏览器仅在请求为https的时候发送cookie，当设
置为true时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，
如果是 HTTP 连接则不会传递该信息，所以不会被窃取到Cookie 的具体内容。

#### CSRF和XSS的网络攻击及防范
1. CSRF：跨站请求伪造(Cross-site request forgery)，是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。
跟跨网站脚本（XSS）相比，XSS利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。目前防御 CSRF 攻击主
要有三种策略：验证 HTTP Referer 字段，Referer是HTTP请求Header的一部分；在请求地址中添加 token 并验证；在 HTTP 头中自定义
属性并验证。
2. XSS：跨站脚本攻击(Cross Site Scripting)，是说攻击者通过注入恶意的脚本，在用户浏览网页的时候进行攻击，比如获取cookie，
或者其他用户身份信息，可以分为存储型和反射型，存储型是攻击者输入一些数据并且存储到了数据库中，其他浏览者看到的时候进行攻
击，反射型的话不存储在数据库中，往往表现为将攻击代码放在url地址的请求参数中。防御的话为cookie设置httpOnly属性，对用户的
输入进行检查，进行特殊字符过滤 。

#### 在地址栏里输入一个URL,到这个页面呈现出来，中间会发生什么？
1. DNS解析(域名解析是把域名指向网站空间IP)
2. TCP连接
3. 发送HTTP请求
4. 服务器处理请求并返回HTTP报文
5. 浏览器解析渲染页面
6. 连接结束

#### 浏览器是怎么对html进行渲染的？
1. 解析html，生成dom树。
2. 根据css文件计算出样式数据。
3. 结合dom树和css文件，生成渲染树。
4. 浏览器根据渲染树，将页面绘制到屏幕上。

#### DOM事件流的三个阶段
1. 事件捕获阶段
2. 处于目标阶段
3. 事件冒泡阶段

#### HTML语义化标签
语义化的标签，旨在让标签有自己的含义。
1. 代码结构清晰，方便阅读，有利于团队合作开发。
2. 方便其他设备解析(如屏幕阅读器、盲人阅读器、移动设备)以语义的方式来渲染网页。
3. 有利于搜索引擎优化(SEO)。

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

#### HTML5新特性
1. html5为了更好的实践web语义化，增加了header、footer、nav、aside、section、main、article、figure等语义化标签。
2. 在表单方面，新的表单控件calender、date、time、email、url、search。新的input类型 color、date、datetime、datetime-local、email。
3. 在存储方面，提供了sessionStorage，localStorage和本地离线存储(把需要离线存储在本地的文件列在一个manifest配置文件)，通
过这些存储方式方便数据在客户端的存储和获取。
4. 在多媒体方面规定了音频和视频元素audio和video。
5. 另外还有地理定位，canvas绘图，支持内联SVG，拖放，多线程编程的web worker和websocket协议。

#### CSS3新特性
1. CSS3边框如border-radius、box-shadow等。
2. CSS3背景如background-size、background-origin等。
3. CSS3 2D，3D转换如transform等。
4. CSS3动画如animation等。

#### SPA
单页web应用(single page web application)，是加载单个html页面并在用户与应用程序交互时动态更新该页面的web应用程序。
* spa优点
1. 速度：更好的用户体验，让用户在web app感受到native app的速度和流畅
2. MVVM：经典MVVM开发模式，前后端各负其责
3. 路由：在url中采用#号来作为当前视图的地址，改变#号后参数，页面不会重载
* spa缺点
1. 首屏渲染时间长：必须等加载完毕才能渲染出首屏
2. seo不友好：爬虫只能拿到一个div，认为页面是空的，不利于seo

#### 前端优化
* 降低请求量：合并资源，减少HTTP请求数，压缩资源文件，lazyLoad。
* 加快请求速度：预解析DNS，减少域名数，并行加载，CDN分发。
* 缓存：HTTP协议缓存请求，离线缓存manifest，离线数据缓存localStorage。
* 渲染：JS/CSS优化，加载顺序，服务端渲染。

#### 性能优化
1. 减少HTTP请求
2. 使用内容发布网络（CDN）
3. 添加本地缓存
4. 压缩资源文件
5. 将CSS样式表放在顶部，把javascript放在底部(浏览器的运行机制决定)
6. 避免使用CSS表达式
7. 减少DNS查询
8. 使用外部javascript和CSS
9. 避免重定向
10.图片lazyLoad

#### 图片的懒加载和预加载
* 预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染。
* 懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数。
* 两种技术的本质：两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载。

**懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力**

#### CSS盒模型
就是用来装页面上的元素的矩形区域。CSS中的盒子模型包括IE盒子模型和标准的W3C盒子模型。

区别：这两种盒子模型最主要的区别就是width的包含范围，在标准的盒子模型中，width指content部分的宽度，在IE盒子模型中，width
表示content+padding+border这三个部分的宽度，故这使得在计算整个盒子的宽度时存在着差异：

标准盒子模型的盒子宽度：左右border+左右padding+width
IE盒子模型的盒子宽度：width

在CSS3中引入了box-sizing属性，box-sizing:content-box;表示标准的盒子模型，box-sizing:border-box表示的是IE盒子模型。最后，
前面我们还提到了，box-sizing:padding-box,这个属性值的宽度包含了左右padding+width也很好理解性记忆，包含什么，width就从什
么开始算起。

#### 重绘和重排
1. 重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。
2. 触发重绘的条件：改变元素外观属性。如：color，background-color等。
3. 重排也叫重构、回流，当渲染树中的部分元素因为规模尺寸，布局等改变而需要重新构建。每个页面至少需要一次重排，就是页面第
一次加载的时候。
4. 重排必定引发重绘，但重绘不一定引发重排。

#### Flex布局
Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。布局的传统解决方案，基于盒状模型，依赖display
属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。

#### BFC(块级格式化上下文，用于清除浮动，防止margin重叠等)
块级格式化上下文，是一个独立的渲染区域，并且有一定的布局规则。BFC区域不会与float box重叠；BFC是页面上的一个独立容器，子
元素不会影响到外面；计算BFC的高度时，浮动元素也会参与计算。

哪些元素会生成BFC：
* 根元素
* float不为none的元素
* position为fixed和absolute的元素
* display为inline-block、table-cell、table-caption，flex，inline-flex的元素
* overflow不为visible的元素

#### 元素垂直水平居中的方法
1.display: flex将其定义为弹性容器。align-items: center;定义项目在交叉轴（纵轴）上如何对齐，垂直对齐居中。
justify-content: center; 定义了项目在主轴上的对齐方式，水平对齐居中。

2.display: table使块状元素成为一个块级表格。display: table-cell;子元素设置成表格单元格;vertical-align: middle;使表格内容
居中显示，即可实现垂直居中的效果。

3.父元素position: relative。子元素position: absolute绝对定位。设置元素的定位位置：left:50%;top:50%;margin: -50px 0 0 -50px;
这种方式需要知道被垂直居中元素的高和宽，才能计算出margin值，兼容所有浏览器。

4.父元素position: relative，必须有height的值。子元素position: absolute绝对定位。设置元素的定位位置，距离上、下、左、右都
为0：left:0;right:0;top:0;bottom:0。设置元素的margin样式值为auto：margin:auto。这种方式无需知道被居中元素的高和宽。

5.父元素position: relative。子元素position: absolute绝对定位。设置元素的定位位置：position: absolute;top: 50%;left: 50%;
transform: translate(-50%, -50%);利用Css3中的transform，可以轻松的在未知元素的高度的情况下实现元素的垂直居中。

6.单行文本：水平居中：text-align:center;垂直居中：line-height:XXpx; line-height与元素height值一致。

#### 块元素和行元素
块元素：独占一行，并且自动填满父元素，可以设置margin和padding以及高度和宽度。

行元素：不会独占一行，width和height会失效，并且在垂直方向的padding和margin会失效。

#### 双边距重叠问题(外边距折叠)
多个相邻（兄弟或者父子关系）普通流的块元素垂直方向margin会重叠
折叠的结果为：
* 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。

* 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。

* 两个外边距一正一负时，折叠结果是两者的相加的和。

#### position属性
Position属性把元素放置在一个静态的，相对的，绝对的，固定的位置中:
* Static：位置设置为static的元素，他始终处于页面流给予的位置，static元素会忽略任何top,bottom,left,right声明。
* Relative：位置设置为relative的元素，可将其移至相对于其正常位置的地方，因此left：20会将元素移至元素正常位置左边20个像素
的位置。
* Absolute：此元素可定位于相对包含他的元素的指定坐标，此元素可通过left，top等属性规定。
* Fixed：位置被设为fixed的元素，可定为与相对浏览器窗口的指定坐标，可以通过left，top，right属性来定位。

#### 清除浮动
1.使用带clear属性的空元素：
在浮动元素后使用一个空元素，并在CSS中赋予.clear{clear:both;}属性即可清理浮动。

2.使用CSS的overflow属性：
给浮动元素的容器添加overflow:hidden;或overflow:auto;可以清除浮动，另外在 IE6 中还需要触发 hasLayout ，例如为父元素设置容
器宽高或设置 zoom:1。在添加overflow属性后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动的效果。

3.给浮动的元素的容器添加浮动：
给浮动元素的容器也添加上浮动属性即可清除内部浮动，但是这样会使其整体浮动，影响布局，不推荐使用。

4.使用邻接元素处理：
什么都不做，给浮动元素后面的元素添加clear属性。

5.使用CSS的:after伪元素：
结合:after 伪元素（注意这不是伪类，而是伪元素，代表一个元素之后最近的元素）和 IEhack ，可以完美兼容当前主流的各大浏览器
，这里的 IEhack 指的是触发 hasLayout。给浮动元素的容器添加一个clearfix的class，然后给这个class添加一个:after伪元素实现元
素末尾添加一个看不见的块元素（Block element）清理浮动。

#### 将一个div设置半透明
---
````css
div{filter:alpha(Opacity=80);-moz-opacity:0.5;opacity: 0.5;} 
````
1. filter：对IE设置半透明滤镜效果，filter:alpha(Opacity=80)代表该对象80%半透明。
2. -moz-opacity：对mozilla firefox火狐浏览器实现半透明，-moz-opacity:0.5相当于设置半透明为50%。
3. opacity：对除IE外所有浏览器支持包括谷歌，opacity: 0.5;表示设置50%半透明。

#### 让一个元素消失
1.opacity：0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定一些事件，如click事件，那么点击该区域，也能
触发点击事件。

2.visibility：hidden，该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件。

3.display：none，把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉。

#### line-height和height的区别
line-height一般是指布局里面一段文字上下行之间的高度，是针对字体来设置的，height一般是指容器的整体高度。

#### inline-block、inline和block的区别
* block：块级元素，其前后都会有换行符，能设置宽度，高度，margin/padding水平垂直方向都有效。
* inline：设置width和height无效，margin在竖直方向上无效，padding在水平方向垂直方向都有效，前后无换行符。
* inline-block：能设置宽度高度，margin/padding水平垂直方向 都有效，前后无换行符。

#### 三栏布局
**三列布局又分为两种，两列定宽一列自适应，以及两侧定宽中间自适应**
* 两列定宽一列自适应：

1.使用float+margin：
给div设置float：left，left的div添加属性margin-right：left和center的间隔px,right的div添加属性margin-left：left和center的
宽度之和加上间隔

2.使用float+overflow：
给div设置float：left，再给right的div设置overflow:hidden。这样子两个盒子浮动，另一个盒子触发bfc达到自适应

3.使用position：
父级div设置position：relative，三个子级div设置position：absolute，这个要计算好盒子的宽度和间隔去设置位置，兼容性比较好。

4.使用table实现：
父级div设置display：table，设置border-spacing：10px//设置间距，取值随意,子级div设置display:table-cell，这种方法兼容性好，
适用于高度宽度未知的情况，但是margin失效，设计间隔比较麻烦，

5.flex实现：
parent的div设置display：flex；left和center的div设置margin-right；然后right 的div设置flex：1；这样子right自适应，但是flex
的兼容性不好。

6、grid实现：
parent的div设置display：grid，设置grid-template-columns属性，固定第一列第二列宽度，第三列auto，

对于两侧定宽中间自适应的布局，对于这种布局需要把center放在前面，可以采用双飞翼布局：圣杯布局，来实现，也可以使用上述方法
中的grid，table，flex，position实现。

#### css布局
六种布局方式总结：圣杯布局、双飞翼布局、Flex布局、绝对定位布局、表格布局、网格布局。
* 圣杯布局是指布局从上到下分为header、container、footer，然后container部分定为三栏布局。这种布局方式同样分为header、
container、footer。圣杯布局的缺陷在于 center 是在 container 的padding中的，因此宽度小的时候会出现混乱。
* 双飞翼布局给center 部分包裹了一个 main 通过设置margin主动地把页面撑开。
* Flex布局是由CSS3提供的一种方便的布局方式。
* 绝对定位布局是给container 设置position: relative和overflow: hidden，因为绝对定位的元素的参照物为第一个position不为
static的祖先元素。 left 向左浮动，right 向右浮动。center 使用绝对定位，通过设置left和right并把两边撑开。 center 设置
top: 0和bottom: 0使其高度撑开。
* 表格布局的好处是能使三栏的高度统一。
* 网格布局可能是最强大的布局方式了，使用起来极其方便，但目前而言，兼容性并不好。网格布局，可以将页面分割成多个区域，或者
用来定义内部元素的大小，位置，图层关系。

#### js的各种位置
* clientHeight：表示的是可视区域的高度，不包含border和滚动条。
* offsetHeight：表示可视区域的高度，包含了border和滚动条。
* scrollHeight：表示了所有区域的高度，包含了因为滚动被隐藏的部分。
* clientTop：表示边框border的厚度，在未指定的情况下一般为0。
* scrollTop：滚动后被隐藏的高度，获取对象相对于由offsetParent属性指定的父坐标(css定位的元素或body元素)距离顶端的高度。

#### 如何解决异步回调地狱
promise、generator、async/await

#### JS中的垃圾回收机制
* 必要性：由于字符串、对象和数组没有固定大小，所有当他们的大小已知时，才能对他们进行动态的存储分配。JavaScript程序每次创
建字符串、数组或对象时，解释器都必须分配内存来存储那个实体。只要像这样动态地分配了内存，最终都要释放这些内存以便他们能够
被再用，否则，JavaScript的解释器将会消耗完系统中所有可用的内存，造成系统崩溃。
* 垃圾回收的方法：标记清除、引用计数。

#### Js基本数据类型
基本数据类型：undefined、null、number、boolean、string、symbol

#### js判断类型
判断方法：typeof()，instanceof，Object.prototype.toString.call()等

#### 数组常用方法
push()，pop()，shift()，unshift()，splice()，sort()，reverse()，map()等。

#### 数组去重
1. indexOf循环去重
2. ES6 Set去重；Array.from(new Set(array))
3. Object 键值对去重；把数组的值存成 Object 的 key 值，比如 Object[value1] = true，在判断另一个值的时候，如果Object[value2]
存在的话，就说明该值是重复的。

#### 去除字符串首尾空格
使用正则：(^\s*)|(\s*$)

#### JS的语言特性
1. 运行在客户端浏览器上
2. 不用预编译，直接解析执行代码
3. 弱类型语言，较为灵活
4. 与操作系统无关，跨平台的语言
5. 脚本语言、解释性语言

#### 闭包
闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放。

闭包就是函数的局部变量集合，只是这些局部变量在函数返回后会继续存在。闭包就是就是函数的“堆栈”在函数返回后并不释放，我们
也可以理解为这些函数堆栈并不在栈上分配而是在堆上分配。当在一个函数内定义另外一个函数就会产生闭包。

闭包的作用(模仿块级作用域；保存外部函数的变量；封装私有变量)：
1. 匿名自执行函数：我们知道所有的变量，如果不加上var关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对
象有很多坏处，比如：别的函数可能误用这些变量；造成全局对象过于庞大，影响访问速度(因为变量的取值是需要从原型链上遍历的)。
除了每次使用变量都是用var关键字外，我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护，
可以用闭包。
2. 结果缓存：我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，那么我们就需要
将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找，如果找不到，则进行计算，然后更新缓存并返回值，如果找到
了，直接返回查找到的值即可。闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留。
3. 封装：实现类和继承等。

#### 写一个函数，第一秒打印1，第二秒打印2
1. let块级作用域
````js
for(let i=0;i<5;i++){
    setTimeout(function(){
        console.log(i)
        },1000*i)
}
````
2.闭包
````js
for(var i=0;i<5;i++){
    (function(i){
        setTimeout(function(){
        console.log(i)
        },1000*i)
    })(i)
}
````

#### JS实现跨域
跨域，是指浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器对JavaScript实施的安全限制，那么只要协议、
域名、端口有任何一个不同，都被当作是不同的域。跨域原理，即是通过各种方式，避开浏览器的安全限制。
1. JSONP：通过动态创建script，再请求一个带参网址实现跨域通信。
2. document.domain + iframe跨域：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。
3. location.hash + iframe跨域：a欲与b跨域相互通信，通过中间页c来实现。三个页面，不同域之间利用iframe的location.hash传值，
相同域之间直接js访问来通信。
4. window.name + iframe跨域：通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。
5. postMessage跨域：可以跨域操作的window属性之一。
6. CORS：服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求，前后端都需要设置。
7. 代理跨域：启一个代理服务器，实现数据的转发。

#### this的指向
1. 默认绑定：全局环境中，this默认绑定到window。
2. 隐式绑定：一般地，被直接对象所包含的函数调用时，也称为方法调用，this隐式绑定到该直接对象。
3. 隐式丢失：隐式丢失是指被隐式绑定的函数丢失绑定对象，从而默认绑定到window。
4. 显式绑定：通过call()、apply()、bind()方法把对象绑定到this上，叫做显式绑定。
5. new绑定：如果函数或者方法调用之前带有关键字new，它就构成构造函数调用。对于this绑定来说，称为new绑定。
* 构造函数通常不使用return关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，它会显式返回。在这种情况下，构造函数调用表达式的计算结果就是这个新对象的值。
* 如果构造函数使用return语句但没有指定返回值，或者返回一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果。
* 如果构造函数显式地使用return语句返回一个对象，那么调用表达式的值就是这个对象。

#### 改变函数内部this指针的指向函数（bind，apply，call）
* 通过apply和call改变函数的this指向，他们两个函数的第一个参数都是一样的表示要改变指向的那个对象，第二个参数，apply是数组，
而call则是arg1,arg2...这种形式。
* 通过bind改变this作用域会返回一个新的函数，这个函数不会马上执行。

#### JS中继承实现的几种方式
1. 原型链继承，将父类的实例作为子类的原型，他的特点是实例是子类的实例也是父类的实例，父类新增的原型方法/属性，子类都能够
访问，并且原型链继承简单易于实现，缺点是来自原型对象的所有属性被所有实例共享，无法实现多继承，无法向父类构造函数传参。
2. 构造继承，使用父类的构造函数来增强子类实例，即复制父类的实例属性给子类，构造继承可以向父类传递参数，可以实现多继承，
通过call多个父类对象。但是构造继承只能继承父类的实例属性和方法，不能继承原型属性和方法，无法实现函数服用，每个子类都有父
类实例函数的副本，影响性能。
3. 实例继承，为父类实例添加新特性，作为子类实例返回，实例继承的特点是不限制调用方法，不管是new 子类（）还是子类（）返回
的对象具有相同的效果，缺点是实例是父类的实例，不是子类的实例，不支持多继承。
4. 拷贝继承：特点：支持多继承，缺点：效率较低，内存占用高（因为要拷贝父类的属性）无法获取父类不可枚举的方法（不可枚举方
法，不能使用for in 访问到）。
5. 组合继承：通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用。
6. 寄生组合继承：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免
的组合继承的缺点。

#### 事件委托以及冒泡
* 事件委托是利用冒泡阶段的运行机制来实现的，就是把一个元素响应事件的函数委托到另一个元素，一般是把一组元素的事件委托到他
的父元素上，委托的优点是减少内存消耗，节约效率，动态绑定事件。
* 事件冒泡，就是元素自身的事件被触发后，如果父元素有相同的事件，如onclick事件，那么元素本身的触发状态就会传递，也就是冒
到父元素，父元素的相同事件也会一级一级根据嵌套关系向外触发，直到document/window，冒泡过程结束。

#### ES6的一些新特性
ES6在变量的声明和定义方面增加了let、const声明变量，有局部变量的概念，赋值中有比较吸引人的结构赋值，同时ES6对字符串、 数
组、正则、对象、函数等拓展了一些方法，如字符串方面的模板字符串、函数方面的默认参数、对象方面属性的简洁表达方式，ES6也引
入了新的数据类型symbol，新的数据结构set和map,symbol可以通过typeof检测出来，为解决异步回调问题，引入了promise和 generator，
还有最为吸引人了实现Class和模块，通过Class可以更好的面向对象编程，使用模块加载方便模块化编程，当然考虑到 浏览器兼容性，
我们在实际开发中需要使用babel进行编译。

重要的特性：
1. 块级作用域：ES5只有全局作用域和函数作用域，块级作用域的好处是不再需要立即执行的函数表达式，循环体中的闭包不再有问题。
2. rest参数：用于获取函数的多余参数，这样就不需要使用arguments对象了。
3. promise:一种异步编程的解决方案，比传统的解决方案回调函数和事件更合理强大。
4. 模块化：其模块功能主要有两个命令构成，export和import，export命令用于规定模块的对外接口，import命令用于输入其他模块提
供的功能。

#### 箭头函数和function有什么区别
箭头函数根本就没有绑定自己的this，在箭头函数中调用 this 时，仅仅是简单的沿着作用域链向上寻找，找到最近的一个 this 拿来使
用。

#### vue的生命周期
Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、销毁等一系列过程，我们称
这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。每一个组件或者实例都会经历一个完整的生命周期，总共
分为三个阶段：初始化、运行中、销毁。

实例、组件通过new Vue() 创建出来之后会初始化事件和生命周期，然后就会执行beforeCreate钩子函数，这个时候，数据还没有挂载呢，
只是一个空壳，无法访问到数据和真实的dom，一般不做操作挂载数据，绑定事件等等，然后执行created函数，这个时候已经可以使用到
数据，也可以更改数据,在这里更改数据不会触发updated函数，在这里可以在渲染前倒数第二次更改数据的机会，不会触发其他的钩子函
数，一般可以在这里做初始数据的获取。接下来开始找实例或者组件对应的模板，编译模板为虚拟dom放入到render函数中准备渲染，然
后执行beforeMount钩子函数，在这个函数中虚拟dom已经创建完成，马上就要渲染,在这里也可以更改数据，不会触发updated，在这里可
以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取。接下来开始render，渲染出真实
dom，然后执行mounted钩子函数，此时，组件已经出现在页面中，数据、真实dom都已经处理好了,事件都已经挂载好了，可以在这里操作
真实dom等事情...当组件或实例的数据更改之后，会立即执行beforeUpdate，然后vue的虚拟dom机制会重新构建虚拟dom与上一次的虚拟
dom树利用diff算法进行对比之后重新渲染，一般不做什么事儿。当更新完成后，执行updated，数据已经更改完成，dom也重新render完
成，可以操作更新后的虚拟dom。当经过某种途径调用$destroy方法后，立即执行beforeDestroy，一般在这里做一些善后工作，例如清除
计时器、清除非指令绑定的事件等等。组件的数据绑定、监听...去掉后只剩下dom空壳，这个时候，执行destroyed，在这里做善后工作
也可以。

#### vue双向绑定原理
什么是数据双向绑定？Vue是一个MVVM框架，数据绑定简单来说，就是当数据发生变化时，相应的视图会进行更新，当视图更新时，数据
也会跟着变化。Vue.js则是通过数据劫持以及结合发布者-订阅者来实现的，数据劫持是利用ES5的Object.defineProperty(obj, key, val)
来劫持各个属性的的setter以及getter，在数据变动时发布消息给订阅者，从而触发相应的回调来更新视图。

实现最基础的数据绑定：
````html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="demo"></div>
    <input type="text" id="inp">
    <script>
        var obj  = {};
        var demo = document.querySelector('#demo')
        var inp = document.querySelector('#inp')
        Object.defineProperty(obj, 'name', {
            get: function() {
                return val;
            },
            set: function (newVal) {//当该属性被赋值的时候触发
                inp.value = newVal;
                demo.innerHTML = newVal;
            }
        })
        inp.addEventListener('input', function(e) {
            // 给obj的name属性赋值，进而触发该属性的set方法
            obj.name = e.target.value;
        });
        obj.name = 'hui';//在给obj设置name属性的时候，触发了set这个方法
    </script>
</body>
</html>
````

#### 什么是virtual dom
用JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中 当状态变更的时候，重新构造一棵新
的对象树。然后用新的树和旧的树进行比较，记录两棵树差异 把所记录的差异应用到所构建的真正的DOM树上，视图就更新了。
Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。

#### 如何理解前端模块化
前端模块化就是复杂的文件编程一个一个独立的模块，比如js文件等等，分成独立的模块有利于重用（复用性）和维护（版本迭代），这
样会引来模块之间相互依赖的问题，所以有了commonJS规范，AMD，CMD规范等等，以及用于js打包（编译等处理）的工具webpack。

#### 什么是按需加载
当用户触发了动作时才加载对应的功能。触发的动作，是要看具体的业务场景而言，包括但不限于以下几个情况：鼠标点击、输入文字、
拉动滚动条，鼠标移动、窗口大小更改等。加载的文件，可以是JS、图片、CSS、HTML等。

#### webpack
本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构
建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
