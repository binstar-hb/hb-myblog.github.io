---
title: js大文件上传
date: 2023-03-27 19:55:41
tags: js大文件上传
categories: js
---

```js
function uploadFile(file) {
  const chunkSize = 1024 * 1024 * 2; // 分片大小，每个分片2MB
  const fileSize = file.size; // 文件大小
  const chunkNum = Math.ceil(fileSize / chunkSize); // 分片数量
  let uploadedSize = 0; // 已上传大小
  let chunks = []; // 分片列表
  // 上传分片
  function uploadChunks() {
    if (chunks.length === chunkNum) {
      // 所有分片上传完成，合并分片
      mergeChunks();
      return;
    }
    const start = chunks.length * chunkSize; // 分片起始位置
    const end = Math.min(start + chunkSize, fileSize); // 分片结束位置
    const chunk = file.slice(start, end); // 获取分片
    const fd = new FormData(); // 创建表单数据
    fd.append('chunk', chunk);
    fd.append('chunkNum', chunks.length + 1);
    fd.append('fileName', file.name);
    fd.append('fileSize', fileSize);
    const xhr = new XMLHttpRequest(); // 创建 AJAX 请求
    xhr.open('POST', 'upload.php', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        if (res.code === 0) {
          uploadedSize += chunk.size;
          chunks.push(res.data);
          // 更新上传进度
          const progress = uploadedSize / fileSize;
          updateProgress(progress);
          // 继续上传下一个分片
          uploadChunks();
        }
      }
    };
    xhr.send(fd);
  }
  // 合并分片
  function mergeChunks() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'merge.php', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        if (res.code === 0) {
          // 上传完成
          const url = res.data;
          uploadSuccess(url);
        } else {
          // 上传失败
          uploadFail()
        }
      }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      fileName: file.name,
      fileSize: fileSize,
      chunks: chunks
    }));
  }
  // 更新上传进度
  function updateProgress(progress) {
    // 更新进度条等UI
  }
  // 上传成功
  function uploadSuccess(url) {
    // 处理上传成功后的逻辑
  }
  // 上传失败
  function uploadFail(err) {
    // 处理上传失败后的逻辑
  }
  // 开始上传
  uploadChunks();
}
```

==uploadFile== 函数会先根据文件大小和分片大小计算出分片数量，然后依次上传每个分片，并记录已上传分片的信息。当所有分片上传完成后，会调用 ==mergeChunks== 函数将分片合并，并传递文件名、文件大小和分片信息给后端进行合并操作。最后，如果合并成功，就会调用==uploadSuccess==函数进行上传成功后的处理。 