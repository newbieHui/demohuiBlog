# 样例
---

````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>上传渠道管理</title>
    <link rel="stylesheet" href="../css/el.css">
    <link rel="stylesheet" href="../css/univ.css">
    <script src="../js/mgr-srv/bwaerpc-i.js"></script>
    <script src="../lib/bwaerpc.js"></script>
    <script src="../js/mgr-srv/bwaerpc-i.js"></script>
    <script src="../lib/bwaepath.js"></script>
    <script src="../lib/json-mini.js"></script>
</head>
<body>
<div id="app">
    <div-component></div-component>
</div>
<script type="text/x-template" id="template">
    <div>
        <el-card>
            <el-form :model="formStore" ref="ruleForm2" label-width="80px">
                <el-row type="flex">
                    <el-col :span="5">
                        <el-form-item prop="channelid" label="渠道号">
                            <el-input v-model="formStore.channelid" placeholder="请输入渠道号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item prop="platform" label="平台">
                            <el-select v-model="formStore.platform" filterable clearable placeholder="请选择"
                                       size="small">
                                <el-option v-for="option in platformStore"
                                           :label="option.text"
                                           :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label-width="20px">
                            <div style="width: 180px">
                                <el-button size="small" type="primary" @click="query">查询</el-button>
                                <el-button size="small" type="primary" @click="resetForm('ruleForm2')">重置
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <el-card>
            <div slot="header">
                <el-button type="info" icon="plus" @click="addShow">新增</el-button>
                <el-button type="info" icon="edit" @click="updateShow">修改</el-button>
                <el-button type="info" icon="delete2" @click="delShow">删除</el-button>
            </div>
            <div>
                <el-table :height="screenStore.height" v-loading="tableStore.loading"
                          element-loading-text="拼命加载中" highlight-current-row
                          :data="tableStore.data" ref="table" border
                          @selection-change="handleSelectClick" @row-dblclick="dbClick">
                    <el-table-column type="index" label="序号" width="70"></el-table-column>
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="编号" prop="id" width="100px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="渠道号" prop="channelid" width="90px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="渠道名称" prop="channelname" width="120px" show-overflow-tooltip></el-table-column>
                    <el-table-column label="平台" prop="platform" width="120px" :formatter="platformRender" show-overflow-tooltip></el-table-column>
                    <el-table-column label="产品线" prop="productline" width="150px" :formatter="productlineRender" show-overflow-tooltip></el-table-column>
                    <el-table-column label="产品类型" prop="productType" width="100px" :formatter="productTypeRender" show-overflow-tooltip></el-table-column>
                    <el-table-column show-overflow-tooltip label=""></el-table-column>
                </el-table>
            </div>
            <div style="float: right;">
                <el-pagination @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="pageStore.pageIndex"
                               :page-sizes="pageStore.pageSizes"
                               :page-size="pageStore.pageSize"
                               :total="pageStore.total"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog title="新增" v-model="addStore.isShow" size="tiny">
            <el-form :model="addStore.data" ref="addForm" :rules="addStore.rule"
                     label-position="right"
                     label-width="100px">
                <el-form-item prop="channelid" label="渠道号" style="margin-top: 20px">
                    <el-input size="small" v-model="addStore.data.channelid"></el-input>
                </el-form-item>
                <el-form-item prop="channelname" label="渠道名称" style="margin-top: 20px">
                    <el-input size="small" v-model="addStore.data.channelname"></el-input>
                </el-form-item>
                <el-form-item prop="platform" label="平台" style="margin-top: 20px">
                    <el-select v-model="addStore.data.platform" filterable clearable placeholder="请选择"
                               size="small">
                        <el-option v-for="option in platformStore"
                                   :label="option.text"
                                   :value="option.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="productline" label="产品线" style="margin-top: 20px">
                    <el-select v-model="addStore.data.productline" filterable clearable placeholder="请选择"
                               size="small">
                        <el-option v-for="option in productlineStore"
                                   :label="option.text"
                                   :value="option.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCancel">取 消</el-button>
                <el-button type="info" @click="add">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改" v-model="updateStore.isShow" size="tiny">
            <el-form :model="updateStore.data" ref="updateForm" :rules="updateStore.rule"
                     label-position="right"
                     label-width="100px">
                <el-form-item prop="channelid" label="渠道号" style="margin-top: 20px">
                    <el-input size="small" v-model="updateStore.data.channelid"></el-input>
                </el-form-item>
                <el-form-item prop="channelname" label="渠道名称" style="margin-top: 20px">
                    <el-input size="small" v-model="updateStore.data.channelname"></el-input>
                </el-form-item>
                <el-form-item prop="platform" label="平台" style="margin-top: 20px">
                    <el-select v-model="updateStore.data.platform" filterable clearable placeholder="请选择"
                               size="small">
                        <el-option v-for="option in platformStore"
                                   :label="option.text"
                                   :value="option.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="productline" label="产品线" style="margin-top: 20px">
                    <el-select v-model="updateStore.data.productline" filterable clearable placeholder="请选择"
                               size="small">
                        <el-option v-for="option in productlineStore"
                                   :label="option.text"
                                   :value="option.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateCancel">取 消</el-button>
                <el-button type="info" @click="update">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</script>

