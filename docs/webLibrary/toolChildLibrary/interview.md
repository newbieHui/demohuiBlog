# 三省
---
#### 1.http和https
* http,超文本传输协议，是一个客户端和服务器端请求和应答的标准(TCP)
* https是以安全为目标的http通道，在http下加入SSL层，https的安全基础是SSL,https的SSL加密是在传输层实现的。https协议的主要
作用是建立一个信息安全通道，确保数据的传输和网站的真实性。

#### 2.HTTP支持的方法
* GET, POST, HEAD, OPTIONS, PUT, DELETE, TRACE, CONNECT

#### 3.get和post
* get从指定的资源请求数据；post向指定的资源提交要被处理的数据。
* get参数通过url传递，post放在request body中。
* get请求在url中传递的参数是有长度限制的，而post没有。
* get比post更不安全，因为参数直接暴露在url中，所以不能用来传递敏感信息。
* get请求只能进行url编码，而post支持多种编码方式。
* get请求会浏览器主动cache。
* get请求参数会被完整保留在浏览历史记录里，而post中的参数不会被保留。
* get和post本质上就是TCP链接，并无差别。但是由于HTTP的规定和浏览器/服务器的限制，导致他们在应用过程中体现出一些不同。
* get产生一个TCP数据包；post产生两个TCP数据包。
* 对于get方式的请求，浏览器会把http header和data一并发送出去，服务器响应200(返回数据)；而对于POST，浏览器先发送header，
服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。

#### 4.状态码
* 200，OK，请求成功。
* 400，Bad Request，请求语义参数有误。前端提交的数据格式不符合后端规范。
* 401，Unauthorized，当前请求需要用户验证。
* 403，Forbidden，服务器收到请求，但拒绝执行。
* 404, Not Unauthorized，服务器无法根据客户端的请求找到资源(网页)。
* 500，Internal Server Error，服务器内部错误，无法完成请求。
* 502，Bad Gateway，作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应。
* 504，Gateway Time-out，充当网关或代理的服务器，未及时从远端服务器获取请求。
* 505，HTTP Version not supported，服务器不支持请求的HTTP协议的版本，无法完成处理。

#### 5.cookie、sessionStorage,localStorage
* cookie,cookie数据始终在同源的http请求中携带，即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自
动把数据发给服务器，仅在本地保存。cookie数据还有路径(path)的概念，可以限制cookie只属于某个路径下,存储的大小很小只有4K
左右。cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
* cookie的作用：
1. 保存用户登录状态：例如将用户id存储于一个cookie内，这样当用户下次访问该页面时就不需要重新登录了。cookie还可以设置过期
时间，当超过时间期限后，cookie就会自动消失。
2. 跟踪用户行为：例如一个天气预报网站，能够根据用户选择的地区显示当地的天气情况。如果每次都需要选择所在地是烦琐的，当利
用了cookie后就会显得很人性化了，系统能够记住上一次访问的地区，当下次再打开该页面时，它就会自动显示上次用户所在地区的天气
情况。因为一切都是在后台完成，所以这样的页面就像为某个用户所定制的一样，使用起来非常方便。
* sessionStorage，仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持，可以保存5M的信息。
* localStorage，始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据，可以保存5M的信息。
* sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage：在所有同源窗口都是共享的；cookie：也是在所有
同源窗口中共享的。

#### 6.cookie和session
1. cookie数据存放在客户的浏览器上，session数据放在服务器上。
2. cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗，考虑到安全应当使用session。
3. session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能，考虑到减轻服务器性能方面，应当使用COOKIE。
4. 单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

#### 7.cookie如何防范XSS攻击
XSS（跨站脚本攻击）是指攻击者在返回的HTML中嵌入javascript脚本，为了减轻这些攻击，需要在HTTP头部配上'set-cookie：httponly'
这个属性可以防止XSS,它会禁止javascript脚本来访问cookie。'secure'这个属性告诉浏览器仅在请求为https的时候发送cookie。

#### 8.web worker
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
#### 9.HTML语义化标签
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

