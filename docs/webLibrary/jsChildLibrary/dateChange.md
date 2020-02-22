# 时间格式转换
---
### 1.获取今天前或后n天的时间戳:
___
```js
function beforeOrAfterDate(n){
        return new Date().getTime() + 3600 * 1000 * 24 * n;
    }
```
### 2.将时间戳转换为特定的时间格式('年-月-日'):
___
```js
function getTime(num){
        if(num == null){
            return '';
        }else {
            num = Number(num);
            var d = new Date(num);
            var year = d.getFullYear();
            var month = d.getMonth()+1;
            var date = d.getDate();
            var hour = d.getHours();
            var minute = d.getMinutes();
            var second = d.getSeconds();
            month < 10 ? month = '0' + month:month;
            date< 10 ? date = '0' + date:date;
            return year + "-" + month + "-" + date;
        }
    }
```
### 3.将时间戳转换为特定的时间格式('年-月-日 时:分:秒'):
___
```js
function getDetailTime(num){
        if(num == null){
            return '';
        }else {
            num = Number(num);
            var d = new Date(num);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var date = d.getDate();
            var hour = 0;
            var minute = 0;
            var second = 0;
            month < 10 ? month = '0' + month : month;
            date < 10 ? date = '0' + date : date;
            hour < 10 ? hour = '0' + hour : hour;
            minute < 10 ? minute = '0' + minute : minute;
            second < 10 ? second = '0' + second : second;
            return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
        }
    }
```

> 2019/3/6 16:45
