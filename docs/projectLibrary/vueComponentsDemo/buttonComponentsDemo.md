# Button组件
---

### 1.创建Button组件
在 components 文件夹下创建一个Button.vue的文件，放置button组件代码，指定name为DemoButton

````vue
<template>
    <button class="demo-button">
      按钮组件
    </button>
</template>

<script>
    export default {
        name: "DemoButton"
    }
</script>

<style scoped>

</style>
````

### 2.注册Button组件
在 main.js 文件中导入Button组件，并全局注册此组件
````js
import Vue from 'vue'
import App from './App'
import DemoButton from './components/Button'

Vue.config.productionTip = false

Vue.component(DemoButton.name,DemoButton)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

````

### 3.使用Button组件
注册完成后就可以在App.vue中使用此组件
````vue
<template>
  <div id="app">
    <DemoButton></DemoButton>
  </div>
</template>
````

### 4.组件插槽slot
使用slot来定义按钮上的文本内容，使其可以动态设置

1.Button.vue
````vue
<template>
    <button class="demo-button">
      <span><slot></slot></span>
    </button>
</template>
````
2.App.vue
````vue
<template>
  <div id="app">
    <DemoButton>主要按钮</DemoButton>
    <DemoButton>成功按钮</DemoButton>
    <DemoButton>提示按钮</DemoButton>
    <DemoButton>危险按钮</DemoButton>
    <DemoButton>警告按钮</DemoButton>
  </div>
</template>
````

### 5.组件基本样式
---
````css
<style lang="scss">
  .demo-button{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #ffffff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    //禁止元素的文字被选中
    -moz-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    &:hover,
    &:hover{
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
  }
</style>
````

### 6.设置组件type属性
设置按钮type属性，使得按钮支持不同样式

1.父组件传递type属性值

App.vue
````vue
<template>
  <div id="app">
    <div class="row">
      <DemoButton>普通按钮</DemoButton>
      <DemoButton type="primary">主要按钮</DemoButton>
      <DemoButton type="success">成功按钮</DemoButton>
      <DemoButton type="info">提示按钮</DemoButton>
      <DemoButton type="danger">危险按钮</DemoButton>
      <DemoButton type="warning">警告按钮</DemoButton>
    </div>
  </div>
</template>
````

2.子组件接收父组件传递的数据

Button.vue
````js
<script>
  export default {
    name: "DemoButton",
    props:{
      type:{
        type: String,
        default:"default"
      }
    }
  }
</script>
````

3.通过绑定类名的方法动态控制样式

Button.vue
````vue
<template>
  <button class="demo-button" :class="`demo-button-${type}`">
    <span><slot></slot></span>
  </button>
</template>
````

4.设置不同type类型的样式

Button.vue
````css
  .demo-button-primary{
    color:#fff;
    background-color: #409eff;
    border-color: #409eff;
    &:hover,
    &:focus{
      background: #66b1ff;
      background-color: #66b1ff;
      color: #fff;
    }
  }
  .demo-button-success{
    color:#fff;
    background-color: #67c23a;
    border-color: #67c23a;
    &:hover,
    &:focus{
      background: #85ce61;
      background-color: #85ce61;
      color: #fff;
    }
  }
  .demo-button-info{
    color:#fff;
    background-color: #909399;
    border-color: #909399;
    &:hover,
    &:focus{
      background: #a6a9ad;
      background-color: #a6a9ad;
      color: #fff;
    }
  }
  .demo-button-warning{
    color:#fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
    &:hover,
    &:focus{
      background: #ebb563;
      background-color: #ebb563;
      color: #fff;
    }
  }
  .demo-button-danger{
    color:#fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
    &:hover,
    &:focus{
      background: #f78989;
      background-color: #f78989;
      color: #fff;
    }
  }
````

设置不同的type类型有不同的样式，效果如下图

![buttonType属性](/img/vueComponentsDemoImg/buttonType.png)

### 7.设置组件plain属性
和type类型相同，我们只要将样式先设置好，然后通过父组件传递过来的值进行判断，就可以设置plain属性了

1.父组件组件传递plain值

App.vue
````vue
<template>
  <div id="app">
    <div class="row">
      <DemoButton>普通按钮</DemoButton>
      <DemoButton type="primary" plain>主要按钮</DemoButton>
      <DemoButton type="success" plain>成功按钮</DemoButton>
      <DemoButton type="info" plain>提示按钮</DemoButton>
      <DemoButton type="danger" plain>危险按钮</DemoButton>
      <DemoButton type="warning" plain>警告按钮</DemoButton>
    </div>
  </div>
</template>
````

2.子组件接收父组件传递的数据，进行props校验，并且设置默认值为false

Button.vue
````js
<script>
  export default {
    name: "DemoButton",
    props:{
      type:{
        type: String,
        default:"default"
      },
      plain:{
        type: Boolean,
        default:false
      }
    }
  }
</script>
````

3.通过绑定类名的方法动态控制样式，由于plain类型是布尔值，所以在类型中我们使用对象的形式来控制样式

Button.vue
````vue
<template>
  <button class="demo-button" :class="[`demo-button-${type}`,{'is-plain':plain}]">
    <span><slot></slot></span>
  </button>
</template>
````

4.设置不同类型的样式，由于plain类型是以对象的形式在类中定义的，所以使用获取属性的方法定义样式

Button.vue
````css
.demo-button.is-plain{
    &:hover,
    &:focus{
      background: #fff;
      border-color: #489eff;
      color: #409eff;
    }
  }
  .demo-button-primary.is-plain{
    color: #409eff;
    background: #ecf5ff;
    &:hover,
    &:focus{
      background: #409eff;
      border-color: #409eff;
      color: #fff;
    }
  }
  .demo-button-success.is-plain{
    color: #67c23a;
    background: #c2e7b0;
    &:hover,
    &:focus{
      background: #67c23a;
      border-color: #67c23a;
      color: #fff;
    }
  }
  .demo-button-info.is-plain{
    color: #909399;
    background: #d3d4d6;
    &:hover,
    &:focus{
      background: #909399;
      border-color: #909399;
      color: #fff;
    }
  }
  .demo-button-warning.is-plain{
    color: #e6a23c;
    background: #f5dab1;
    &:hover,
    &:focus{
      background: #e6a23c;
      border-color: #e6a23c;
      color: #fff;
    }
  }
  .demo-button-danger.is-plain{
    color: #f56c6c;
    background: #fbc4c4;
    &:hover,
    &:focus{
      background: #f56c6c;
      border-color: #f56c6c;
      color: #fff;
    }
  }
````
设置plain属性，效果如下图

![buttonPlain属性](/img/vueComponentsDemoImg/buttonPlain.png)

### 8.设置组件round属性
设置round属性和之前的相似，只要在组件中定义好了样式，动态获取属性值即可
````css
.demo-button.is-round{
    border-radius: 20px;
    padding: 12px 23px;
  }
````
设置round属性，效果如下图

![buttonRound属性](/img/vueComponentsDemoImg/buttonRound.png)

### 9.设置组件circle属性
设置circle属性和之前的相似，只要在组件中定义好了样式，动态获取属性值即可
````css
.demo-button.is-circle{
    border-radius: 50%;
    padding: 12px;
  }
````
设置circle属性，效果如下图

![buttonCircle属性](/img/vueComponentsDemoImg/buttonCircle.png)

### 10.设置组件disabled属性

App.vue
````vue
<div class="row">
      <DemoButton plain round circle disabled>按</DemoButton>
      <DemoButton type="primary" plain round circle disabled>按</DemoButton>
      <DemoButton type="success" plain round circle disabled>按</DemoButton>
      <DemoButton type="info" plain round circle disabled>按</DemoButton>
      <DemoButton type="danger" plain round circle disabled>按</DemoButton>
      <DemoButton type="warning" plain round circle disabled>按</DemoButton>
    </div>
````

Button.vue
````vue
<template>
  <button class="demo-button" :class="[`demo-button-${type}`,{'is-plain':plain,
  'is-round':round,'is-circle':circle,'is-disabled':disabled}]" :disabled="disabled">
    <span><slot></slot></span>
  </button>
