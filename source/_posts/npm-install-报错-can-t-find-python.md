---
title: npm install 报错 can't find python
date: 2022-08-25 17:46:31
tags: can't find python
---

#### npm install 时报错 <font color=red>gyp ERR! stack Error : can't find python executable "python",you can set the PYTHON env variable.</font>解决办法

1.vue中安装node-sass

```shell
npm install node-sass --save-dev
```

2.管理员模式下

```shell
npm install --global --production windows-build-tools
```

3.再执行

```shell
npm install --global node-gyp 
```