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

### 3.作为对象的方法调用：
1.当函数作为对象的方法调用时，此时this指向当前这个对象。但如果将对象中的函数赋值给一个变量，并没有立即执行，此时this的值就要根据函数执行时所在的环境对象
进行判断：
```js
var x = 1;
var demo = {
	x: 2,
	getX: function(){
		console.log(this.x);
	}
}

demo.getX();   // 2
var b = demo.getX;
b();   // 1
```
在上例中函数直接作为对象的方法调用，this指向当前对象，所以输出值为2。如果将对象先赋给一变量b,b运行在全局环境中，所以this指向全局变量，输出值为1。
2.当函数被多个对象嵌套，此时this指向直接调用函数的上一级对象：
```js
var x = 1;
var demo = {
	x: 2,
	y: {
		x: 3,
		getX: function(){
			console.log(this.x);
		}
	}
}

demo.y.getX();   // 3
var b = demo.y.getX;
b();   // 1
```
3.嵌套函数中的this调用：
```js
var demo = {
    x: function() {
        console.log(this === demo)
        getX()

        function getX() {
            console.log(this === demo)
            console.log(this)
        }
    }
}

demo.x()
```
![nesting](/img/nesting.png)

如上图，在嵌套函数gexX()中，this并不指向demo。嵌套的函数不会从调用它的函数中继承this，当嵌套函数作为函数调用时，其this值在非严格模式下
指向全局对象，严格模式下为undefined。