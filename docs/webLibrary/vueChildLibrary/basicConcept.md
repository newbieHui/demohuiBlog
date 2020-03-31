# 基本概念
---
### 1.渐进式框架
> vue是一套构建用户界面的**渐进式**框架，与其它大型框架不同，vue被设计为自底向上逐层应用，vue核心库只关注视图层。

我们在学习vue渐进式框架中，没必要一上来就搞懂Vue的每一个部件和功能，先从核心功能开始学习，逐渐扩展。 同时，在使用中，
我们也没有必要把全部件能都拿出来，需要什么用什么就是了，而且也可以把Vue很方便的与其它已有项目或框架相结合。

### 2.库和框架
* 库，是一些函数的集合。每次调用函数是为了实现一个特定的功能。
* 框架，一套完整的解决方案，由框架控制，我们需要按照框架规则编写代码。

### 3.MVVM

* MVC
MVC的全称是Model-View-Controller(模型-视图-控制器)。model数据模型专门用来操作数据；view视图，对前端来说就是页面；
controller控制器，是视图和数据模型之间的桥梁，用来处理业务逻辑。

* MVVM的全称是Model-View-ViewModel。model数据模型；view视图；viewModel视图模型。MVVM通过数据双向绑定让数据自动地双向同步。

### 4.vue生命周期钩子
![vuelifecycle](/img/vueChildLibraryImg/vuelifecycle.png)

* beforeCreate

类型：Function，在实例初始化之后，数据观测(data observer)和event/watcher事件配置之前被调用(el和data并未初始化)

* created

类型：Function，在实例创建完成后被立即调用，此时实例已完成数据观测(data observer)，属性和方法的运算，watch/event事件回调。不过，
此时挂载阶段还没有开始，$el属性不可见(完成了对data的初始化，el没有)

* beforeMount

类型：Function，在挂载开始之前被调用，相关render函数首次被调用(完成了el和data初始化)

* mounted

类型：Function，完成创建vm.$el和双向绑定，完成挂载DOM和渲染(完成挂载)

* beforeUpdate

类型：Function，数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

* updated

类型：Function，由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，
所以现在可以执行依赖于 DOM 的操作。然而在大多数情况下，应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或 watcher 取而代之。
**注意 updated 不会承诺所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以用 vm.$nextTick 替换掉 updated。**

* activated

类型：Function，keep-alive 组件激活时调用。

* deactivated

类型：Function，keep-alive 组件停用时调用。

* beforeDestroy

类型：Function，实例销毁之前调用。在这一步，实例仍然完全可用。

* destroyed

类型：Function，Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

* errorCaptured

类型：(err: Error, vm: Component, info: string) => ?boolean

当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。
此钩子可以返回 false 以阻止该错误继续向上传播。

* 子父组件的生命周期

仅当子组件完成挂载后，父组件才会挂载。父子组件在data变化中是分别监控的，但是在更新props中的数据是关联的。销毁父组件时，先将子组件销毁后才会销毁父组件。

> 20190328

### 5.常用指令(指令Directives是带有'v-'前缀的特殊特性)
1.v-cloak、v-text、v-html、v-bind、v-on
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>
<body>
<div id="app">
    <!-- v-cloak指令能够解决差值表达式在页面加载时出现变量名的问题-->
    <p v-cloak> {{ msg }} </p>
    <!-- 默认v-text没有表达式闪烁问题-->
    <!-- v-text会覆盖元素原本内容，插值表达式只会替换自己占位符的内容-->
    <p v-text="msg1"></p>
    <!-- v-html表达式可以包含html标签-->
    <p v-html="msg2"></p>
    <div style="margin-bottom: 15px">
        <!-- v-bind: 指令用于绑定属性-->
        <input type="button" value="按钮" v-bind:title="buttonTitle">
        <!-- v-bind: 指令中可以写合法表达式-->
        <input type="button" value="按钮" v-bind:title="buttonTitle + '表达式'">
        <!-- v-bind: 指令可以缩写为:要绑定的属性-->
        <input type="button" value="按钮" :title="buttonTitle + '表达式'">
    </div>
    <div>
            <!-- v-on: 用于事件绑定，可以缩写为@事件名-->
            <input type="button" value="按钮" v-on:click="showMeg">
            <input type="button" value="按钮" @click="showMeg">
    </div>
</div>
<script src="../lib/vue.js"></script>
<script>
    var vm =new Vue({
        el:'#app',
        data:{
            msg:'插值表达式',
            msg1:'v-text指令',
            msg2:'<h1>v-html指令</h1>',
            buttonTitle:'这是一个按钮提示'
        },
        methods:{
            showMeg:function(){
                alert('点击按钮显示提示信息');
            }
        }
    })
</script>
</body>
</html>
````

