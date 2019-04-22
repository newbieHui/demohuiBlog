# es6学习笔记
---
> ES6，全称ECMAScript 6.0，是 JaveScript 的下一个版本标准，2015.06 发版。

### 1.let与const
let和const是es6新增加的两个JavaScript关键字。

**let 声明的变量只在 let 命令所在的代码块内有效。**

**const 声明一个只读的常量，一旦声明，常量的值就不能改变。**

#### 1.1 let
* 基本用法：
用来声明变量，用法类似于var，**所声明的变量只在let命令所在的代码块内有效**。
```js
{
	let a = 1;
	var b = 2;
}

a   // a is not defined 
b   // 2
```

let在for循环中还有一个特别之处，循环变量部分是一个父作用域，循环体内部是一个单独的子作用域:
```js
for(let i=0;i<3;i++) {
	let i = 'hello world';
	console.log(i);   // hello world
}
```

* 不存在变量提升：
var命令会发生变量提升现象，即变量可以在声明之前使用，值为undefined。**let命令改变了这种语法行为，它所声明的变量一定要在声明后使用，否则报错**。

```js
//var的情况
console.log(demo);   // undefined
var demo = 1;

//let的情况
console.log(demo);   //Uncaught ReferenceError: bar is not defined
var demo = 1;
```

* 暂时性死区：
只要块级作用域内存在let命令，它所声名的变量就不再受外部的影响。
“暂时性死区”也意味着typeof不再是一个百分之百安全的操作。
```js
typeof x; // ReferenceError
let x;
```
这样的设计是为了让大家养成良好的编程习惯，变量一定要在声明之后使用，否则就报错。
````js
function demo(x = y, y = 2) {
  return [x, y];
}

demo(); // 报错
````
上面代码中，调用demo函数之所以报错，是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于“死区”。

*不允许重复声明：
let不允许在相同作用域内，重复声明同一个变量。

#### 1.1 const
* 基本用法：
const声明一个只读的常量。一旦声明，常量的值就不能改变。const声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化，不能留到以后赋值。
const的作用域与let命令相同：只在声明所在的块级作用域内有效。
const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
const声明的常量，也与let一样不可重复声明。
* 本质：
const实际上保证的，**并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动**。对于简单类型的数据（数值、字符串、布尔值），
值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，
const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。

````js
const demo = {};

// 为 demo 添加一个属性，可以成功
demo.prop = 123;
demo.prop   // 123

// 将 foo 指向另一个对象，就会报错
demo = {}; // TypeError: "foo" is read-only
````
___
````js
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['demo'];    // 报错
````

如果真的想将对象冻结，应该使用Object.freeze方法。
````js
const demo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
demo.prop = 123;
````
#### ES6 声明变量的六种方法:
ES5 只有两种声明变量的方法：var命令和function命令。ES6 除了添加let和const命令，还有另外两种声明变量的方法：import命令和class命令。
所以，ES6 一共有 6 种声明变量的方法。var命令和function命令声明的全局变量，依旧是顶层对象的属性；let命令、const命令、class命令声明的全局变量，
不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

### 2.Set与Map

#### 2.1 Set
Set是ES6的一种新数据结构。它类似于数组，但是**成员的值都是唯一的**，没有重复的值。

````js
const demo = new Set();
[2,2,5,6,5,7,7,9,2].forEach(x => demo.add(x));

for(let i of demo) {
	console.log(i);
}
// 2 5 6 7 9 通过add()方法向Set结构加入成员，没有重复的值。
````

Set本身是一个构造函数，用来生成Set数据结构。

Set函数可以接受一个数组作为参数，用于初始化：

````js
const set = new Set([1,1,2,2,3,4,5,5,8]);
[...set]   // [1,2,3,4,5,8]
set.size   // 6
````
___
````js
[...new Set(array)]    // 可用于数组去重
````
___
````js
[...new Set('ababbc')].join('')    // 可用于字符串去重
// "abc"
````
向Set加入值的时候，不会发生类型转换。Set内部判断两个值是否不同使用的算法为“Same-value-zero-equality”,类似于(===)。主要区别在于
Set认为NaN等于自身，而精确相等运算符认为NaN不等于自身。而且，两个对象总是不相等的，被视为两个值。

> 2019/3/14 19:00

* 类型转换：
````js
//Array 转 Set
let demoSet = new Set (['value1','value2','value3']);

//Set 转 Array(...操作符)
let demoArray = [...demoSet];

//String 转 Set
let demoSet = new Set('hello');   // {"h", "e", "l", "l", "o"}
[...demoSet]   // ["h", "e", "l", "o"]
````

* Set对象作用：

````js
//数组去重
let demoSet = new Set([1,1,2,3,4,5,,4,5,6,6,7]);
[...demoSet]   // [1, 2, 3, 4, 5, undefined, 6, 7]

//并集
let demo1 = new Set([1,2,3,4]);
let demo2 = new Set([2,2,3,4]);
let union = new Set([...demo1,...demo2]);

console.log(union);   // {1, 2, 3, 4}

//交集
let demo1 = new Set([1,2,3,4]);
let demo2 = new Set([2,2,3,4]);
let intersect = new Set([...demo1].filter(x => demo2.has(x)));

console.log(intersect);   // {2, 3, 4}

//差集
let demo1 = new Set([1,2,3,4]);
let demo2 = new Set([2,2,3,4]);
let difference = new Set([...demo1].filter(x => !demo2.has(x)));

console.log(difference);   // {1}
````
#### 2.2 WeakSet
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是WeakSet 的成员只能是对象，而不能是其他类型的值。WeakSet 没有size属性，没有办法遍历它的成员。
其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用。