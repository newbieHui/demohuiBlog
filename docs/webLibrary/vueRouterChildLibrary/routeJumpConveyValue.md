# 路由跳转传值问题
---
在前端项目中我们经常会碰到路由跳转时的传值问题，这里就来总结一下常用的几种方法：

### 1.$router.push()
* params传参

传值：
````js
this.$router.push({name:'login',params:{id:123456}})
````

取值：
````js
this.$route.params.id
````

* query传参

传值：
````js
this.$router.push({path:'/login/index',query:{id:123456}})
````

取值：
````js
this.$route.query.id
````

注意：**params传参时路径不能使用path,只能使用name**，不然获取不到所传的参数。使用query传参可以在浏览器地址栏中看到所传参数，
使用params传参时在地址栏中看不到所传参数。

> $router 和 $route的区别:
$route为当前router跳转对象里面可以获取name、path、query、params等,$router为VueRouter实例，想要导航到不同URL，则使用$router.push方法
返回上一个history也是使用$router.go方法。

### 2.localStorage

存数据
````js
let conveyData = JSON.parse(JSON.stringify({name:'DemoHui',age:'25'}));
localStorage.conveyData = JSON.stringify(conveyData)
````

取数据：
````js
this.constData = JSON.parse(localStorage.conveyData);
````

注意：IE8以上的IE版本才支持localStorage这个属性；目前所有的浏览器中都会把localStorage的值类型限定为string类型，
这个在对我们日常比较常见的JSON对象类型需要一些转换；localStorage在浏览器的隐私模式下面是不可读取的；
localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡；localStorage不能被爬虫抓取到；
localStorage与sessionStorage的唯一一点区别就是localStorage属于永久性存储，而sessionStorage属于当会话结束的时候，sessionStorage中的键值对会被清空。

> JSON.stringify()方法将JavaScript对象转换为字符串；JSON.parse()方法将数据转换为JavaScript对象；
JSON.parse(JSON.stringify(obj))我们一般用来深拷贝，其过程说白了 就是利用JSON.stringify 将js对象序列化（JSON字符串），
再使用JSON.parse来反序列化(还原)js对象；序列化的作用是存储(对象本身存储的只是一个地址映射)和传输。

### 3.vuex
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，
并以相应的规则保证状态以一种可预测的方式发生变化。




