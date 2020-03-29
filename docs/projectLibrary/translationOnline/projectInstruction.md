# 项目总览
---

### 项目描述

该项目使用vue + webpack构建了一个在线翻译小程序，支持中、韩、俄三语互译。主要学习巩固了vue父子组件之间传值的知识点。

### 项目知识点

* vue父子组件传值方法

1.父组件给子组件传值方法，v-bind绑定数据使用props传值
>props是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件修改父组件的状态。所以不应该
在子组件中修改props中的值。

父组件：
````
<child :inputName="nickName">
````
子组件：
````
//a
props: {
   inputName: String,
   required: true
  }
//b
props: ["inputName"]
````

2.子组件给父组件传值方法，使用$emit

子组件：
````
<span>{{childValue}}</span>
<!-- 定义一个子组件传值的方法 -->
<input type="button" value="点击触发" @click="childClick">
    export default {
        data () {
            return {
                childValue: '子组件的数据'
            }
      },
      methods: {
         childClick () {
                this.$emit('childByValue', this.childValue)
            }
        }
    }
````
父组件：
````
<!-- 引入子组件 定义一个on的方法监听子组件的状态-->
<child v-on:childByValue="childByValue"></child>
methods: {
    childByValue: function (childValue) {
        // childValue就是子组件传过来的值
        this.nickName = childValue
        }
    }
}
````

* vue父子组件传值总结

1.在vue中，父子组件的关系可以总结为prop向下传递，事件向上传递。父组件通过prop给子组件下发数据，子组件通过事件给父组件发送
信息。

![父子组件传值](/img/translationOnlineImg/translationOnline3.png)

2.每个Vue实例都实现了事件接口：使用$on(eventName)监听事件；使用$emit(eventName,optionalPayload)触发事件。另外，父组件可以
在使用子组件的地方直接用v-on来监听子组件触发的事件。
### 项目预览

1.
![在线翻译](/img/translationOnlineImg/translationOnline2.png)
2.
![在线翻译](/img/translationOnlineImg/translationOnline1.png)
### 项目代码
[项目代码](https://github.com/newbieHui/translateOnline.git)