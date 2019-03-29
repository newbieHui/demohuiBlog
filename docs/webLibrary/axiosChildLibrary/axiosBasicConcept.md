# 基本概念
---
Axios是一个基于promise的HTTP库，可以用在浏览器和node.js中。

### axios特性
* 从浏览器中创建[XMLHttpRequests](http://www.w3school.com.cn/xml/xml_http.asp)。
* 从node.js创建[http](http://www.runoob.com/http/http-tutorial.html)请求。
* 支持[Promise](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000) API。
* 拦截请求和响应。
* 转换请求数据和响应数据。
* 取消请求。
* 自动转换Json数据。
* 客户端支持防御XSRF。

### axios安装
* 使用npm：
> npm install axios
* 使用cdn：
````
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
````
### HTTP请求
在客户端和服务器之间进行请求-响应时，两种最常被用到的方法是：GET 和 POST。

#### GET - 从指定的资源请求数据。
![GET请求](/img/httpGet.png)
#### POST  - 向指定的资源提交要被处理的数据。
![POST请求](/img/httpPost.png)

### axios中GET,POST请求
* 执行GET请求：
````js
//为给定ID的user创建请求
axios.get('/user?ID=12345').then(function(response){
	console.log(response);
}).catch(function(error){
	console.log(error);
});

//上面请求也可写成这样
axios.get('/user',{
	params:{
		ID:12345
	}
}).then(function(response){
	console.log(response);
}).catch(function(error){
	console.log(error);
});
````
* 执行POST请求：
````js
axios.post('/user',{
	name:'demo',
	password:'12345'
}).then(function(response){
	console.log(response);
}).catch(function(error){
	console.log(error);
});
````
* 执行多个并发请求
````js
function getUserAccount() {
	return axios.get('/user/12345');
}

function getUserPermissions() {
	return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(),getUserPermissions()]).then(axios.spread(function(acctResp,permsResp){
	//两个请求都执行完成
	console.log(acctResp.data);
	console.log(permsResp.data);
}));
````

* 获取远端图片
````js
//获取远端图片
axios({
	method:'get',
	url:'http://bit.ly/2mTM3nY',
	responseType:'stream'
}).then(function(response){
	response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
````

### 配置默认值
___
````js
const instance = axios.create({
	baseURL:'',
	url:'',
	method:'post',
	timeout:10000,
	withCredentials:false
});
````

### 拦截器
在请求或响应被then或catch处理前拦截它们。
* 添加请求拦截器
````js
axios.interceptors.request.use(function(config){
	//在发送请求之前做些什么
	return config;
},function(error){
    //对请求错误做点什么
	return Promise.reject(error);
});
````

* 添加响应拦截器
````js
axios.interceptors.response.use(function(response){
	//对响应数据做点什么
	return response;
},function(error){
	//对响应错误做点什么
	return Promise.reject(error);
});
````
___
[axios中文文档](http://www.axios-js.com/zh-cn/docs/)