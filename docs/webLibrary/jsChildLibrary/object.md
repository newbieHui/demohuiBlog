# Object
---

### 1.Object.freeze()：
Object.freeze()方法用来冻结一个对象，被冻结的对象不能被修改。一个冻结的对象不可添加新的属性，不可删除已有属性，不可修改此对象已有属性的可枚举性，
可配置性，以及不可修改属性的值。此外，冻结一个对象后该对象的原型也不能被修改。
> Object.freeze(obj)

参数 | 描述 |
:-: | :-: |
obj | 要被冻结的对象。 |

返回值：这个方法返回传递的对象，而不是创建一个被冻结的副本。

````js
const object1 = {
  property1: 42
};

const object2 = Object.freeze(object1);

object2.property1 = 33;
// Throws an error in strict mode

console.log(object2.property1);
// expected output: 42
````

> 2019/3/25 17:35

### 2.Object.prototype.toString.call(..)：
所有typeof返回值为"object"的对象(如数组)都包含一个内部属性[[class]](我们可以将它看作一个内部的分类，而非传统意义上的面向对象意义上的
类)。这个属性无法直接访问，一般通过Object.prototype.toString.call(..)来查看:
````js
Object.prototype.toString.call([1,2,3]);   // "[object Array]"
Object.prototype.toString.call(/regex-litera/i);   // "[object RegExp]"
Object.prototype.toString.call(null);   // "[object Null]"
Object.prototype.toString.call(undefined);   // "[object Undefined]"
Object.prototype.toString.call('abc');   // "[object String]"
Object.prototype.toString.call(42);   // "[object Number]"
Object.prototype.toString.call(true);   // "[object Boolean]"
````

### 3.Object.defineProperty()：