</template>
````
___
````vue
disabled: {
        type: Boolean,
        default: false
      }
````
___
````css
.demo-button [class*=demo-icon-]+span{
    margin-left: 5px;
  }
````

### 11.设置组件icon属性
1.在项目中使用字体图标，首先需要有字体图标，我们可以去[阿里巴巴矢量图标库](https://www.iconfont.cn/)下载。下载完成后，在
assets目录下新建一个fonts目录，存放我们下载到的字体图标。

![icon](/img/vueComponentsDemoImg/buttonIcon.png)

2.将下载的字体图标导入到项目中

* 在main.js中引入字体图标
````js
import './assets/fonts/iconfont.css'
````

* 将下载的字体图标 iconfont.css 文件中的类名做修改，将icon全部改为了demo-icon，并且将初始的iconfont类改为了
[class*='demo-icon']，当类名中有demo-icon时使用，如下

![icon修改](/img/vueComponentsDemoImg/buttonIconUpdate.png)

3.父组件传递图标名参数

App.vue
````vue
<div class="row">
      <DemoButton plain round circle icon="shoucang"></DemoButton>
      <DemoButton type="primary" plain round circle icon="wenjian"></DemoButton>
      <DemoButton type="success" plain round circle icon="gonglve"></DemoButton>
      <DemoButton type="info" plain round circle icon="yinhang"></DemoButton>
      <DemoButton type="danger" plain round circle icon="shanchu"></DemoButton>
      <DemoButton type="warning" plain round circle icon="lingsheng"></DemoButton>
    </div>
````

4.子组件接收并校验

Button.vue
````vue
icon:{
        type: String,
        default:''
      }
````

5.使用接收到的字体图标。在没有传入icon时隐藏i标签，在slot插槽没有传入值时，不显示span标签

Button.vue
````vue
<template>
  <button class="demo-button" :class="[`demo-button-${type}`,{'is-plain':plain,
  'is-round':round,'is-circle':circle}]" :disabled="disabled">
    <i v-if="icon" :class="`demo-icon-${icon}`"></i>
    <!-- 如果没传入文本插槽，则不显示span内容 -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
````

6.设置icon配套样式，使图标和文字之间有一定间隔

````css
.demo-button [class*=demo-icon-]+span{
    margin-left: 5px;
  }
````

7.设置不同的icon值，效果如下图

![icon展示](/img/vueComponentsDemoImg/buttonIconShow.png)

### 12.设置组件点击事件
1.定义点击事件

Button.vue
````vue
<template>
  <button class="demo-button" :class="[`demo-button-${type}`,{'is-plain':plain,
  'is-round':round,'is-circle':circle,'is-disabled':disabled}]" :disabled="disabled" 
  @click="handleClick">
    <i v-if="icon" :class="`demo-icon-${icon}`"></i>
    <!-- 如果没传入文本插槽，则不显示span内容 -->
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
````
___
````js
methods: {
      handleClick (e) {
        this.$emit('click', e)
      }
    }
````

App.vue
````vue
<div class="row">
      <DemoButton type="primary" plain round @click="showMessage">提示按钮</DemoButton>
</div>
````
___
````js
methods: {
    showMessage () {
      alert('显示提示信息！！!')
    }
  }
````
点击按钮触发自定义事件，如下图

![点击事件](/img/vueComponentsDemoImg/buttonEvent.png)

