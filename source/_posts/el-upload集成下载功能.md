---
title: el-upload集成下载功能
date: 2022-08-17 21:45:32
tags: el-upload集成下载功能
---

#### 需求：

在一个工作计划模块中，在新增或修改计划单时，要实现一个文件上传的功能，已上传的文件要实现点击下载。

首先，实现文件上传的功能

```vue
<el-upload
action="/uploadApi"
:file-list="fileList"
:on-success="uploadSuccess">
	<el-button size="small" type="primary"">上传文件</el-button>
</el-upload>
```

然后，文件上传成功之后要关联到该计划单，我是这样做的

```js
uploadSuccess (response, file, fileList) {
  if (response.code && response.code === '0') {
    const params = {} 
    // 此处关联计划单
    api.associationFile(params).then(res => {
      if (res.code === 0) {
        this.$message.success('上传成功！')
      }
    })
  } else {
    // 此处做上传失败的处理
    this.fileList = this.fileList.slice(0, this.fileList.length - 1)
    this.$message.error('上传失败！')
  }
},
```

接着，要实现文件点击下载的功能，这时要做已上传文件的自定义化处理

```vue
<el-upload
	class="upload-demo"
	action="/uploadApi"
	:file-list="fileList"
	:on-success="uploadSuccess">
  <el-button size="small" type="primary"">上传文件</el-button>
  <div slot="file" slot-scope="{ file }">
    <li class="el-upload-list__item is-success">
      <a @click="downloadFile(file)" class="el-upload-list__item-name">
        <i class="el-icon-document"></i>{{ file.name }}
      </a>
      <label class="el-upload-list__item-status-label">
        <i class="el-icon-upload-success el-icon-circle-check"></i>
      </label>
      <i @click.stop="deletefile(file)" class="el-icon-close"></i>
    </li>
  </div>
</el-upload>
```

文件的回显和删除很简单，这里不再赘述了。

那么问题来了，新上传的文件删不掉，原因是新上传的文件在调用删除方法时<font color=blue>deletefile</font>获取的<font color=red>file</font>参数与回显的文件不太一样，是一个带有code值的请求返回参数，而不是带有id和fileName、downloadUrl等参数的对象，因此此时文件删除和下载就出现问题了。

我的第一想法是，fileList是回显出来的，并没有问题，那我我在上传成功的钩子函数中对fileList做处理，让新上传的文件参数与旧的文件一致，事实上功能实现了，但是出现了新的问题，文件上传成功的动画是在on-success钩子函数之后执行的，我在这个函数里面对fileList做了更改导致了页面闪烁，这样肯定不行。

那么换一个思路，<font color=blue>deletefile</font>方法参数的来源在哪里，新的文件为什么会是一个请求response，我突然想起来那个on-success钩子函数的第一个参数不正是那个response吗，那么他的第二个参数<font color=red>file</font>会不会直接影响到<font color=blue>deletefile</font>方法的入参呢，果然！就！是！他

附代码：

```js
uploadSuccess (response, file, fileList) {
  if (response.code && response.code === '0') {
    const params = {} 
    // 此处关联计划单
    api.associationFile(params).then(res => {
      if (res.code === 0) {
        this.$set(file, 'id', response.id)
        this.$set(file, 'downloadUrl', response.url)
        this.$message.success('上传成功！')
      }
    })
  } else {
    this.fileList = this.fileList.slice(0, this.fileList.length - 1)
    this.$message.error('上传失败！')
  }
},
```

小小bug——……^_^