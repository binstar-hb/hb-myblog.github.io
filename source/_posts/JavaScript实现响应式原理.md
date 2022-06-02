---
title: JavaScript实现响应式原理
date: 2022-03-30 17:42:04
tags: JavaScript实现响应式原理
categories: javaScript
---

为什么前端框架Vue能够做到响应式？当依赖数据发生变化时，会对页面进行自动更新，其原理还是在于对响应式数据的获取和设置进行了监听，一旦监听到数据发生变化，依赖该数据的函数就会重新执行，达到更新的效果。那么我们如果想监听对象中的属性被设置和获取的过程，可以怎么做呢？

#### 1、Object.defineProperty

> 在ES6之前，如果想监听对象属性的获取和设置，可以借助Object.defineProperty方法的存取属性描述符来实现，具体怎么用呢？我们来看一下。

```js
const obj = {
  name: 'curry',
  age: 30
}

// 1.拿到obj所有的key
const keys = Object.keys(obj)

// 2.遍历obj所有的key，并设置存取属性描述符
keys.forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    get: function() {
      console.log(`obj对象的${key}属性被访问啦！`)
      return value
    },
    set: function(newValue) {
      console.log(`obj对象的${key}属性被设置啦！`)
      value = newValue
    }
  })
})

// 设置：
obj.name = 'kobe' // obj对象的name属性被设置啦！
obj.age = 24 // obj对象的age属性被设置啦！
// 访问：
console.log(obj.name) // obj对象的name属性被访问啦！
console.log(obj.age) // obj对象的age属性被访问啦！
```

在Vue2.x中响应式原理实现的核心就是使用的<font color="red">Object.defineProperty</font>，而在Vue3.x中响应式原理的核心被换成了<font color="red">Proxy</font>，为什么要这样做呢？主要是Object.defineProperty用来监听对象属性变化，有以下缺点：

- 首先，Object.defineProperty设计的初衷就不是为了去监听对象属性的，因为它的主要使用功能就是用来定义对象属性的；

- 其次，Object.defineProperty在监听对象属性功能上有所缺陷，如果想监听对象新增属性、删除属性等等，它是无能为力的；

#### 2、Proxy

