---
title: webpack进阶
date: 2022-08-01 15:20:05
tags: webpack进阶
categories: webpack
---

#### 1、静态资源拷贝

有些时候，我们需要使用已有的JS文件、CSS文件 (本地文件)，但是不需要 webpack 编译。例如，我们在 public/index.html 中引入了 public 目录下的 js 或 css 文件，这个时候，如果直接打包，那么在构建出来之后，肯定是找不到对应的 js / css 了。

> public 目录结构

```
├── public
│   ├── config.js
│   ├── index.html
│   ├── js
│   │   ├── base.js
│   │   └── other.js
```

现在，我们在 index.html 中引入了 ./js/base.js。

```html
<!-- index.html -->
<script src="./js/base.js"></script>
```

这时候，我们 npm run dev，会发现有找不到该资源文件的报错信息。

对于这个问题，我们可以手动将其拷贝至构建目录，然后配置 CleanWebpackPlugin 时，注意不要清空对应的文件或文件夹即可，但是如若这个静态文件时不时的还会修改下，那么依赖于手动拷贝，是很容易出问题的。

不要过于相信自已的记性，依赖于手动拷贝的方式，大多数人应该都有过忘记拷贝的经历，你要是说你从来没忘记过。

幸运的是，webpack 为我们这些记性不好又爱偷懒的人提供了好用的插件 CopyWepackPlugin，它的作用就是将单个文件或整个目录复制到构建目录。

首先安装一下依赖：

```shell
npm install copy-webpack-plugin -D
```

修改配置(当前，需要做的是将 public/js 目录拷贝至 dist/js 目录):

```js
//webpack.config.js
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  //...
  plugins: [new CopyWebpackPlugin([{
      from: 'public/js/*.js',
      to: path.resolve(__dirname, 'dist', 'js'),
      flatten: true,
    }, //还可以继续配置其它要拷贝的文件
  ])]
}
```

此时，重新执行 npm run dev，报错信息已经消失。