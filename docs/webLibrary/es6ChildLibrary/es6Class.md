# ES6 Class 类
---
class
1. Js中生成实例对象的传统方法是使用构造函数
````js
function Person(name,weight){
    this.name = name;
    this.weight = weight;
}

Person.prototype.toString = function(){
    return '(' + this.name + ',' + this.weight + ')';
};

var p = new Person('tom',125);
console.log(p);   //Person { name: 'tom', weight: 125 }
console.log(p.toString());   //(tom,125)
````
2.ES6 class
````js
class Person {
     // 构造方法
    constructor(name,weight){
    this.name = name;
        this.weight = weight;
    }
    toString(){
        return '(' + this.name + ',' + this.weight + ')';
    }
}

var p = new Person('tom',125);
console.log(p)
````
如上，ES5的构造函数Person，对应ES6 Person类的构造方法

// class Person {}
// typeof Person
// console.log(typeof Person)   //function

// Person === Person.prototype.constructor;   //true
//类的数据类型就是函数，类本身指向构造函数

// class Person{
//     constructor(){}
//     talk(){}
//     stand(){}
// }
//等同于
// Person.prototype = {
//     constructor(){},
//     talk(){},
//     stand(){}
// }

// Object.assign方法可以一次向类添加多个方法

// class Person {
//     constructor(name,weight){
//         this.name = name;
//         this.weight = weight;
//     }
// }

// Object.assign(Person.prototype,{
//     talk(){},
//     stand(){}
// });

// 类的内部定义的方法都是不可枚举的

// class Person {
//     constructor(){}
//     talk(){}
//     stand(){}
// }

// Object.keys(Person.prototype) // []

// 获取对象所有属性包括不可枚举的可以使用Object.getOwnPropertyNames
// Object.getOwnPropertyNames(Person.prototype)   //[ 'constructor', 'talk', 'stand' ]

// class Person {
//     constructor(name,weight){
//         this.name = name;
//         this.weight = weight;
//     }
//     talk(){}
// }
// var p = new Person('tom',125);
// p.hasOwnProperty('name')   //true
// p.hasOwnProperty('weight')   //true
// p.hasOwnProperty('talk')   //false
// // hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性(也就是，是否有指定的键)。
// p.__proto__.hasOwnProperty('talk');   //true

//所以我们也可以通过实例的__proto__向类添加方法
// p.__proto__.printName = function(){
//     console.log(this.name)
// } 

// p.printName()   //tom

// class Person {
//     constructor(name,weight){
//         this.name = name;
//         this.weight = weight;
//     }
//     get prop(){
//         return this.name;
//     }

//     set prop(value){
//         this.name = value;
//     }
// }

// let p = new Person();
// p.prop
// p.prop = 'demo'
// console.log(p.name)   //demo

// 静态方法
// 类相当于实例原型，在类中定义的方法都可以在实例中调用。如果在类中定义方法时加上static关键字，这时定义的方法叫做静态方法，不能被实例调用，可以直接通过类
// 来调用

// class Person{
//     static say(){
//         return 'Hello'
//     }
// }

// let p = new Person();
// // p.say();   // p.say is not a function
// Person.say();   // Hello

//如果静态方法包含this，则this指向类而不是实例
// class Person {
//     static talk(){
//         console.log('Hello')
//     }
//     talk(){
//         console.log('World')
//     }
//     static say(){
//         this.talk()
//     }
// }
// Person.say()   //Hello
// 上面代码中可以看出静态方法与实例方法可以同名

// class Person {
//     static talk(){
//         console.log('Hello')
//     }
// }

// class PersonA extends Person{}

// PersonA.talk()   //Hello

// 可以看出类的静态方法可以被继承使用
// class Person {
//     static talk(){
//         return 'Hello';
//     }
// }

// class PersonA extends Person{
//     static talk(){
//         return super.talk() + ", World"
//     }
// }
// console.log(PersonA.talk())   //Hello, World


//class的继承

// ES5通过修改原型链实现继承，ES6通过extends关键字实现继承

// class Person {}
// class PersonA extends Person {}
// 上面两个类没有任何代码块，所以这两个类完全相同，等于复制了一个Person类

// class Person {}
// class PersonA extends Person {
//     constructor(x,y,weight){
//         super(x,y);   //调用父类constructor(x,y)
//         this.weight = weight;
//     }
//     toString() {
//         return this.color + super.toString();   //调用父类toString()
//     }
// }
// super关键字表示父类的构造函数，用来新建父类this对象
// 子类必须在constructor中调用super方法，否则会在实例化的时候报错
// class Person{}
// class PersonA extends Person{
//     constructor(){}
// }
// let tom = new PersonA();   //Must call super constructor in derived class before accessing 'this' or returning from derived constructor

// 代码报错的原因是子类自己的this对象，必须先通过父类的构造函数进行塑造，得到与父类相同的属性和方法。如果不调用super方法，子类得不到this对象

// 在子类构造方法中，只有调用super后才可以使用this。这是因为子类实例的构建依赖于父类的实例，只有super方法才能调用分类实例。
// class Person{
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
//     }
// }

// class PersonA extends Person {
//     constructor(x,y,age){
//         // this.age = age;   //ReferenceError
//         // 调用super后才可以使用this
//         super();
//         this.age = age;
//     }
// }

// let tom = new PersonA(1,2,25);

// console.log(tom instanceof Person)   //true
// console.log(tom instanceof PersonA)   //true

// 父类的静态方法会被子类继承
// class Person{
//     static say(){
//         console.log('hello')
//     }
// }

// class PersonA extends Person {

// }

// PersonA.say();   // hello


// //Object.getPrototypeOf方法可以用来从子类上获取父类。
// Object.getPrototypeOf(PersonA) === Person   // true


// 类的prototype属性和__proto__属性
// (1)子类的__proto__属性，表示构造函数的继承，总是指向父类。

// (2)子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

class A {}
class B extends A {}

B.__proto__ === A   // true
B.prototype.__proto__ === A.prototype   // true

// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。





