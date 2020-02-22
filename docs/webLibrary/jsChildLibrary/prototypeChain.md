# 原型与原型链
---
### 1.构造函数：
在JavaScript中，当任意一个普通函数用于创建一类对象时，它就被称作构造函数。构造函数的特点是：
* 构造函数的首字母必须大写，用来区别于普通函数。
* 内部使用的this对象，来指向即将要生成的实例对象。
* 使用New来生成实例对象。
我们使用构造函数来创建一个对象：

```js
function Person(name) {
	this.name = name;
}
var demo = new Person('szhui');
console.log(demo.name);   // szhui
```
上面这个例子中，Person就是一个构造函数，demo是我们使用new创建的一个实例对象。

### 2.`prototype`：
在JavaScript中，每一个JavaScript对象(null除外)和另一个对象相关联，而这'另一个'对象就是这里要说的原型，每一个对象都从其原型继承属性。

所有通过对象直接量创建的对象都具有同一个原型对象，可以通过`Object.prototype`获得原型对象的引用。使用关键字new和构造函数调用调用创建的对象原型就是构造函数
的prototype属性的值。所以，和使用{}创建对象一样，通过new Object()创建的对象继承自Object.prototype；通过new Array()创建的对象原型是Array.prototype；通过
new Date()创建的对象原型是Date.prototype。

比较特殊的一个是Object.prototype，它是一个没有原型的对象，不继承任何属性。
![prototype](/img/prototype.png)

### 3.`__proto__`：
__proto__是对象的内部原型，这是每一个JavaScript对象(除了 null )都具有的一个属性，这个属性会指向该对象的原型。
```js
function Person() {

}
var demo = new Person();
console.log(demo.__proto__ === Person.prototype);   //true
```
___
```js
Number.__proto__ === Function.prototype   // true
Boolean.__proto__ === Function.prototype   // true
String.__proto__ === Function.prototype   // true
Object.__proto__ === Function.prototype   // true
Function.__proto__ === Function.prototype   // true
Array.__proto__ === Function.prototype   // true
RegExp.__proto__ === Function.prototype   // true
Error.__proto__ === Function.prototype   // true
Date.__proto__ === Function.prototype   // true
Math.__proto__ === Object.prototype   // true
JSON.__proto__ === Object.prototype   // true
```
___
```js
console.log(typeof Function.prototype) // function
console.log(typeof Object.prototype)   // object
console.log(typeof Number.prototype)   // object
console.log(typeof Boolean.prototype)  // object
console.log(typeof String.prototype)   // object
console.log(typeof Array.prototype)    // object
console.log(typeof RegExp.prototype)   // object
console.log(typeof Error.prototype)    // object
console.log(typeof Date.prototype)     // object
console.log(typeof Object.prototype)   // object
```
___
```js
console.log(Function.prototype.__proto__ === Object.prototype) // true
```
___
那么Object.prototype的__proto__是谁？
```js
Object.prototype.__proto__ === null  // true
```
已经到顶了，为null。
![proto](/img/proto.png)

实例对象和构造函数都可以指向原型。

### 4.`constructor`：
每个原型都有一个 constructor 属性指向关联的构造函数：
```js
function Person() {

}
console.log(Person === Person.prototype.constructor);   // true
```
![constructor](/img/constructor.png)
```js
function Person() {

}
var demo = new Person();

console.log(demo.__proto__ == Person.prototype)   // true
console.log(Person.prototype.constructor == Person)   // true
//获得对象的原型
console.log(Object.getPrototypeOf(demo) === Person.prototype)   // true
```

### 5.实例与原型：
来看几个例子：

1.
```js
function Person(){
	this.name  = "szh";
}
function ChildPerson(age){
	this.age = age;
}
ChildPerson.prototype = new Person();
var demo1 = new ChildPerson('25');
var demo2 = new ChildPerson('26');
console.log(demo1.age);   // 25
console.log(demo2.age);   //26
console.log(demo1.name);   //szh
console.log(demo2.name);   //szh
```
2.
```js
function Person(){
	this.name  = "szh";
}
function ChildPerson(age){
	this.age = age;
}
ChildPerson.prototype = new Person();
var demo1 = new ChildPerson('25');
var demo2 = new ChildPerson('26');
demo1.name = 'szhui';
console.log(demo1.age);   // 25
console.log(demo2.age);   // 26
console.log(demo1.name);   // szhui
console.log(demo2.name);   // szh
```
3.
```js
function Person(){
	this.name  = "szh";
}
function ChildPerson(age){
	this.age = age;
}
ChildPerson.prototype = new Person();
var demo1 = new ChildPerson('25');
var demo2 = new ChildPerson('26');
demo1.name = 'szhui';
console.log(demo1.age);   //25
console.log(demo2.age);   //26
console.log(demo1.name);   //szhui
console.log(demo2.name);   //szh
delete demo1.name;
console.log(demo1.age);   //25
console.log(demo2.age);   //26
console.log(demo1.name);   //szh
console.log(demo2.name);   //szh
```
在第二个例子中我们给demo1属性name赋值为szhui，所以我们打印demo1.name值自然为szhui;在第三个例子中，当我们删掉demo1的属性name时，读取demo1中对象是找不到name
属性的，这时就会从demo1的原型demo1.__proto__(也就是Person.prototype)中查找。

所以总的关系图如下图所示，图中由相互关联的原型组成的链状结构就是原型链，也就是图中黑色的线：
![prototypeChain](/img/prototypeChain.png)

> 2019/3/7 17:50
