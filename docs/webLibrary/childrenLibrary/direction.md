# js中的this
---

### 1.this是什么：
在JavaScript中我们经常用到this，那么这个关键字到底是什么，我们今天就来整理一个this的几种用法。

this是函数运行时，在函数体内部自动生成的一个对象(它可以是全局对象，当前对象，或者任意对象)，而且只能在函数体内部使用。函数的不同使用场合，this有着不同的值。总的来说，
this就是函数运行时所在的环境对象。

### 2.全局对象：
1.在全局环境中，this指向全局对象。在浏览器中，this就是window对象。
```js
var x = 1;

console.log(x);   // 1
console.log(this.x);   // 1
console.log(this === window);   // true
```
2.当函数在全局环境中被调用，在非严格模式下，函数中的this指向全局对象；如果是在严格模式下，this的值将会是undefined。
* 非严格模式下：
```js
var x = 1;
function demo (){
	console.log(this.x);
}
demo();   // 1
```
* 严格模式下：
```js
"use strict"
var x = 1;
function demo (){
	console.log(this.x);
}

demo();
```
![useStrict](/img/useStrict.png)

如图，运行后报错，因为在严格模式下，此时的this为undefined。
