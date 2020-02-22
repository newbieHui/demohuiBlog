# this
---

### 1.this是什么：
在JavaScript中我们经常用到this，this关键字是JavaScript中最复杂的机制之一。那么这个关键字到底是什么，我们今天就来整理一个this的几种用法。

this提供了一种更优雅的方式来隐式"传递"一个对象的引用，因此可以将API设计的更加简洁并且易于复用，但是如果太拘泥于this的字面意思就会产生一些误解。在开始学习之前我们要清楚
关于this指向自身和指向函数作用域这两种都是错误的理解。

this是函数运行时，在函数体内部自动生成的一个对象(它可以是全局对象，当前对象，或者任意对象)，而且只能在函数体内部使用。函数的不同使用场合，this有着不同的值。也就是说this
绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。总的来说，this就是函数运行时所在的环境对象。

### 2.this绑定规则：

#### 1.默认绑定
1.在全局环境中，this指向全局对象。在浏览器中，this就是window对象。
```js
var a = 2;

console.log(a);   // 2
console.log(this.a);   // 2
console.log(this === window);   // true
```
2.当函数在全局环境中被调用，在非严格模式下，函数中的this指向全局对象；如果是在严格模式下，this的值将会是undefined。
* 非严格模式下：
```js
var a = 2;
function demo (){
	console.log(this.a);
}
demo();   // 2
```
* 严格模式下：
```js
"use strict"
var a = 2;
function demo (){
	console.log(this.a);
}
demo();
```
![useStrict](/img/useStrict.png)

如图，运行后报错，因为在严格模式下，此时的this为undefined。

但是要注意一点，在严格模式下调用函数则不会影响默认绑定，但是通常代码中不会出现strict模式和非strict模式：
```js
function demo() {
    console.log(this.a);
}
var a = 2;
(function(){
    "use strict";
    demo();   // 2
})();
```
以上就是最常用的函数调用类型：独立函数调用，可以把这条规则看作是无法应用其他规则时的默认绑定。

#### 2.隐式绑定
另一条需要考虑的规则是调用位置是或有上下文，或者说是否被某个对象拥有或包含。首先思考下面这段代码：
```js
function demo(){
    console.log(this.a);
}
var obj = {
    a : 2,
    demo:demo
};
obj.demo();   // 2
```
当函数引用有上下文对象时，隐式绑定规则会把函数调用中的this绑定到这个上下文对象。因为调用demo()时this被绑定到obj,因此this.a和obj.a是
一样的。

对象属性引用链中只有上一层在调用位置中起作用。如下例：
```js
function demo(){
    console.log(this.a);
}
var obj2 = {
    a : 2,
    demo:demo
};
var obj1 = {
    a : 20,
    obj2:obj2
};
obj1.obj2.demo();   // 2
```
#### 3.隐式丢失
* 一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把this绑定到全局对象或undefined，当然这取决
于是否为严格模式。
```js
function demo(){
    console.log(this.a);
}
var obj = {
    a : 2,
    demo:demo
};
var bar = obj.demo;    //函数别名
var a = "oops,global";
bar();   // "oops,global"
```
虽然bar是obj.demo的一个引用，但是实际上，它引用的是demo函数本身，因此此时的bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

* 但是如果在传入回调函数时会发生什么，先来看下面这个例子：
```js
function demo(){
    console.log(this.a);
}
function doDemo(fn){
    // fn其实引用的是demo
    fn();
}
var obj = {
    a : 2,
    demo:demo
};
var a = "oops,global";
doDemo(obj.demo);   // "oops,global"
```
参数传递其实是一种隐式赋值，因此我们传入函数时也会被隐式赋值。

* 如果把函数传入语言内置的函数而不是传入自己声明的函数，会发生什么，来看下面这个例子：
```js
function demo(){
    console.log(this.a);
}
var obj = {
    a : 2,
    demo:demo
};
var a = "oops,global";
setTimeout(obj.demo,100);   // "oops,global"
```
可以看出结果和上面是相同的，回调函数丢失this绑定是非常常见的。除此之外，还有一种情况this的行为会出乎我们的意料：调用回调函数的函数可能
会修改this。

#### 4.显示绑定
我们知道JavaScript提供的大多数函数以及自己创建的所有函数都可以使用call(..)和apply(..)方法。它们的第一个参数是一个对象，是给this准备
的，接着在调用函数时将其绑定到this。因为可以直接指定this绑定对象，因此我们称之为显示绑定。
```js
function demo(){
    console.log(this.a);
}
var obj = {
    a : 2
};
demo.call(obj);   // 2
```
通过demo.call(..)我们可以在调用demo时强制把它的this绑定到obj上。可惜显示绑定仍然无法解决我们之前提出的丢失绑定问题。但是显示绑定的一
个变种可以解决这个问题。
```js
function demo(){
    console.log(this.a);
}
var obj = {
    a : 2
};
var bar = function() {
    demo.call(obj);
};
bar();   // 2
setTimeout(bar,100);   // 2
//硬绑定的bar不可能再修改它的this
bar.call(window);   // 2
```
这种绑定是一种显式的强制绑定，所以称为硬绑定。由于硬绑定是一种常用的模式，所以ES5提供了内置的方法Function.prototype.bind,它的用法如下：
```js
function demo(something){
    console.log(this.a, something);
    return this.a + something;
}
var obj = {
    a : 2
};
var bar = demo.bind(obj);
var b = bar(3);   // 2 3
console.log(b);   // 5
```
#### 5.new绑定
在使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：
* 1.创建(构造)一个全新的对象。
* 2.这个对象会被执行[[Prototype]]连接。
* 3.这个新对象会绑定到函数调用的this。
* 4.如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。
```js
function demo(a){
    this.a = a;
}
var bar = new demo(2);
console.log(bar.a);   // 2
```
> 2019/3/11 08:35

### 3.this绑定优先级：
* 1.函数是否在new中调用(new绑定)?如果是的话this绑定的是新创建的对象。
```js
var bar = new demo()
```
* 2.函数是否通过call,apply(显示绑定)或者硬绑定调用?如果是的话，this绑定的是指定的对象。
```js
var bar = demo.call(obj)
```
* 3.函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。
```js
var bar = obj.demo()
```
* 4.如果都不是的话，使用默认绑定。严格模式下绑定到undefined，否则绑定到全局对象。
```js
var bar = demo()
```
### 4.箭头函数：
箭头函数不适用上面this的四种标准规则，而是根据外层函数或者全局作用域来决定this。
```js
function demo(){
    // 返回一个箭头函数
    return (a) => {
        // this继承自demo
        console.log(this.a);
    };
}
var obj1 = {
    a:2
};
var obj2 = {
    a:3
};
var bar = demo.call(obj1);
bar.call(obj2);   // 2
```
**箭头函数的绑定无法被修改(new也不行)**

```js
function demo(){
    setTimeout(() => {
        console.log(this.a);
    },100)
}
var obj = {
    a:2
};
demo.call(obj);   // 2
```
**箭头函数可以像bind(..)一样确保函数的this被绑定到指定对象**

> 2020/02/22 15:58