</body>
<script type="text/javascript" src="../lib/vue.min.js"></script>
<script type="text/javascript" src="../lib/el.js"></script>
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../lib/numeral.min.js"></script>
<script type="text/javascript" src="../js/special-uploadChannelManagement.js"></script>
</html>
````
---

````js
/**
 * Created by shaozh on 2017/8/30.
 */
var Component = {
    template: "#template",
    data:function(){
        var validate = function (rule, value, callback) {
            if (value === ''||value ===undefined) {
                callback(new Error('不能为空'));
            } else {
                callback();
            }
        };
        //新增,修改校验规则
        var rule = {
            channelid: [
                {required: true, validator: validate, trigger: 'change'}
            ],
            channelname: [
                {required: true, validator: validate, trigger: 'change'}
            ],
            productline: [
                {required: true, validator: validate, trigger: 'change'}
            ],
            platform: [
                {required: true, validator: validate, trigger: 'change'}
            ],
        };
        return {
            //表单
            formStore: {
                channelid: '',
                platform:'',
            },
            //分页
            pageStore: {
                startline: 0,
                pageIndex: 1,
                pageSize: 50,
                total: 0,
                pageSizes: [10, 50, 100, 200],
            },
            //屏幕像素
            screenStore: {
                height: browerHeight - 210 - 53,//改变高度是只能改后面的数字
                width: screenWidth
            },
            //table
            tableStore: {
                loading: false,
                data: []
            },
            //新增
            addStore: {
                isShow: false,
                data: {
                    channelid: '',
                    channelname: '',
                    productline:'',
                    platform:'',
                },
                rule: rule
            },
            //修改
            updateStore: {
                isShow: false,
                data: {
                    channelid: '',
                    channelname: '',
                    productline:'',
                    platform:'',
                },
                rule:rule
            },
            //枚举
            channelnameStore:[],
            productlineStore:[],
            productTypeStore:[],
            platformStore:[{'text':'IOS','value':'IOS'},{'text':'android','value':'android'},{'text':'html','value':'html'}],
            //选中---> 修改，删除
            selStore: [],
        }
    },//data
    methods:{
        //分页
        handleSizeChange: function (pageSize) {
            this.pageStore.pageSize = pageSize;
            this.pageStore.pageIndex = 1;
            this.pageStore.startline = (this.pageStore.pageIndex - 1) * pageSize;
            this.query();
        },
        handleCurrentChange: function (pageIndex) {
            this.pageStore.startline = (pageIndex - 1) * this.pageStore.pageSize;
            this.pageStore.pageIndex = pageIndex;
            this.query();
        },
        //table single select
        handleClick:function (selection, row) {
            this.$refs.table.clearSelection(false);
            this.$refs.table.toggleRowSelection(row,true);
        },
        //double click
        dbClick:function (row, event) {
            this.$refs.table.clearSelection(false);
            this.$refs.table.toggleRowSelection(row, true);
            this.updateShow();
        },
        //table select
        handleSelectClick: function (selection) {
            this.selStore = selection;
        },
        //表单重置
        resetForm:function(formName) {
            this.$refs[formName].resetFields();
        },
        //查询
        queryBtn:function () {
            this.pageStore.pageIndex = 1;
            this.pageStore.startline=0;
            this.query();
        },
        query:function () {
            var __this = this;
            __this.tableStore.loading = true;
            BWAE.mgr_srv.ActivityChannelService.queryUpdloadSpecChannel(
                {
                    'req':{
                        'platform':__this.formStore.platform,
                        'channelId':__this.formStore.channelid,
                        'pageSize': __this.pageStore.pageSize,
                        'pageIndex': __this.pageStore.startline,
                    }
                },
                {
                    'onResult': function (result) {
                        if (result.code == 0) {
                            __this.pageStore.total = result.data.totalResult;
                            __this.tableStore.data = result.data.list;

                        }else {
                            __this.$confirm(result.data.message,'提示',{
                                confirmButtonText:"确定",
                                type:'info',
                                showCancelButton:false
                            })
                        }
                        __this.tableStore.loading = false;
                    }
                }
            )
        },
        //新增
        addShow: function () {
            if (this.$refs['addForm'] != undefined) {
                this.$refs['addForm'].resetFields();
            }
            this.addStore.isShow = true;
        },
        add: function () {
            var __this = this;
            __this.$refs['addForm'].validate(function (valid) {
                if (valid) {
                    BWAE.mgr_srv.ActivityChannelService.saveUpdloadSpecChannel(
                        {
                            'reqBean': {
                                'platform':__this.addStore.data.platform,
                                'channelid': __this.addStore.data.channelid,
                                'productType':__this.addStore.data.productType,
                                'productline': __this.addStore.data.productline,
                                'channelname': __this.addStore.data.channelname,

                            }
                        },
                        {
                            'onResult': function (result) {
                                if (result.code == 0) {
                                    __this.$alert(result.data.msg, '提示', {
                                        confirmButtonText: '确定',
                                        callback: function (action) {
                                            __this.addStore.isShow = false;
                                            __this.query();
                                        }
                                    });
                                } else {
                                    __this.$confirm(result.data.message, '提示', {
                                        confirmButtonText: "确定",
                                        type: 'info',
                                        showCancelButton: false,
                                    })
                                }
                            }
                        }
                    );
                }
            });
        },
        addCancel: function () {
            this.$refs['addForm'].resetFields();
            this.addStore.isShow = false;
        },
        //详情修改
        updateShow:function () {
            if(this.selStore.length==0){
                this.$alert("请先选择要修改的数据!", '提示', {
                    confirmButtonText: '确定',
                });
            }else{
                this.updateStore.data.id=this.selStore[0].id;
                this.updateStore.data.channelid=this.selStore[0].channelid;
                this.updateStore.data.productType=this.selStore[0].productType;
                this.updateStore.data.productline=this.selStore[0].productline;
                this.updateStore.data.channelname=this.selStore[0].channelname;
                this.updateStore.data.platform=this.selStore[0].platform;
                this.updateStore.isShow=true;
            }
        },
        update:function () {
            var __this=this;
            __this.$refs['updateForm'].validate(function(valid){
                if(valid) {
                    BWAE.mgr_srv.ActivityChannelService.saveUpdloadSpecChannel(
                        {
                            'reqBean': {
                                'id': __this.updateStore.data.id,
                                'platform':__this.updateStore.data.platform,
                                'channelid':__this.updateStore.data.channelid,
                                'productline': __this.updateStore.data.productline,
                                'productType':__this.updateStore.data.productType,
                                'channelname':__this.updateStore.data.channelname,
                            }
                        },
                        {
                            'onResult':function(result){
                                if(result.code==0){
                                    __this.$alert(result.data.msg, '提示', {
                                        confirmButtonText: '确定',
                                        callback: function(action){
                                            __this.updateStore.isShow=false;
                                            __this.query();
                                        }
                                    });
                                }else {
                                    __this.$confirm(result.data.message,'提示',{
                                        confirmButtonText:"确定",
                                        type:'info',
                                        showCancelButton:false,
                                    })
                                }
                            }
                        }
                    );
                }
            });
        },
        updateCancel:function () {
            this.$refs['updateForm'].resetFields();
            this.updateStore.isShow=false;
        },
        //删除
        delShow:function () {
            var __this=this;
            if(this.selStore.length==0){
                this.$alert("请先选择要删除的数据!", '提示', {
                    confirmButtonText: '确定',
                });
            }else{
                this.$confirm("继续删除吗?", '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function(){
                    __this.delete();
                }).catch(function(){
                });
            }
        },
        delete:function () {
            var __this=this;
            var arr=[];
            for(var i=0;i<this.selStore.length;i++){
                arr[i]=this.selStore[i].id;
            }
            BWAE.mgr_srv.ActivityChannelService.deleteUpdloadSpecChannel(
                {
                    'id':arr.join(","),
                },
                {
                    'onResult':function(result){
                        if(result.code==0){
                            __this.$alert(result.data.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: function(action){
                                    __this.query();
                                }
                            });
                        }else {
                            __this.$confirm(result.data.message,'提示',{
                                confirmButtonText:"确定",
                                type:'info',
                                showCancelButton:false,
                            })
                        }
                    }
                }
            );
        },
        channelnameRender:function(row,column){
            return globalRender(row.channelname,this.channelnameStore);
        },
        productlineRender:function (row,column) {
            return globalRender(row.productline,this.productlineStore);
        },
        platformRender:function(row,column){
            return globalRender(row.platform,this.platformStore);
        },
        productTypeRender:function(row,column){
            return globalRender(row.productType,this.productTypeStore);
        },
    },//methods
    created:function () {
        this.channelnameStore=globalStore('','tchannel','');
        this.productlineStore=globalStore('','tproductline','');
        this.productTypeStore=globalStore('','productType','');
    }
};
Vue.component("divComponent", Component);
new Vue({
    el: "#app"
});

