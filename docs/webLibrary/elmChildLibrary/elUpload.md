# el-upload
---

### 1.上传文件
1.前端以form-data格式上传文件流
````vue
<el-upload ref="upload" :http-request="upload" :show-file-list="false">
    <el-button>选取文件</el-button>
</el-upload>
````
___
````js
callFlow(url, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            headers: {
                'csrf-token': token,
            },
            url: '/native' + url,
            dataType: 'json',
            data: data,
            processData: false,
            contentType: false,
            success: (res) => {
                resolve(res)
            },
            error: (err) => {
                reject(err)
            },
        })
    })
},

upload(options) {
      this.uploadStore.data.fileName = options.file.name;
      var formData = new FormData();
      formData.append("file",options.file);
      this.uploadStore.data.file = formData;
},

// 接口调用
async importExcel() {
      try {
          const data = await this.callFlow(
              url,   //url地址
              this.uploadStore.data.file,
          )
          if (data.msgCode == '0') {
              this.$confirm('上传成功！', '提示', {
                  confirmButtonText: "确定",
                  type: 'info',
                  showCancelButton: false
            })
          } else {
              this.$confirm(data.msgContent, '提示', {
                  confirmButtonText: "确定",
                  type: 'info',
                  showCancelButton: false
              })
          }
      } catch (err) {
          this.$alert('接口访问出错！', '提示', {
              confirmButtonText: '确定',
          });
      }
},

````

![formData](/img/elChildLibrary/formData.png)
___
![formData](/img/elChildLibrary/formDataFile.png)

2.上传流文件转码
````js
getBinaryString(file) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let fileResult = "";
        reader.readAsBinaryString(file);
        reader.onload = function () {
            fileResult = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(fileResult);
        };
    });
},
upload(options) {
    this.uploadStore.data.fileName = options.file.name;
    this.getBinaryString(options.file).then(res => {
        this.uploadStore.data.file = res;
    });
},
````

FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。

![fileReader](/img/elChildLibrary/fileReader.png)
FileReader 处理事件
![fileReaderEvent](/img/elChildLibrary/fileReaderEvent.png)

### 2.下载文件
1.后端返回乱码流文件(如下图)，前端导出excel

![binaryFile](/img/elChildLibrary/binaryFile.png)
___
````js
callFlow(url, data) {
      return new Promise((resolve, reject) => {
          $.ajax({
              type: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'csrf-token': token,
              },
              xhr: function () {
                  var xhr = new XMLHttpRequest();
                  xhr.responseType = 'arraybuffer';
                  return xhr;
              },
              url: '/native' + url,
              data: JSON.stringify(data),
              success: (res) => {
                  resolve(res)
              },
              error: (err) => {
                  reject(err)
              },
          })
      })
},

// 导出excelData数据
const link = document.createElement('a')
let blob = new Blob([excelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8" })
link.style.display = 'none'
link.href = URL.createObjectURL(blob)
//下载的文件名
// link.download = data.headers['content-disposition']
// link.download = data.fileName
link.download = "自定义名称"
// link.download.download =new Date().getTime()
document.body.appendChild(link)
link.click()
document.body.removeChild(link)
````

