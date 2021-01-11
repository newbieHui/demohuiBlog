### Array
#### 1. Array.concat(value, ...)
衔接数组

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.concat(value, ...) | 任意个要衔接到array中的值 | 一个新数组 |

* 描述
    
    concat()会将参数衔接到array中得到一个新数组并返回，它不会改变array。

    **如果传入的参数是一个数组，则会将数组元素衔接到array中，而不是数组本身**

* 示例
    ````js
    var a = [1,2,3];
    a.concat(4,5);    //返回[1,2,3,4,5]
    a.concat([4,5]);    //返回[1,2,3,4,5]
    a.concat([4,5],[6,7]);    //返回[1,2,3,4,5,6,7]
    a.concat([4,5],[6,[7,8]]);    //返回[1,2,3,4,5,6,[7,8]]
    ````
  
#### 2. Array.every()
测试断言函数是否对每个元素为真

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.every(predicate)<br>array.every(predicate, o) | predicate:测试数组元素的断言函数<br>o:调用predicate时可选this值 | true或false |

* 描述
    
    every()方法会按照序号从小到大顺序遍历array的元素，并对每个元素调用指定的
    predicate函数。如果predicate返回false，则every会停止遍历，并立刻返回false

* 示例
    ````js
    [1,2,3].every(function(x) { return x<5 });    //返回true,所有元素小于5
    [1,2,3].every(function(x) { return x>5 });    //返回false,不是所有元素都大于5
    [].every(function(x) { return false });   //返回true,[]总是返回true
    ````
  
#### 3. Array.filter()
返回通过断言的数组元素

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.filter(predicate)<br>array.filter(predicate, o) | predicate:判断array中的元素是否需要包含在返回数组中的调用函数<br>o:调用predicate时可选this值 | 一个新数组 |

* 描述
    
    filter()会创建一个新数组，包含在那些让predicate函数返回真值的元素

* 示例
    ````js
    [1,2,3].filter(function(x) { return x>1 });    //返回[2,3]
    ````
  
#### 4. Array.forEach()
为每一个数组元素调用函数

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.forEach(f)<br>array.forEach(f, o) | f:为array的每一个元素调用的函数<br>o:调用predicate时可选this值 | 无返回值 |

* 描述
    
    forEach()按照序号从小到大遍历array,并对每一个元素调用一次f。
    
    **注意forEach没有返回值**

* 示例
    ````js
    var a = [1,2,3];
    a.forEach(function(x,i,a) { a[i]++ });    //a现在是[2,3,4]
    ````
  
#### 5. Array.indexOf()
查找数组

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.indexOf(value)<br>array.indexOf(value,start) | value:要在array中查找的值<br>start:开始查找的可选数组序号 | 返回元素所在位置值，不匹配则返回-1 |

* 描述
    
    该方法在array中查找等于value的元素，并返回所找到第一个元素的序号。查找的起始位置是start指定的数组序号，
    如果没有指定则从0开始。判断是否相等使用的是“===”，如果未找到匹配的元素则返回-1。

* 示例
    ````js
    ['a','b','c'].indexOf('b');    // => 1
    ['a','b','c','d'].indexOf('d');    // => -1
    ['a','b','c'].indexOf('a',1);    // => -1
    ````
  
#### 6. Array.join()
将数组元素衔接为字符串

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.join()<br>array.join(separator) | separator:分割字符元素的可选字符或字符串。默认是"," | 字符串 |

* 描述
    
    该方法将array中每个元素转换为以分隔符分割的字符串。String.split()为相反操作

* 示例
    ````js
    var a = new Array(1,2,3,"testing");
    var s = a.join('-');  //返回s是字符串“1-2-3-testing”
    ````
  
#### 7. Array.map()
从数组元素中计算新值

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.map(f)<br>array.map(f, o) | f:为array的每一个元素调用的函数<br>o:f调用时的可选this值 | 由f计算出的新数组 |

