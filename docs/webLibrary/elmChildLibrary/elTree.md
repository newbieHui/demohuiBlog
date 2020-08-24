# el-tree
---
### 1.基本用法
___
````vue
<el-tree
	ref="demoTree"
 	node-key="id"
 	accordion=true
 	show-checkbox
 	:data="treeData"
 	:default-checked-keys="defaultChecked"
 	@check-change="nodeCheckChange">
</el-tree>
````
___
````js
defaultChecked: [],
treeData: [{
    id: 1,
    label: '一级 1',
    children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
            id: 9,
            label: '三级 1-1-1'
        }, {
            id: 10,
            label: '三级 1-1-2'
        }]
    }]
}]

this.defaultChecked = ['1'];   //设置默认选中节点，数组中为选中节点id，使用此方法必须设置 node-key 属性
this.$refs.demoTree.getCheckedKeys();   //获取当前选中节点
this.$refs.demoTree.setCheckedKeys([]);   //设置空数组情况当前选中节点，使用此方法必须设置 node-key 属性
nodeCheckChange(){
	//节点选中状态发生变化时的回调
}
````
___
### 2.样式重写
___
````css
/* 设置树形最外层的背景颜色和字体颜色 */
.el-tree {
  color: #fff;
  background: transparent;
}

/* 设置三角形图标的颜色 */
.el-tree-node__expand-icon {
  color: #fff;
}

/* 设置节点鼠标悬浮三角图标鼠标悬浮的颜色 */
.el-tree-node__content:hover .el-tree-node__expand-icon {
  color: #000;
}
/* .el-tree-node__content:hover .el-tree-node__expand-icon.is-leaf {
  color: transparent;
} */

/* 树节点鼠标悬浮式改变背景色，字体颜色 */
.el-tree-node__content:hover {
  background-color: #3274e6;
  color: #fff;
}

/* 改变节点高度 */
.el-tree-node__content {
  height: 36px;
}

/* 节点前边的三角图标并不会被节点样式影响，需要单独修改 当前激活的颜色*/
.el-tree-node:focus
  > .el-tree-node__content
  .el-tree-node__expand-icon {
  color: #fff;
}

/* 改变被点击节点背景颜色，字体颜色 */
.el-tree-node:focus > .el-tree-node__content {
  background-color: #3274e6;
  color: #fff;
}
````
