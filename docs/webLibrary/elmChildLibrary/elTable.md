# el-table
---

### 1.选取行
___
````vue
<el-table-column type="selection" width="80"></el-table-column>
````
___
````js
selStore: [],

handleSelectClick: function (selection) {
    this.selStore = selection;
},

var arr=[];
for(var i=0;i<this.selStore.length;i++){
    arr[i]=this.selStore[i].id;
}
````

### 2.合并单元格
使用 span-method 进行合并,如果是首次出现的内容就计算具体有多少行是一样的,然后返回rows行数作为rowspan,如果是与上一行内容
相同就返回0 0消除该单元格,返回rowspan和colspan的对象意味着合并的行数和列,如果不参与合并就返回0 0 以免出现多出行或列而导
致错位的情况发生。
````vue
<el-table :data="tableData" :span-method="objectSpanMethod" border :header-cell-style="{background:'#404163'}">
      <el-table-column prop="category" label="A" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="project" label="B" align="center" show-overflow-tooltip></el-table-column>  -->
      <el-table-column label="C" align="center" show-overflow-tooltip>
          <el-table-column prop="lastWeek" label="D" width="210" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lastWeekUnit" label="E" align="center" show-overflow-tooltip></el-table-column>
      </el-table-column>

      <el-table-column label="F" align="center" show-overflow-tooltip>
          <el-table-column prop="thisWeek" label="J" width="210" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="thisWeekUnit" label="H" align="center" show-overflow-tooltip></el-table-column>
      </el-table-column>

      <el-table-column label="I" align="center" show-overflow-tooltip>
          <el-table-column prop="thisWeekHour" label="J" width="210" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="thisWeekHourUnit" label="K" align="center" show-overflow-tooltip></el-table-column>
      </el-table-column>
      <el-table-column prop="unitConsumption" label="L" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="unitConsumptionStandard" label="M" align="center" show-overflow-tooltip></el-table-column>
</el-table>
````
___
````js
tableData: [{ category: '消耗', project: '1', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },
{ category: '消耗', project: '2', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },
{ category: '消耗', project: '3', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },
{ category: '消耗', project: '4', lastWeekUnit: '标立', thisWeekUnit: '标立', thisWeekHourUnit: '标立/小时' },
{ category: '消耗', project: '5', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },
{ category: '消耗', project: '6', lastWeekUnit: '标立', thisWeekUnit: '标立', thisWeekHourUnit: '标立/小时' },
{ category: '消耗', project: '7', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },
{ category: '消耗', project: '8', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },
{ category: '消耗', project: '9', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },
{ category: '消耗', project: '10', lastWeekUnit: '度', thisWeekUnit: '度', thisWeekHourUnit: '度/小时' },
{ category: '消耗', project: '11', lastWeekUnit: '度', thisWeekUnit: '度', thisWeekHourUnit: '度/小时' },
{ category: '消耗', project: '12', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },

{ category: '产量', project: '13', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },
{ category: '产量', project: '14', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },
{ category: '产量', project: '15', lastWeekUnit: '吨', thisWeekUnit: '吨', thisWeekHourUnit: '吨/小时' },

{ category: '16',thisWeekUnit: '19'},
{ category: '17'},
{ category: '18'}],


objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    // columnIndex，rowIndex从0开始
    if (columnIndex === 0) {
        // 合并第一列1-12行为1列
        if (rowIndex === 0) {
            return {
                rowspan: 12,   //行数
                colspan: 1   //列数
            };
        } else if (rowIndex === 12) {   //合并第一列13-15行为1列
            return {
                rowspan: 3,
                colspan: 1
            };
        } else if (rowIndex === 15) {   //合并第一列第16行为两列
            return {
                rowspan: 1,
                colspan: 2
            };
        } else if (rowIndex === 16) {
            return {
                rowspan: 1,
                colspan: 2
            };
        } else if (rowIndex === 17) {
            return {
                rowspan: 1,
                colspan: 2
            };
        } else {
            return {
                rowspan: 0,
                colspan: 0
            };
        }
    }
    if (rowIndex === 15) {
        if (columnIndex === 6) {
            return [1, 2]
        } else if (columnIndex === 1 || columnIndex === 7) {   //释放合并的单元格，很重要！！！不释放会导致数据错乱
            return [0, 0]
        }
    }
    // 合并第16，17，18行第2-9列为一列,单元格合并重复未释放导致数据错乱
    if (rowIndex === 16||rowIndex === 17) {
        if (columnIndex === 1) {
            return [1, 9]
        } else if (columnIndex === 2||columnIndex === 3||columnIndex === 4||columnIndex === 5||columnIndex === 6||columnIndex === 7||columnIndex === 8) {
            return [0, 0]
        }
    }
},
````
![tableDemo](/img/elChildLibrary/tableDemo.png)

### 3.强制element-UI的table组件滚动到底部
添加一行数据,页面应该滚动到添加的数据那里

````css
this.$nextTick(() => {
  let container = this.$el.querySelector('.el-table__body-wrapper');
  container.scrollTop = container.scrollHeight;
})
````

### 4.el-table样式
___
````css
/*1.表格添加fixed固定列后鼠标悬停高亮背景颜色修改:*/
.el-table__body .el-table__row.hover-row td{
   background-color: 颜色;
}

/*2.删除表格四周边框*/
.el-table--border, .el-table--group{
    border: none;
}
 .el-table__header-wrapper th:nth-last-of-type(2){
    border-right: none;
}
 .el-table--border td:nth-last-of-type(1){
    border-right: none;
}
 .el-table--border::after, .el-table--group::after{
    width: 0;
}

/*3.删除表格最下面的边框线*/
.el-table__row>td {
    border: none;
}
.el-table::before {
    height: 0px;
}
````

### 5.el-table固定列fix
列设定 fixed="right"或 fixed="left"后，有时会出现错位问题。通过更新DOM来解决这个问题：
````vue
<el-table :data="tableData" ref="multipleTable"></el-table>
````
___

````js
// 数据请求成功并赋值给table后立刻获取更新后的DOM
this.$nextTick(() => {
    this.$refs.multipleTable.doLayout();
});
````


