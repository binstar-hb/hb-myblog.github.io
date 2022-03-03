---
title: 常用js工具库
date: 2022-02-15 17:06:04
tags: js工具库
categories: js工具库
---

#### Day.js

Day.js是一个轻量化的JavaScript库，文件大小仅有2KB左右，且浏览器的兼容性好，可以为浏览器解析、验证、操作时间和日期。

```shell
$ npm install dayjs
```

#### Flv.js

Flv.js是由 bilibili 网站开源的HTML5 视频中播放 FLV 格式视频的 JavaScript 库。flv.js 实现了在 HTML5 上播放 FLV 格式视频。由于flash性能安全和可靠性的问题是长期以来深受诟病，Flv.js可以利用html5的video标签将http-flv直播流实时播放的一个js版的播放器来代替flash。

```shell
$ npm install flv.js
```

#### Lodash

lodash.js是一个简单实用模块化、高性能的 JavaScript 实用工具库，lodash是对各种方法、函数的封装，使得使用更加方便，可以让开发变得更加的简单。

```shell
$ npm i --save lodash
```

#### FileSaver.js

FileSaver.js 是一个在客户端保存文件的一个js库，Api简单易用，非常适合需要生成文件，或者保存不应该发送到外部服务器的敏感信息的 web App。

```sh
npm install file-saver --save
```

##### 使用

```js
// 引入
import { saveAs } from 'file-saver'

// 保存文本
// 生成blob文本
const blob = new Blob(["您好!"], {type: "text/plain;charset=utf-8"});
// 第二个参数指定保存的文件名
saveAs(blob, "hello.txt");

// 保存文件流(url链接)
// 比如后台传过来的文件流
saveAs("https://httpbin.org/image", "image.jpg");

// 把canvas保存成一个图片
const canvas = document.getElementById("myCanvas");
canvas.toBlob(function(blob) {
    saveAs(blob, "image.png");
});

// 保存纯文件
const file = new File(["您好!"], "hello.txt", {type: "text/plain;charset=utf-8"});
saveAs(file);
```