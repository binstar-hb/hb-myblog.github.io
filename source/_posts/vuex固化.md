---
title: vuex固化
date: 2022-03-30 17:08:38
tags: vuex固化
categories: vue
---

前段时间写项目遇到一个问题，更改代码时页面自动刷新，vuex中的数据丢失，导致需要重新返回赋值的页面，开发起来影响效率，于是想到了vuex的持久化处理。

起初我是这样用的

先下载插件

```sh
npm install vuex-persistedstate --save
```

引入插件

```js
//在vuex初始化时导入插件
import persist from 'vuex-persistedstate'
//并使用
export default new Vuex.Store({
 state: {
 },
 mutations: {
 },
 actions: {
 },
 modules: {
 },
 plugins: [
   new persist({
     storage: window.localStorage,
   }),
 ],
 //会自动保存状态，刷新时不会丢失
})
```

奈何不知道出于什么原因，插件未生效，于是拿起我的百度大法

更换了另一种写法

在App.vue文件里做处理

```js
created() {
  //在页面加载时读取sessionStorage里的状态信息
  if (sessionStorage.getItem("store")) {
    this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
  }
  //在页面刷新时将vuex里的信息保存到sessionStorage里
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("store", JSON.stringify(this.$store.state))
  })
}
```

没错，它成了，百度大法好啊