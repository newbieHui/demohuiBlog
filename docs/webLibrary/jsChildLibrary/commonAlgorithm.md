# 常用算法
---
### 1.排序算法：
1.冒泡排序：
```js
function bubbleSort(arr) {
	var i = 0, j = 0;
	for(i=1;i<=arr.length-1;i++) {
		for(j=0;j<=arr.length-i;j++) {
			var temp = 0;
			if(arr[j] > arr[j+1]) {
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
	return arr;
}
```

### 2.生成随机数：
1.生成随机数：
```js
function num(x) {
        var str = "";
        for(var i=0;i<x;i++){
            str += Math.floor(Math.random()*10).toString();
        }
        return str;
    }
```

2.生成指定长度随机字符串：
```js
function randomString(n){
  var str = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for(var i=0; i<n; i++) {
    result += str.charAt(Math.round(Math.random()*str.length));
  }
  return result;
}
```

### 3.翻转字符串：
1.反向遍历字符串：
```js
function reverseString(str) {
	var resultStr  = '';
	for(var i=str.length-1;i>=0;i--) {
		resultStr += str[i];
	}
	return resultStr;
}
```

2.转换成数组操作：
```js
function reverseString(str) {
	var arr = str.split('');
	var i = 0, j = arr.length - 1;
	while(i < j ) {
		tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
		i++;
		j--;
	}
	return arr.join('');
}
```

### 4.统计字符串中出现次数最多字符：
___
```js
function findMaxDuplicateChar(str) {
  if(str.length == 1) {
    return str;
  }
  var charObj = {};
  for(var i = 0; i < str.length; i++) {
    if(!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = 1;
    } else {
      charObj[str.charAt(i)] += 1;
    }
  }
  var maxChar = '',
      maxValue = 1;
  for(var k in charObj) {
    if(charObj[k] >= maxValue) {
      maxChar = k;
      maxValue = charObj[k];
    }
  }
  return maxChar + '在此字符串中出现' + maxValue + '次';
}

```

> 2019/3/6 17:00