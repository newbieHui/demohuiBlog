# 代码优化
---
### 1.if-else代码结构优化：
* A.这里需要写一个返回今天星期几的方法。我们首先想到的肯定是通过if语句来实现，代码如下：
````js
function returnWeekday (){
    var string = "今天星期";
    var number = new Date().getDay();
    if(number === 0){
        string += "日";
    }
    else if(number === 1){
        string += "一";
    }
    else if(number === 2){
        string += "二";
    }
    else if(number === 3){
        string += "三";
    }
    else if(number === 4){
        string += "四";
    }
    else if(number === 5){
        string += "五";
    }
    else if(number === 6){
        string += "六";
    }
    return string;
}
console.log(returnWeekday());

````

我们在写完这样一段代码时的第一感觉就是else if块太多了，结构不太清晰看着很不舒服。

B.这时我们可以考虑使用switch来优化上面的代码块：
````js
function returnWeekday(){
    var string = "今天星期";
    var number = new Date().getDay();
    switch (number){
        case 0 :
            string += "日";
            break;
        case 1 :
            string += "一";
            break;
        case 2 :
            string += "二";
            break;
        case 3 :
            string += "三";
            break;
        case 4 :
            string += "四";
            break;
        case 5 :
            string += "五";
            break;
        case 6 :
            string += "六";
            break;
    }
    return string;
}
console.log(returnWeekday());
````

上面代码结构块看起来是比if else清晰了一点，可是代码并没有变得简洁。

C.上面代码块中的case是从0到6的数字，和从0开始的数组下标是一致的，所以我们试着用数组存储：
````js
function returnWeekday(){
    var string = "今天星期";
    var number = new Date().getDay();
    var subscript = ['日','一','二','三','四','五','六'];
    return string + subscript[number];
}
console.log(returnWeekday());
````

这段代码实现了相同的功能，但看起来要简洁舒服的多。

D.字符串有个和数组下标类似的方法：
````js
function returnWeekday(){
    return "今天是星期" + "日一二三四五六".charAt(new Date().getDay());
}
console.log(returnWeekday());
````

E.如果if else块很简单，这时我们也可以使用三元运算来优化。