````

````html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>主贴图片审核</title>
    <link rel="stylesheet" href="../css/el.css">
    <link rel="stylesheet" href="../css/univ.css">
    <script src="../js/mgr-srv/bwaerpc-i.js"></script>
    <script src="../lib/bwaerpc.js"></script>
    <script src="../js/mgr-srv/bwaerpc-i.js"></script>
    <script src="../lib/bwaepath.js"></script>
    <script src="../lib/json-mini.js"></script>
    <style type="text/css">
        .pic {
            overflow: auto;
            display: flex;
            display: -webkit-flex;
            flex-wrap: wrap;
            justify-content: flex-start;

        }

        .picBox {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 500px;
            height: 300px;
            margin-bottom: 6px;
            margin-right: 8px;
        }

        .clearfix .keyBox {
            font-size: 14px;
        }

        .picContent {
            width: 100%;
            height: 208px;
            overflow: auto;
        }

        .picContent .image {
            width: 160px;
            height: 180px;
            margin: 2px 1px;
        }

        .btnBox {
            width: 100%;
            padding: 3px;
            text-align: center;
        }
    </style>
</head>
<body>
<div id="app">
    <div-component></div-component>
</div>
<script type="text/x-template" id="template">
    <div>
        <el-card>
            <div slot="header">
                <el-button type="info" icon="search" @click="queryBtn">获取最新未审核帖子</el-button>
                <el-button type="info" icon="check" @click="lotPass">全部通过</el-button>
                <el-button type="info" icon="close" @click="lotReject">全部不通过</el-button>
            </div>
            <div class="pic" :style="{ height : screenStore.height + 'px'}">
                <div class="picBox" v-for="(item,index) in tableStore.data" v-key="index">
                    <el-card :body-style="{ padding: '0px' }">
                        <!--<img src="~examples/assets/images/hamburger.png" class="image">-->
                        <div style="padding: 7px;">
                            <div class="bottom clearfix">
                                <!--<span class="keyBox" >用户：</span>-->
                                <span class="keyBox" v-html="demoRender(item.nickName)"></span>
                                <span class="keyBox" style="float: right">编号：{{item.id}}</span>
                            </div>
                            <div class="bottom clearfix">
                                <span class="keyBox">用户编号：</span>
                                <el-button type="text" size="small" class="button"
                                           @click.native.prevent="queryShow(index,tableStore.data)">{{item.userNo}}
                                </el-button>
                            </div>
                        </div>
                        <div class="picContent">
                            <span v-if="!item.imageUrl"
                                  style="width: 100%;height: 100%;text-align: center;display: inline-block">暂无图片</span>
                            <span v-else>
                                 <img v-for="itemImg in item.imageUrl.split(',')" :src="itemImg" class="image">
                            </span>
                        </div>
                        <div class="btnBox">
                            <el-button type="info" size="small" @click.native.prevent="passShow(index,tableStore.data)">
                                通过
                            </el-button>
                            <el-button type="info" size="small" @click.native.prevent="hideShow(index,tableStore.data)">
                                不通过
                            </el-button>
                        </div>
                    </el-card>
                </div>
            </div>
            <div style="float: right;">
                <el-pagination @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="pageStore.pageIndex"
                               :page-sizes="pageStore.pageSizes"
                               :page-size="pageStore.pageSize"
                               :total="pageStore.total"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </el-card>
        <!--用户封停-->
        <el-dialog title="用户封停详情" v-model="userStore.isShow" size="small">
            <div>
                <el-table height="300" v-loading="userStore.loading"
                          element-loading-text="拼命加载中" highlight-current-row
                          :data="userStore.data" ref="user" border>
                    <el-table-column label="序号" type="index" width="70" show-overflow-tooltip></el-table-column>
                    <el-table-column label="产品" prop="usid" width="100" :formatter="productRender"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column label="用户编号" prop="userNo" width="160" show-overflow-tooltip></el-table-column>
                    <el-table-column label="昵称" prop="nickname" width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column label="评论权限状态" prop="status" width="140" :formatter="statusRender"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column label="评论权限" prop="status" width="110">
                        <template scope="scope">
                            <el-button type="text" size="small" v-if="scope.row.status == 1||scope.row.status == 2"
                                       @click.native.prevent="cancelShow(scope.$index,userStore.data)">
                                解除封停
                            </el-button>
                            <el-button type="text" size="small" v-if="scope.row.status ==0"
                                       @click.native.prevent="updateShow(scope.$index,userStore.data)">
                                封停
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="封停结束时间" prop="fengtingEndTime" width="180" :formatter="timeRender"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column label="被封停次数" prop="total" width="110">
                        <template scope="scope">
                            <el-button type="text" size="small"
                                       @click.native.prevent="totalShow(scope.$index,userStore.data)">
                                {{scope.row.total}}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip label=""></el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!--封停详情-->
        <el-dialog title="封停记录" v-model="userTabStore.isShow" size="small">
            <div>
                <el-table height="300" v-loading="userTabStore.loading"
                          element-loading-text="拼命加载中" highlight-current-row
                          :data="userTabStore.data" ref="userTable" border>
                    <el-table-column label="序号" type="index" width="70" show-overflow-tooltip></el-table-column>
                    <el-table-column label="封停时间" prop="fengTingTime" :formatter="timeRender" width="230"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column label="原因" prop="reason" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column label="备注" prop="remark" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column show-overflow-tooltip label=""></el-table-column>
                </el-table>
            </div>
            <div style="float: right;">
                <el-pagination @size-change="handletotalSizeChange"
                               @current-change="handletotalCurrentChange"
                               :current-page="userTabStore.pageStore.pageIndex"
                               :page-sizes="userTabStore.pageStore.pageSizes"
                               :page-size="userTabStore.pageStore.pageSize"
                               :total="userTabStore.pageStore.total"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </el-dialog>
        <!--***********用户封停**********-->
        <el-dialog title="用户封停" v-model="updateStore.isShow" size="small" :close-on-click-modal="false">
            <el-form :model="updateStore.data" ref="updateForm" :rules="updateStore.rule"
                     label-position="right"
                     label-width="120px">
                <el-row>
                    <el-col>
                        <el-form-item prop="userNo" label="用户编号" style="margin-top: 15px">
                            <el-input size="small" v-model="updateStore.data.userNo" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row type="flex">
                    <el-col :span="10">
                        <el-form-item prop="firstTime" label="封停时长" style="margin-top: 20px">
                            <el-input size="small" v-model.trim="updateStore.data.firstTime"
                                      :disabled="this.updateStore.data.temporary"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="temporaryTime" style="margin-top: 20px" label-width="10px">
                            <el-select v-model="updateStore.data.temporaryTime" filterable placeholder="请选择"
                                       size="small">
                                <el-option v-for="option in temporaryTimeStore"
                                           :label="option.text"
                                           :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-tooltip placement="top" effect="light">-->
                        <!--<div slot="content">封停时间-将关闭该用户发言多久时间<br/>默认永久封停，勾选需填写封停时间</div>-->
                        <!---->
                        <!--</el-tooltip>-->
                        <el-form-item prop="temporary" label="永久封停" style="margin-top: 20px" label-width="60px">
                            <el-checkbox v-model="updateStore.data.temporary" @change="temporaryChange"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item style="margin-top: -5px;margin-bottom: -8px">
                            <span style="color: red">永久封停和封停时间必须选填一项</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <el-form-item prop="commentStatus" label="是否封停历史帖子" style="margin-top: 20px">
                            <el-select v-model="updateStore.data.commentStatus" filterable clearable placeholder="请选择"
                                       size="small">
                                <el-option v-for="option in commentStatusStore"
                                           :label="option.text"
                                           :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row type="flex" v-if="updateStore.data.commentStatus == '1'">
                    <el-col :span="10">
                        <el-form-item prop="secondTime" label="隐藏范围" style="margin-top: 20px">
                            <el-input size="small" v-model.trim="updateStore.data.secondTime"
                                      :disabled="this.updateStore.data.part"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item prop="partTime" style="margin-top: 20px" label-width="10px">
                            <el-select v-model="updateStore.data.partTime" filterable placeholder="请选择"
                                       size="small">
                                <el-option v-for="option in partTimeStore"
                                           :label="option.text"
                                           :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-tooltip placement="top" effect="light">-->
                        <!--<div slot="content">封停范围-将该用户过去XX小时/天内的帖子同时隐藏<br/>默认封停范围为0，勾选需填写封停范围</div>-->
                        <!--</el-tooltip>-->
                        <el-form-item prop="part" label="全部隐藏" label-width="60px" style="margin-top: 20px">
                            <el-checkbox v-model="updateStore.data.part" @change="partChange"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="updateStore.data.commentStatus == '1'">
                    <el-col>
                        <el-form-item style="margin-top: -5px;margin-bottom: -8px">
                            <span style="color: red">永久隐藏和隐藏时间必须选填一项</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item prop="reason" label="封停原因" style="margin-top: 20px">
                            <el-select v-model="updateStore.data.reason" filterable clearable placeholder="请选择"
                                       size="small">
                                <el-option v-for="option in reasonStore"
                                           :label="option.text"
                                           :value="option.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item prop="remark" label="备注" style="margin-top: 20px">
                            <el-input rows="2" type="textarea" v-model="updateStore.data.remark"
                                      size="small"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateCancel">取 消</el-button>
                <el-button type="info" @click="update">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</script>