#### 10.HTML5新特性
1. html5为了更好的实践web语义化，增加了header，footer，nav,aside,section,main article figure等语义化标签。
2. 在表单方面，新的表单控件calender date time email url search。新的input类型 color date datetime datetime-local email。
3. 在存储方面，提供了sessionStorage，localStorage,和本地离线存储(把需要离线存储在本地的文件列在一个manifest配置文件)，通
过这些存储方式方便数据在客户端的存储和获取。
4. 在多媒体方面规定了音频和视频元素audio和video。
5. 另外还有地理定位，canvas绘图，支持内联SVG，拖放，多线程编程的web worker和websocket协议。

#### 11.CSS3新特性
1. CSS3边框如border-radius，box-shadow等。
2. CSS3背景如background-size，background-origin等。
3. CSS3 2D，3D转换如transform等。
4. CSS3动画如animation等。

#### 12.在地址栏里输入一个URL,到这个页面呈现出来，中间会发生什么？
1. DNS解析
2. TCP连接
3. 发送HTTP请求
4. 服务器处理请求并返回HTTP报文
5. 浏览器解析渲染页面
6. 连接结束

#### 13.浏览器在生成页面的时候，会生成那两颗树？
1. 构造两棵树，DOM树和CSSOM规则树。
2. 当浏览器接收到服务器相应来的HTML文档后，会遍历文档节点，生成DOM树；CSSOM规则树由浏览器解析CSS文件生成。

#### 14.前端优化
* 降低请求量：合并资源，减少HTTP 请求数，minify / gzip 压缩，webP，lazyLoad。
* 加快请求速度：预解析DNS，减少域名数，并行加载，CDN 分发。
* 缓存：HTTP 协议缓存请求，离线缓存 manifest，离线数据缓存localStorage。
* 渲染：JS/CSS优化，加载顺序，服务端渲染，pipeline。

#### 15.CSRF和XSS的网络攻击及防范
1. CSRF：跨站请求伪造，是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。跟跨网站脚本（XSS）相比，XSS
 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。目前防御 CSRF 攻击主要有三种策略：验证 
 HTTP Referer 字段；在请求地址中添加 token 并验证；在 HTTP 头中自定义属性并验证。
2. XSS：跨站脚本攻击，是说攻击者通过注入恶意的脚本，在用户浏览网页的时候进行攻击，比如获取cookie，或者其他用户身份信息，
可以分为存储型和反射型，存储型是攻击者输入一些数据并且存储到了数据库中，其他浏览者看到的时候进行攻击，反射型的话不存储在
数据库中，往往表现为将攻击代码放在url地址的请求参数中。防御的话为cookie设置httpOnly属性，对用户的输入进行检查，进行特殊
字符过滤 。

#### 16.CSS盒模型
就是用来装页面上的元素的矩形区域。CSS中的盒子模型包括IE盒子模型和标准的W3C盒子模型。

区别：这两种盒子模型最主要的区别就是width的包含范围，在标准的盒子模型中，width指content部分的宽度，在IE盒子模型中，width
表示content+padding+border这三个部分的宽度，故这使得在计算整个盒子的宽度时存在着差异：

标准盒子模型的盒子宽度：左右border+左右padding+width
IE盒子模型的盒子宽度：width

在CSS3中引入了box-sizing属性，box-sizing:content-box;表示标准的盒子模型，box-sizing:border-box表示的是IE盒子模型。最后，
前面我们还提到了，box-sizing:padding-box,这个属性值的宽度包含了左右padding+width也很好理解性记忆，包含什么，width就从什
么开始算起。

#### 17.Flex布局
Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。布局的传统解决方案，基于盒状模型，依赖display
属性 + position属性 + float属性。它对于那些特殊布局非常不方便，比如，垂直居中就不容易实现。

#### 18.BFC(块级格式化上下文，用于清楚浮动，防止margin重叠等)
块级格式化上下文，是一个独立的渲染区域，并且有一定的布局规则。BFC区域不会与float box重叠；BFC是页面上的一个独立容器，子
元素不会影响到外面；计算BFC的高度时，浮动元素也会参与计算。

