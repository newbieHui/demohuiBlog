# js数组
---

数组是值的有序集合。JavaScript数组是无类型的，数组元素可以是任意类型，并且同一个数组中的不同元素也可能有不同的类型。数组元素甚至也可能是对象或其它数组。
JavaScript数组的索引是基于零的32位数值：第一个元素的索引为0，最大可能索引为2的32次方减2。
### 1.join()
Array.join()方法用于把数组中的所有元素放入一个字符串，元素通过指定的分隔符进行分隔。
> array.join(separator)

参数 | 描述 |
:-: | :-: |
separator | 可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。 |

返回值：返回一个字符串，字符串元素之间以参数separator分隔。
> Array.join()方法是String.split()方法的逆向操作，后者是将字符串分割成若干块来创建一个数组。

### 2.toString
Array.toString()方法可把数组转换为字符串，并返回结果。
```js
var arr = new Array(3);
arr[0] = "first";
arr[1] = "second";
arr[2] = "third";

document.write(arr.toString());   // first,second,third
```

### 3.reverse()
Array.reverse()方法将数组中的元素颠倒顺序，返回逆序数组。

### 4.sort()
Array.sort()方法将数组中的元素排序并返回排序后的数组。当不带参数调用sort()时，数组元素以字母表顺序排序。如果数组中包含undefined元素，它们会被排到数组的尾部。
> array.sort(sortby)

参数 | 描述 |
:-: | :-: |
sortby | 可选。规定排序顺序。必须是函数。

返回值：数组在原数组上进行排序，不生成副本。

如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。
比较函数应该具有两个参数 a 和 b，其返回值如下：
* 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
* 若 a 等于 b，则返回 0。
* 若 a 大于 b，则返回一个大于 0 的值。
```js
function sortNumber(a,b) {
	return a - b;
}

var arr = new Array(5);
arr[0] = '12';
arr[1] = '2';
arr[2] = '32';
arr[3] = '112';
arr[4] = '7';

console.log(arr.sort(sortNumber));   // ["2","7","12","32","112"]
```

### 5.concat()
Array.concat()方法用于连接两个或多个数组。
> array.concat(arrayX,arrayX,......,arrayX)

参数 | 描述
:-: | :-:
arrayX | 必需。该参数可以是具体的值，也可以是数组对象。可以是任意多个。

返回值：返回一个新数组，新数组元素包括调用concat()的原始数组的元素和concat()的每个参数。

### 6.slice()
Array.slice()方法返回已有数组中的选定值。
> array.slice(start,end)

参数 | 描述
:-: | :-:
start | 必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
end | 可选。规定从何处结束选取。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。

返回值：该方法并不会修改数组，而是返回一个子数组。

### 7.push()
Array.push()方法向数组末尾添加一个或多个元素，并返回新的长度。
> array.push(newElement1,newElement2,....,newElementX)

参数 | 描述
:-: | :-:
newElement1 | 必需。要添加到数组的第一个元素。
newElement2 | 可选。要添加到数组的第二个元素。
newElementX | 可选。可添加多个元素。

返回值：添加新元素中数组的长度。

### 8.pop()
Array.pop()方法用于删除并返回数组的最后一个元素。
返回值：返回Array的最后一个元素。

### 9.shift()
Array.shift()方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
返回值：返回Array的最后一个元素。

### 10.unshift()
Array.unshift()方法可向数组的开头添加一个或更多元素，并返回新的长度。
返回值：返回Array的新长度。

### 11.splice()
Array.splice()方法向/从数组中添加/删除项目，然后返回被删除的项目。
> array.splice(index,howMany,item1,.....,itemX)

参数 | 描述
:-: | :-:
index | 必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
howMany | 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
item1,.....,itemX | 可选。向数组添加的新项目。