</body>
<script type="text/javascript" src="../lib/enumeration.js"></script>
<script type="text/javascript" src="../lib/vue.min.js"></script>
<script type="text/javascript" src="../lib/el.js"></script>
<script type="text/javascript" src="../lib/numeral.min.js"></script>
<script type="text/javascript" src="../js/common.js"></script>
<script type="text/javascript" src="../js/special-circlePostPictureAudit.js"></script>
</html>
````
---
````js
/**
 * Created by szhui on 2018/3/19.
 */
var Component = {
    template: "#template",
    data: function () {
        var validate = function (rule, value, callback) {
            if (value === '' || value === undefined) {
                callback(new Error('不能为空'));
            } else {
                callback();
            }
        };
        //新增,修改校验规则
        var rule = {
            replaceId: [
                {required: true, validator: validate, trigger: 'blur'}
            ],
            status: [
                {required: true, validator: validate, trigger: 'change'}
            ],
            reason: [
                {required: true, validator: validate, trigger: 'change'}
            ],
            commentStatus: [
                {required: true, validator: validate, trigger: 'change'}
            ],
        };
        return {
            //屏幕像素
            screenStore: {
                height: browerHeight - 210 - 3,//改变高度是只能改后面的数字
                width: screenWidth
            },
            //分页
            pageStore: {
                startline: 0,
                pageIndex: 1,
                pageSize: 10,
                total: 0,
                pageSizes: [10, 50, 100, 200],
            },
            //table
            tableStore: {
                loading: false,
                data: []
            },
            // 用户封停查询结果
            userStore: {
                isShow: false,
                loading: false,
                userNo: '',
                data: []
            },
            // 用户封停修改
            updateStore: {
                isShow: false,
                data: {
                    userNo: '',
                    status: '',
                    fengtingUserTime: '',
                    fengtingCommTime: '',
                    temporaryTime: 0,
                    partTime: 0,
                    temporary: false,
                    part: true,
                    firstTime: '',
                    secondTime: '',
                    usid: '',
                    commentStatus: '',
                    reason: '',
                    remark: '',
                },
                rule: rule
            },
            // 封停详情
            userTabStore: {
                isShow: false,
                loading: false,
                dataform: {
                    userNo: '',
                    usid: '',
                },
                data: [],
                //分页
                pageStore: {
                    startline: 0,
                    pageIndex: 1,
                    pageSize: 50,
                    total: 0,
                    pageSizes: [10, 50, 100, 200],
                },
            },
            //选中---> 修改，删除
            selStore: [],
            //枚举
            circleCodeStore: [],
            commentStatusStore: [{'text': '否', 'value': '0'}, {'text': '是', 'value': '1'}],
            reasonStore: GLOBAL_RENSON,
            productNameStore: [{'text': '全民', 'value': 'qm'}, {'text': '赢彩', 'value': 'yc'}, {
                'text': '智投',
                'value': 'zt'
            }, {'text': '连中', 'value': 'lz'}],
            // statusStore:[{'text':'开启','value':0},{'text':'关闭','value':1}],
            statusStore: [{'text': '正常', 'value': 0}, {'text': '部分封停', 'value': 1}, {'text': '永久封停', 'value': 2}],
            temporaryTimeStore: [{'text': '小时', 'value': 0}, {'text': '天', 'value': 1}],
            partTimeStore: [{'text': '小时内', 'value': 0}, {'text': '天内', 'value': 1}],

            warnStatusStore: [{'text': '已报警', 'value': 1}, {'text': '未报警', 'value': 2}],
            commStatusStore: [{'text': '发布中', 'value': 1}, {'text': '已隐藏', 'value': 2}],
            visableStore: [{'text': '可见', 'value': 1}, {'text': '不可见', 'value': 2}],
            reviewStore: [{'text': '未审核', 'value': 0}, {'text': '通过', 'value': 1}, {'text': '不通过', 'value': 2}],
        }
    },
    methods: {
        //查询
        queryBtn: function () {
            this.pageStore.pageIndex = 1;
            this.pageStore.startline = 0;
            this.query();
        },
        query: function () {
            var __this = this;
            __this.tableStore.loading = true;
            BWAE.mgr_srv.BallTalkService.queryUnCheckImageContent(
                {
                    'pageIndex': __this.pageStore.startline,
                    'pageSize': __this.pageStore.pageSize,
                },
                {
                    'onResult': function (result) {
                        if (result.code == 0) {
                            // console.log(result)
                            __this.pageStore.total = result.data.totalResult;
                            __this.tableStore.data = result.data.list;
                        } else {
                            __this.$confirm(result.data.message, '提示', {
                                confirmButtonText: "确定",
                                type: 'info',
                                showCancelButton: false
                            })
                        }
                        __this.tableStore.loading = false;
                    }
                }
            );
        },
        //分页
        handleSizeChange: function (pageSize) {
            this.pageStore.pageSize = pageSize;
            this.pageStore.pageIndex = 1;
            this.pageStore.startline = (this.pageStore.pageIndex - 1) * pageSize;
            this.query();
        },
        handleCurrentChange: function (pageIndex) {
            this.pageStore.startline = (pageIndex - 1) * this.pageStore.pageSize;
            this.pageStore.pageIndex = pageIndex;
            this.query();
        },
        // 用户封停查询
        queryShow: function (index, row) {
            this.userStore.userNo = row[index].userNo
            this.userQuery()
            this.userStore.isShow = true
        },
        userQuery: function () {
            var __this = this;
            __this.userStore.loading = true
            BWAE.mgr_srv.BallTalkService.getCommentUserByUser(
                {
                    'userNo': __this.userStore.userNo
                },
                {
                    'onResult': function (result) {
                        if (result.code == 0) {
                            __this.userStore.data = result.data.list;

                        } else {
                            __this.$confirm(result.data.message, '提示', {
                                confirmButtonText: "确定",
                                type: 'info',
                                showCancelButton: false
                            })
                        }
                        __this.userStore.loading = false
                    }
                }
            )
        },
        temporaryChange: function () {
            this.updateStore.data.firstTime = '';
        },
        partChange: function () {
            this.updateStore.data.secondTime = '';
        },
        // 封停
        updateShow: function (index, row) {
            this.updateStore.data.temporary = false;
            this.updateStore.data.part = false;
            this.updateStore.data.firstTime = '';
            this.updateStore.data.secondTime = '';
            this.updateStore.data.status = '';
            this.updateStore.data.commentStatus = '';
            this.updateStore.data.reason = '';
            this.updateStore.data.remark = '';
            this.updateStore.data.userNo = row[index].userNo;
            this.updateStore.data.usid = row[index].usid;
            this.updateStore.isShow = true;
        },
        update: function () {
            var __this = this;
            __this.$refs['updateForm'].validate(function (valid) {
                if (valid) {
                    if (!(__this.updateStore.data.temporary) && !(__this.updateStore.data.firstTime || __this.updateStore.data.firstTime === 0)) {
                        __this.$alert('永久封停和封停时间必须选填一项', '提示', {
                            confirmButtonText: '确定',
                            callback: function (action) {

                            }
                        });
                    } else if (__this.updateStore.data.commentStatus == '1' && !(__this.updateStore.data.part) && !(__this.updateStore.data.secondTime || __this.updateStore.data.secondTime === 0)) {
                        __this.$alert('永久隐藏和隐藏时间必须选填一项', '提示', {
                            confirmButtonText: '确定',
                            callback: function (action) {

                            }
                        });
                    } else {
                        if (!__this.updateStore.data.temporary && __this.updateStore.data.temporaryTime == 0) {
                            __this.updateStore.data.fengtingUserTime = __this.updateStore.data.firstTime;
                        } else if (!__this.updateStore.data.temporary && __this.updateStore.data.temporaryTime == 1) {
                            __this.updateStore.data.fengtingUserTime = String(__this.updateStore.data.firstTime * 24);
                        } else {
                            __this.updateStore.data.fengtingUserTime = null;
                        }

                        if (__this.updateStore.data.commentStatus == '1' && !__this.updateStore.data.part && __this.updateStore.data.partTime == 0) {
                            __this.updateStore.data.fengtingCommTime = __this.updateStore.data.secondTime;
                        } else if (__this.updateStore.data.commentStatus == '1' && !__this.updateStore.data.part && __this.updateStore.data.partTime == 1) {
                            __this.updateStore.data.fengtingCommTime = String(__this.updateStore.data.secondTime * 24);
                        } else {
                            __this.updateStore.data.fengtingCommTime = null;
                        }
                        BWAE.mgr_srv.BallTalkService.updateUserFengTing(
                            {
                                'bean': {
                                    "userNo": __this.updateStore.data.userNo,
                                    'status': __this.updateStore.data.status,
                                    "fengtingCommTime": __this.updateStore.data.fengtingCommTime,
                                    'fengtingUserTime': __this.updateStore.data.fengtingUserTime,
                                    'usid': __this.updateStore.data.usid,
                                    'reason': __this.updateStore.data.reason,
                                    'remark': __this.updateStore.data.remark,
                                    'commentStatus': __this.updateStore.data.commentStatus,
                                }
                            },
                            {
                                'onResult': function (result) {
                                    if (result.code == 0) {
                                        __this.$alert(result.data.msg, '提示', {
                                            confirmButtonText: '确定',
                                            callback: function (action) {
                                                __this.updateStore.isShow = false;
                                                __this.userQuery();
                                            }
                                        });
                                    } else {
                                        __this.$confirm(result.data.message, '提示', {
                                            confirmButtonText: "确定",
                                            type: 'info',
                                            showCancelButton: false,
                                        })
                                    }
                                }
                            }
                        );
                    }
                }
            });
        },
        updateCancel: function () {
            this.$refs['updateForm'].resetFields();
            this.updateStore.isShow = false;
        },
        // 解封
        cancelShow: function (index, row) {
            var __this = this;
            __this.$confirm("是否确认取消该用户的封停限制?", '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                BWAE.mgr_srv.BallTalkService.cancelUserFengTing(
                    {
                        "userNo": row[index].userNo,
                        'usid': row[index].usid
                    },
                    {
                        'onResult': function (result) {
                            if (result.code == 0) {
                                __this.$alert(result.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: function (action) {
                                        __this.userQuery();
                                    }
                                });
                            } else {
                                __this.$confirm(result.data.message, '提示', {
                                    confirmButtonText: "确定",
                                    type: 'info',
                                    showCancelButton: false,
                                })
                            }
                        }
                    }
                );
            }).catch(function () {

            });
        },
        // 封停次数
        totalShow: function (index, row) {
            this.userTabStore.dataform.userNo = row[index].userNo
            this.userTabStore.dataform.usid = row[index].usid
            this.userTabStore.pageStore.pageIndex = 1;
            this.userTabStore.pageStore.startline = 0;
            this.totalBtn()
            this.userTabStore.isShow = true
        },
        totalBtn: function () {
            var __this = this;
            BWAE.mgr_srv.BallTalkService.getUserFengTingDetail(
                {
                    'userNo': __this.userTabStore.dataform.userNo,
                    'usid': __this.userTabStore.dataform.usid,
                    'pageIndex': __this.userTabStore.pageStore.startline,
                    'pageSize': __this.userTabStore.pageStore.pageSize,
                },
                {
                    'onResult': function (result) {
                        if (result.code == 0) {
                            __this.userTabStore.pageStore.total = result.data.totalResult;
                            __this.userTabStore.data = result.data.list;

                        } else {
                            __this.$confirm(result.data.message, '提示', {
                                confirmButtonText: "确定",
                                type: 'info',
                                showCancelButton: false
                            })
                        }
                    }
                }
            )
        },
        //分页
        handletotalSizeChange: function (pageSize) {
            this.userTabStore.pageStore.pageSize = pageSize;
            this.userTabStore.pageStore.pageIndex = 1;
            this.userTabStore.pageStore.startline = (this.userTabStore.pageStore.pageIndex - 1) * pageSize;
            this.totalBtn();
        },
        handletotalCurrentChange: function (pageIndex) {
            this.userTabStore.pageStore.startline = (pageIndex - 1) * this.userTabStore.pageStore.pageSize;
            this.userTabStore.pageStore.pageIndex = pageIndex;
            this.totalBtn();
        },

        // 渲染
        productRender: function (row, column) {
            return globalRender(row.usid, this.productNameStore);
        },
        timeRender: function (row, column) {
            if (row.status == 2) {
                return '永久封停';
            } else {
                var json = eval("(" + eval("row." + column.property) + ")");
                if (json == null) {
                    return '';
                } else {
                    return dateDetailTime(json.time);
                }
            }
        },

        //通过or不通过
        passShow: function (index, rows) {
            var commentId = rows[index].id;
            var status = 2;
            this.pass(commentId, status);
        },
        hideShow: function (index, rows) {
            var commentId = rows[index].id;
            var status = 1;
            this.pass(commentId, status);
        },
        //全部通过or全部不通过
        lotPass: function () {
            var arr = [];
            for (var i = 0; i < this.tableStore.data.length; i++) {
                arr.push(this.tableStore.data[i].id)
            }
            var status = 2;
            this.pass(arr.join(','), status);
        },
        lotReject: function () {
            var arr = [];
            for (var i = 0; i < this.tableStore.data.length; i++) {
                arr.push(this.tableStore.data[i].id)
            }
            var status = 1;
            this.pass(arr.join(','), status);
        },
        // 通过接口
        pass: function (mainId, status) {
            var __this = this;
            BWAE.mgr_srv.BallTalkService.alterImageCheck(
                {
                    'mainId': mainId,
                    'status': status,
                },
                {
                    'onResult': function (result) {
                        if (result.code == 0) {
                            if (result.data.success) {
                                __this.$alert(result.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: function (action) {
                                        var arr = []
                                        if (mainId.toString().indexOf(',') == -1) {
                                            arr.push(mainId)
                                        } else {
                                            arr = mainId.split(',')
                                        }
                                        for (var i = 0; i < arr.length; i++) {
                                            __this.tableStore.data = __this.tableStore.data.filter(function (item) {
                                                return item.id != arr[i]
                                            })
                                        }
                                        // __this.query();
                                    }
                                });
                            } else {
                                __this.$alert(result.data.msg, '提示', {
                                    confirmButtonText: '确定',
                                    callback: function (action) {
                                        // __this.query();
                                    }
                                });
                            }
                        } else {
                            __this.$confirm(result.data.message, '提示', {
                                confirmButtonText: "确定",
                                type: 'info',
                                showCancelButton: false,
                            })
                        }
                    }
                }
            );
        },
        // 特殊字体高亮显示
        nickRender: function (value) {
            // var regex=/[a-zA-Z]|([①②③④⑤⑥⑦⑧０１２３４５６７８９0-9〇壹贰叁肆伍陆柒捌玖⑴⑵⑶⑷⑸⑹⑺⑻⑼].*)/;
            // var regex=/\d+:[0-5]\d:[0-5]\d$/;
            // value = '是否肆伍四⑧⑨hhh'
            var regex = /[一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾①②③④⑤⑥⑦⑧⑨⑩a-zA-Z0-9]/g;
            var a = value.match(regex);
            var b = value.split(regex);
            a = a ? a : [];
            for (var i = 0; i < a.length; i++) {
                var str = "<font style='color: red;'>" + a[i] + "</font>"
                b.splice(b.indexOf(""), 1, str)
            }
            // console.log(b)
            return '用户：' + b.join('')
        },
        statusRender: function (row, column) {
            return globalRender(row.status, this.statusStore);
        },
        demoRender: function (value) {
            value = value ? value : '';
            var regex = /[一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾①②③④⑤⑥⑦⑧⑨⑩a-zA-Z0-9]/g;
            var a = value.match(regex);
            a = a ? a : [];
            var arr = [];
            for (var k = 0; k < value.length; k++) {
                arr.push(value[k]);
            }
            for (var i = 0; i < a.length; i++) {
                var str = "<font style='color: red;'>" + a[i] + "</font>";
                var position = value.indexOf(a[i]);
                arr.splice(position, 1, str)
            }
            return arr.join(',').replace(/,/g, '');
        }
    },
    created: function () {
        this.queryBtn();
        this.circleCodeStore = globalStore('', "circleCodeType");
    }
};
Vue.component("divComponent", Component);
new Vue({
    el: "#app"
});
````
