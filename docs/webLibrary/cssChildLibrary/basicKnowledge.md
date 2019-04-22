# css基础知识
---

### 1.多重样式优先级
当同一个HTML元素被多个样式定义时，多重样式优先级从高到底如下所示：

* 1.内联样式(在HTML元素内部)。
* 2.内部样式表(位于head标签内部)。
* 3.外部样式表(外部css文件)。
* 4.浏览器缺省设置。

### 2.css选择器
* 派生选择器

````html
<p>The strongly emphasized word in this paragraph is<strong>red</strong>.</p>
<h2>This subhead is also red.</h2>
<h2>The strongly emphasized word in this subhead is<strong>blue</strong>.</h2>
````
___

````css
strong {
     color: red;
     }

h2 {
     color: red;
     }

h2 strong {
     color: blue;
     }
````

* id选择器
id选择器使用"#"来定义。

````html
<p id="red">这个段落是红色。</p>
<p id="green">这个段落是绿色。</p>
````
___

````css
#red {color:red;}
#green {color:green;}
````

* 类选择器
类选择器使用一个"."来定义。

````html
<h1 class="center">
This heading will be center-aligned
</h1>

<p class="center">
This paragraph will also be center-aligned.
</p>
````
___

````css
.center {text-align: center}
````

* 属性选择器

下面的例子为带有 title 属性的所有元素设置样式：

````css
[title]
{
color:red;
}
````

> 2019/4/16 21:21
