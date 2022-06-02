---
title: gzip配置
date: 2022-05-30 11:10:32
tags: gzip
categories: webpack
---

一、安装插件（compression-webpack-plugin）

```
npm install compression-webpack-plugin --save-dev
```

可能出现的错误：

Unsupported URL Type: npm:vue-loader@^16.1.0

原因：npm版本过低

解决：更新npm版本
```
npm install -g npm
```

二、配置vue.config.js

```
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  // productionSourceMap: false,
  publicPath: '/',
  // 打包输出路径
  outputDir: 'dist',
  // 打包静态资源输出路径
  assetsDir: 'static',
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8082
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/scss/theme.scss";`
      }
    }
  },
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        // filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      })
    ]
  }
}
```