* 描述
    
    map()会创建一个新数组，数组元素通过将array元素传递给函数f计算得出

* 示例
    ````js
    [1,2,3].map(function(x) { return x*x });  //[1,4,9]
    ````
  
#### 8. Array.pop()
移除并返回数组最后一个元素

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.pop() |  | array的最后一个元素 |

* 描述
    
    pop()会移除array的最后一个元素，缩短数组的长度，并返回移除元素的值。如果数组为空，pop()不会修改
    数组，返回undefined
    
#### 9. Array.push()
给数组添加元素

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.push(value, ...) | 添加到数组尾部的一个或多个值 | 指定值添加到数组后数组的新长度 |

* 描述
    
    push()会将参数按顺序添加到array尾部。它会直接修改array，而不会创建一个新数组。
    
#### 10. Array.reduce()
从数组元素中计算出一个值

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.reduce(f)<br>array.reduce(f, inital) | f:一个函数可以合并两个值<br>inital:用来缩减数组的可选初始值 | 数组的化简值，该值是最后一次调用f时的返回值 |

* 示例
    ````js
    [1,2,3,4].reduce(function(x,y) { return x*y });  // 24   ((1*2)*3)*4  
    ````
  
#### 11. Array.reverse()
颠倒数组中的元素顺序

* 描述
    
    该方法颠倒array元素顺序，在原数组中操作

* 示例
    ````js
    var a = new Array(1,2,3);
    a.reverse();  // a=[3,2,1]
    ````
  
#### 12. Array.shift()
移除数组第一个元素

* 描述
    
    移除数组第一个元素，返回数组原来的第一个元素

* 示例
    ````js
    var a = [1,[2,3],4];
    a.shift();  // 返回1；a=[[2,3],4]
    ````
  
#### 13. Array.slice()
返回数组的一部分，新数组

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.slice(start,end) | start:数组片段开始位置。如果为负数则从末尾开始<br>end:数组片段结束位置。如果为负数则从末尾开始 | 新数组 |

* 描述
    
    返回新数组包含从start到end(包含start不包含end)之间的所有元素。如果没有指定end，返回从start
    到数组末尾所有元素
    
    **注意slice()没有修改原数组。如果想要移除数组一部分，则使用Array.splice()**

* 示例
    ````js
    var a = [1,2,3,4,5];
    a.slice(1,4);  //返回[2,3,4]
    ````
  
#### 14. Array.some()
测试是否有元素满足断言函数

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.some(predicate)<br>array.every(predicate, o) | predicate:测试数组元素的断言函数<br>o:调用predicate时可选this值 | true或false |

* 描述
    
    some()方法会按照序号从小到大顺序遍历array的元素，并对每个元素调用指定的
    predicate函数。如果predicate返回true，则some会停止遍历，并立刻返回true。如果predicate每一次调用都返回false，则
    返回false。当遍历数组为空时，some()返回false。

* 示例
    ````js
    [1,2,3].some(function(x) { return x>5 });    //返回false,没有元素大于5
    [1,2,3].some(function(x) { return x>2 });    //返回true
    [].some(function(x) { return false });   //总是返回false
    ````
  
#### 15. Array.sort()
对数组元素进行排序

| 概要 | 参数 | 返回值 |
| :----:| :----: | :----: |
| array.sort()<br>array.sort(orderfunc) | orderfunc用来指定如何排序的可选函数 | 该数组的引用 |

* 描述
    
    some()方法在原数组中进行排序，没有新建数组。如果调用sort时不带参数，按字符编码顺序对数组元素进行排序。
    
    **注意：数组中的undefined元素会始终排列在数组末尾。即便提供了自定义比较函数，因为undefined不会传给orderfunc**

* 示例
    ````js
    function numberOrder(a,b) { return a-b }
    var a = [20,5,260,300]
    a.sort()  //字母排序：20，260，300，5
    a.sort(numberOrder)  //数值排序：5，20，260，300
    ````

