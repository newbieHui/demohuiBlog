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
</style>
````

设置不同的type类型有不同的样式，效果如下图
![vue项目初始化](/img/vueComponentsDemoImg/buttonType.png)
