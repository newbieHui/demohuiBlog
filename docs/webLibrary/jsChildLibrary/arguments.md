### Arguments
#### 1.Arguments.callee
arguments.callee指代当前正在执行的函数。该属性只定义在函数体中。
````js
// 匿名函数内使用callee属性来引用匿名函数本身
var factorial = function(x) {
	if(x < 2) return 1;
	else return x*arguments.callee(x-1);
}
var y = factorial(5);
````

#### 2.Arguments.length
arguments对象的length属性表示传给当前函数的参数个数。该属性只定义在函数体中。

**注意该属性表示的是实际传入的参数个数，而不是声明的参数个数**
````js
// 使用arguments.length来检查传入参数个数的正确性
function check(args) {
    var actual = args.length;
    var expected = args.callee.length;
    if(actual != expected) {
        throw new Error("传入的参数个数不对，期望值：" + expected + ";实际值：" + actual);
    }
}
````
