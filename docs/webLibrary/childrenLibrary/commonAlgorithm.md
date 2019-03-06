# js常用算法
---
### 1.生成随机数：

    function num(x){
        var str = "";
        for(var i=0;i<x;i++){
            str+=Math.floor(Math.random()*10).toString();
        }
        return str;
    }
### 2.表格测试：
| Tables | row  | Cool |
| ------ |:----:| ----:|
| test   | test | test |
| test   | test | test |
| test   | test | test |
| test   | test | test |

> 2019/3/6 17:00