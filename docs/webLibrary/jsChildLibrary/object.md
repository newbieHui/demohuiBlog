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