# 上传文件
---

1.
```` html
<el-upload
    action=""
    :show-file-list="false"
    :http-request="upload">
</el-upload>
````

````js
upload (options){
    if(options.file.type!="image/jpg"&&options.file.type!="image/jpeg"&&options.file.type!="image/png"&&options.file.type!="image/gif"){
        this.$alert('上传图片只能是JPG,PNG,GIF格式！','提示',{
            confirmButtonText:"确定"
        })
    }else{
        let quill = this.$refs.myQuillEditor.quill;
        let reader = new FileReader();
        reader.readAsDataURL(options.file);
        reader.onload = function(e){
            let charPosition = this.result.indexOf(',');
            let base64String = this.result.substring(charPosition+1);
            let filename = options.file.name;
            let secondChar = filename.indexOf('.');
            let pattern = filename.substring(secondChar);
            articlePublishImg(base64String,pattern).then(res => {
                if(res.errorCode == '1011'&& res.result !== null){
                    let length = quill.getSelection().index;
                    quill.insertEmbed(length, 'image', res.result);
                    quill.setSelection(length + 1)
                }else{
                    this.$alert('上传失败，请重新插入图片！','提示',{
                        confirmButtonText:"确定"
                    })
                }
            })
        }
    }
},
````

2.
````html
<el-dialog title="批量新增" size="tiny" v-model="uploadStore.isShow">
    <el-form label-width="100px" :model="uploadStore.data"  ref="uploadStoreForm" :rules="uploadStore.rule" label-position="right">
        <el-form-item prop="fileName" label="名称（文件）:" style="margin-bottom: 20px">
            <el-input v-model="uploadStore.data.fileName" type="input" readonly></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer">
        <el-upload
                ref="upload"
                :multiple="false"
                :action="uploadStore.uploadUrl"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleChange"
                :on-success="handleSuccess"
                :on-error="handleError"
                :data='uploadStore.data'
                :file-list="uploadStore.fileList"
                :disabled="uploadStore.isDisabled">
            <el-button slot="trigger" size="small" type="primary"  :disabled="uploadStore.chooseDisabled">选取文件</el-button>
            <el-button @click="submitCancel" style="margin-left: 10px;">重置</el-button>
            <el-button size="small" type="primary" @click="submit" :disabled="uploadStore.uploadShow">上传文件</el-button>
        </el-upload>
    </div>
</el-dialog>
````

````js
uploadStore: {
    uploadUrl:BWAEPATH['upload'] + "/weekBackUser/batchAdd",
    isShow:false,
    isDisabled:false,
    chooseDisabled:false,
    uploadShow:false,
    data: {
        fileName:'',
    },
    fileList:[],
    rule: rule,
},

//上传
submit:function () {
    var __this=this;
    __this.$refs['uploadStoreForm'].validate(function(valid) {
        if (valid) {
            __this.uploadStore.uploadShow = true;
            __this.$refs.upload.submit();
        }
    });

},
submitCancel:function () {
    this.$refs['uploadStoreForm'].resetFields();
    this.$refs.upload.clearFiles();
    this.uploadStore.isDisabled=false;
    this.uploadStore.chooseDisabled=false;
},
handleChange:function (file, fileList) {
    this.uploadStore.uploadShow = false;
    if(fileList.length==0){
        this.uploadStore.isDisabled=false;
        this.uploadStore.chooseDisabled=false;
        this.uploadStore.data.fileName=''
    }else {
        this.uploadStore.isDisabled=true;
        this.uploadStore.chooseDisabled=true;
        this.uploadStore.data.fileName=file.name
    }
},
//上传成功时的返回参数
handleSuccess:function (response,file,fileList) {
    var __this=this;
    this.$confirm(response.msg, '提示', {
        confirmButtonText: "确定",
        type: 'info',
        showCancelButton: false,
        closeOnPressEscape:false,
        closeOnClickModal:false,
    }).then(function() {
        __this.submitCancel()
    });
},
//上传失败时的返回参数
handleError:function (err,file,fileList) {
    var __this=this;
    if(err.status==403){
        this.$confirm('You do not have permission.', '提示', {
            confirmButtonText: "确定",
            type: 'info',
            showCancelButton: false,
            closeOnPressEscape:false,
            closeOnClickModal:false
        })
    }else if(err.status==401){
        window.top.location.href="/index.html";
    }else {
        this.$confirm(err.msg, '提示', {
            confirmButtonText: "确定",
            type: 'info',
            showCancelButton: false,
            closeOnPressEscape:false,
            closeOnClickModal:false
        }).then(function() {
            __this.submitCancel()
        });
    }
},
````
