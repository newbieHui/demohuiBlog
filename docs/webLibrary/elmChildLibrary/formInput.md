# 输入框回车刷新页面
---

### 1.问题描述：
今天在做Form表单时，发现表单中输入框获得焦点后回车会刷新页面。

### 2.解决方案：
当form表单中只有一个输入框时，输入框获得焦点后回车会提交该表单。如果希望阻止这一默认行为，我们需要在form标签中加入 **@submit.native.prevent**。

[Element-ui](http://element-cn.eleme.io/#/zh-CN)