2.实现跑马灯效果

![strMove](/img/vueChildLibraryImg/strMove.png)
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>跑马灯</title>
    <script src="../lib/vue.js"></script>
</head>
<body>
<div id="app">
    <input type="button" value="开始滚动" @click="startRoll">
    <input type="button" value="停止滚动" @click="stopRoll">
    <div>
        <h3>{{ msg }}</h3>
    </div>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            msg:'这是一个跑马灯效果！',
            str:null
        },
        methods:{
            /** 在vm实例中，如果想要获取data中的数据或methods中的方法需要使用this*/
            startRoll(){
                // var __this = this;
                // this.str = setInterval(function(){
                //     __this.msg = __this.msg.substring(1,__this.msg.length) + __this.msg.substring(0,1);
                // },200)
                if(this.str!=null) return; //防止同时开启多个定时器
                this.str = setInterval(() => {
                    this.msg = this.msg.substring(1,this.msg.length) + this.msg.substring(0,1);
                },200)
            },
            stopRoll(){
                clearInterval(this.str);
                this.str = null;
            },
        }
    })
</script>
</body>
</html>
````

3.v-on事件修饰符
* .stop 阻止冒泡
* .prevent 阻止默认事件
* .capture 添加事件侦听器时使用事件捕获模式
* .self 只当事件在该元素本身触发时触发回调
* .once 事件只触发一次
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件修饰符</title>
    <script src="../lib/vue.js"></script>
    <style>
        #parentsDiv{
            height: 300px;
            width: 500px;
            background-color: aqua;
        }
    </style>
</head>
<body>
<div id="app">
    <!-- .stop阻止冒泡-->
    <div id="parentsDiv" @click="parentsEvent">
        <input type="button" value="按钮" @click.stop="childEvent">
    </div>
    <!-- .prevent阻止默认事件-->
    <!--
    <a href="http://www.baidu.com" @click.prevent="linkClick">百度一下</a>
    -->
    <!-- .capture捕获事件触发机制-->
    <!--
        <div id="parentsDiv" @click.capture="parentsEvent">
            <input type="button" value="按钮" @click="childEvent">
        </div>
    -->
    <!-- .self只有点击当前元素时，才会触发事件处理函数-->
    <!--
        <div id="parentsDiv" @click.self="parentsEvent">
            <input type="button" value="按钮" @click="childEvent">
        </div>
    -->
    <!-- .once事件只触发一次-->
    <!--
    <a href="http://www.baidu.com" @click.prevent.once="linkClick">百度一下</a>
    -->
</div>

<script>
    var vm = new Vue({
        el:'#app',
        data:{},
        methods:{
            childEvent(){
                console.log('这是子级点击事件！')
            },
            parentsEvent(){
                console.log('这是父级点击事件！')
            },
            linkClick(){
                console.log('阻止超链接默认事件！')
            }
        }
    })
</script>
</body>
</html>
````

4.v-model双向绑定
````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>v-model</title>
    <script src="../lib/vue.js"></script>
</head>
<body>
<div id="app">
    <!-- v-bind实现数据单向绑定，M到V-->
    <div>
        <input type="text" v-bind:value="msg" style="width: 100%">
    </div>
    <!-- v-model可以实现表单元素中的数据双向绑定-->
    <!-- v-model只能用在表单元素中-->
    <div>
        <input type="text" v-model="dynaMsg" style="width: 100%">
    </div>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            msg:'这是一段文字',
            dynaMsg:'这是一段文字，用来验证数据双向绑定'
        },
        methods:{}
    })
</script>
</body>
</html>
````

````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>简易计算器</title>
    <script src="../lib/vue.js"></script>
</head>
<body>
<div id="app">
    <input type="text" v-model="firstNum">
    <select v-model="operator">
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
    </select>
    <input type="text" v-model="secondNum">
    <input type="button" value="=" @click="calculationNum">
    <input type="text" v-model="resultNum" disabled>
</div>
<script>
    var vm = new Vue({
        el:'#app',
        data:{
            firstNum:'0',
            secondNum:'0',
            resultNum:'0',
            operator:'+'

        },
        methods:{
            calculationNum(){
                switch(this.operator){
                    case '+':
                        this.resultNum = parseFloat(this.firstNum) + parseFloat(this.secondNum);
                        break;
                    case '-':
                        this.resultNum = parseFloat(this.firstNum) - parseFloat(this.secondNum);
                        break;
                    case '*':
                        this.resultNum = parseFloat(this.firstNum) * parseFloat(this.secondNum);
                        break;
                    case '/':
                        this.resultNum = parseFloat(this.firstNum) / parseFloat(this.secondNum);
                        break;
                }
            }
        }
    })
</script>
</body>
</html>
````