哪些元素会生成BFC：
* 根元素
* float不为none的元素
* position为fixed和absolute的元素
* display为inline-block、table-cell、table-caption，flex，inline-flex的元素
* overflow不为visible的元素

#### 19.元素垂直居中的方法
1.父元素display:flex,align-items:center;

2.元素绝对定位，top:50%，margin-top：-（高度/2）

3.高度不确定用transform：translateY（-50%）

4.父元素table布局，子元素设置vertical-align:center;

#### 20.实现图片在某个容器中居中
1.父元素固定宽高，利用定位及设置子元素margin值为自身的一半。

2.父元素固定宽高，子元素设置position: absolute，margin：auto平均分配margin。

3.css3属性transform。子元素设置position: absolute; left: 50%; top: 50%;transform: translate(-50%,-50%);

4.将父元素设置成display: table, 子元素设置为单元格 display: table-cell;

5.弹性布局display: flex。设置align-items: center; justify-content: center;

#### 21.将一个width300，height300实现在屏幕上垂直水平居中
1.父级元素设置text-align：center，然后设置line-height和vertical-align使其垂直居中，最后设置font-size：0消除近似居中的bug。

2.父级元素设置display：table-cell，vertical-align：middle达到水平垂直居中。

3.采用绝对定位，原理是子绝父相，父元素设置position：relative，子元素设置position：absolute，然后通过transform或margin组
合使用达到垂直居中效果，设置top：50%，left：50%，transform：translate（-50%，-50%）。

4.绝对居中，原理是当top,bottom为0时，margin-top&bottom设置auto的话会无限延伸沾满空间并平分，当left，right为0时，
margin-left&right设置auto会无限延伸占满空间并平分。

5.采用flex，父元素设置display：flex，子元素设置margin：auto。

6.视窗居中，vh为视口单位，50vh即是视口高度的50/100，设置margin：50vh auto 0，transform：translate(-50%)

#### 22.块元素和行元素
块元素：独占一行，并且有自动填满父元素，可以设置margin和padding以及高度和宽度。

行元素：不会独占一行，width和height会失效，并且在垂直方向的padding和margin会失效。

#### 23.双边距重叠问题(外边距折叠)
多个相邻（兄弟或者父子关系）普通流的块元素垂直方向margin会重叠
折叠的结果为：
* 两个相邻的外边距都是正数时，折叠结果是它们两者之间较大的值。

* 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值。

* 两个外边距一正一负时，折叠结果是两者的相加的和。

#### 24.position属性
Position属性把元素放置在一个静态的，相对的，绝对的，固定的位置中:
* Static：位置设置为static的元素，他始终处于页面流给予的位置，static元素会忽略任何top,bottom,left,right声明。
* Relative：位置设置为relative的元素，可将其移至相对于其正常位置的地方，因此left：20会将元素移至元素正常位置左边20个像素
的位置。
* Absolute：此元素可定位于相对包含他的元素的指定坐标，此元素可通过left，top等属性规定。
* Fixed：位置被设为fixed的元素，可定为与相对浏览器窗口的指定坐标，可以通过left，top，right属性来定位。

#### 25.清除浮动
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

#### 26.让一个元素消失
1.opacity：0，该元素隐藏起来了，但不会改变页面布局，并且，如果该元素已经绑定一些事件，如click事件，那么点击该区域，也能
触发点击事件。

2.visibility：hidden，该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已经绑定的事件。

3.display：none，把元素隐藏起来，并且会改变页面布局，可以理解成在页面中把该元素删除掉。

#### 27.line-height和height的区别
line-height一般是指布局里面一段文字上下行之间的高度，是针对字体来设置的，height一般是指容器的整体高度。

#### 28. inline-block、inline和block的区别
* block：块级元素，其前后都会有换行符，能设置宽度，高度，margin/padding水平垂直方向都有效。
* inline：设置width和height无效，margin在竖直方向上无效，padding在水平方向垂直方向都有效，前后无换行符。
* inline-block：能设置宽度高度，margin/padding水平垂直方向 都有效，前后无换行符。

#### 29.三栏布局
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

#### 30.css布局
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