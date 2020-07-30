# 选择数据
---

````html
<el-table-column type="selection" width="80"></el-table-column>
````

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

