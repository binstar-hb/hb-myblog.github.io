---
title: webpack打包缓存问题
date: 2022-05-30 11:15:40
tags: webpack打包缓存问题
categories: webpack
---

#### 问题描述

因为浏览器缓存原因导致打包的文件偶尔会出现不能及时更新最新代码。

#### 解决方案

对于每次打包后的文件加上一个时间戳，使浏览器的缓存失效 找到vue.config.js文件下的chainWebpack 并加入以下配置

```js
 chainWebpack(config) {
    // 略......
    const timestamp = new Date().getTime()
    if (process.env.NODE_ENV === 'production') {
      // 给js和css配置版本号
      config.output.filename(`js/[name].${timestamp}.js`).end()
      config.output.chunkFilename(`js/[name].${timestamp}.js`).end()
      config.plugin('extract-css').tap(args => [{
        filename: `css/[name].${timestamp}.css`,
        chunkFilename: `css/[name].${timestamp}.css`
      }])
       // 注意 此处由坑
      //当我们配置了 打包后静态文件输出为 assetsDir:'static' 后
      // 那么下面的路径也应该加上static
      /*  config.output.filename(`static/js/[name].${timestamp}.js`).end()
        config.output.chunkFilename(`static/js/[name].${timestamp}.js`).end()
        config.plugin('extract-css').tap(args => [{
        filename: `static/css/[name].${timestamp}.css`,
        chunkFilename: `static/css/[name].${timestamp}.css`
          }]) */
    }
    // 略......
 }
```