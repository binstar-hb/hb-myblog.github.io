---
title: 微前端框架MicroApp
date: 2022-02-17 17:49:45
tags: 微前端框架MicroApp
categories: vue插件
---

#### 前言

这几年后端的微服务是比较火爆，我们公司目前只要是新项目，基本上都是基于微服务去架构的，那么微前端是什么呢？

微前端是借鉴了微服务的架构理念，核心在于将一个庞大的前端应用拆分成多个独立灵活的小型应用，每个应用都可以独立开发、独立运行、独立部署，再将这些小型应用融合为一个完整的应用，或者将原本运行已久、没有关联的几个应用融合为一个应用。微前端既可以将多个项目融合为一，又可以减少项目之间的耦合，提升项目扩展性，相比一整块的前端仓库，微前端架构下的前端仓库倾向于更小更灵活

#### 为什么不用iframe

以前我们为了把几个独立运行的小型应用合并成一个应用都是通过iframe的方式去实现的，如果不考虑体验问题，iframe 几乎是最完美的微前端解决方案了。

iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题

#### micro-app的优势

micro-app不是基于iframe架构的

##### 1、使用简单

micro-app提供了js沙箱、样式隔离、元素隔离、预加载、数据通信、静态资源补全等一系列完善的开箱即用功能

##### 2、零依赖

micro-app没有任何依赖

##### 3、兼容所有框架

为了保证各个业务之间独立开发、独立部署的能力，micro-app做了诸多兼容，在任何技术框架中都可以正常运行。

#### 简单使用

下面讲一下如何在Vue中使用micro-app

##### 1、初始化一个基座应用

```shell
// 初始化一个vue应用
// 大家可以理解这是一个基座应用
// 就是把其它的应用都向它身上集成
vue create main-app

// 安装micro-app 依赖
npm i @micro-zoe/micro-app --save
```

##### 2、基座应用的文件修改

main.js修改

```js
// 入口main.js
import Vue from "vue";
import App from "./App.vue";
// 路由信息
import router from "./router.js";
// 引入微前端
import microApp from "@micro-zoe/micro-app";

Vue.config.productionTip = false;

// 微前端基座应用启动
microApp.start();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

router.js修改

```js
// router.js 文件如下
import Vue from "vue";
import Router from "vue-router";
import mainPage from "../views/main-page.vue";

const routes = [
  {
    // 非严格匹配，/main-page/* 都指向 mainPage 页面
    path: "/main-page/*",
    name: "main-page",
    component: mainPage,
  },
];

const router = new Router({
  mode: "history",
  // 设置主应用基础路由为main-page
  // 子应用基础路由为/main-page/xxx
  base:'main-page',
  routes,
});

export default router
```

##### 3、main-page.vue页面

```vue
<template>
  <div>
    // 下面就是要接入的子应用url
    <h1>子应用</h1>
    // name(必传)：应用名称
    // url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
    // baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/main-page`
     -->
    <micro-app name='app1' url='http://localhost:3000/' baseroute='/main-page'></micro-app>
  </div>
</template>
```

##### 4、创建一个子应用

```shell
// 初始化一个vue应用
vue create child-app
```

##### 5、子应用的router.js文件修改

```js
const router = new Router({
  mode: "history",
  // __MICRO_APP_BASE_ROUTE__ 为micro-app传入的基础路由
  base: window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL,
  routes,
});
```

##### 6、src目录下新建public-path.js

```js
// __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__
// 是由micro-app注入的全局变量
if (window.__MICRO_APP_ENVIRONMENT__) {
  __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
}
```

##### 7、main.js 引入public-path.js

```js
// main.js
import Vue from "vue";
import App from "./App.vue";
import router from './router.js'
import "./public-path";

Vue.config.productionTip = false;

const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

// 监听卸载操作
window.addEventListener("unmount", function () {
  app.$destroy();
});
```

到此这个简单的微应用就搭好了!