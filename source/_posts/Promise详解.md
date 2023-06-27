---
title: Promise详解
date: 2022-07-21 19:26:34
tags: Promise
---
#### 1. 含义

> Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。
> 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

#### 2. 异步和回调

只要有一件异步事情发生时，就会存在两个阶段 unsettled未决阶段和settled已决阶段
事情总是从未决阶段走向已决阶段，并且未决阶段拥有控制通往已决阶段的能力，可以决定事情最终走向的结果。

将程序分为三种状态 pending resolved rejected。
pending 等待  处于unsettled阶段,表示事情还在等待最终的结果。
resolved 已处理  处于setteled阶段，表示事情已经出现结果，并且可以按照正常的逻辑进行下去的结果。
rejected 已拒绝 处于setteled阶段，表示事情已经出现结果，并且不可以按照正常的逻辑进行下去的结果。

把事情从pending状态推向resolved状态的过程中，可能会传递一些数据，这些数据为真实有效数据。
把事情从pending状态推向rejected状态的过程中，可能会传递一些数据，这些数据为错误信息

无论是在哪个阶段还是那个状态，都是不可逆。

当事情已经到达已决阶段后，通常用结果数据做一些后续处理，不同的已决结果，可能造成不同的后续处理。
resolved 后续处理表示为thenable
rejected 后续处理表示为catchable

后续处理可能有多个，因此会形成任务队列，这些后续处理会按照顺序当到达对应的状态时会依次执行。

#### 3. promise方法

| 方法      | 类型     | 简介                                                         |
| --------- | -------- | ------------------------------------------------------------ |
| then()    | 原型方法 | 可以处理thenable和catchable                                  |
| catch()   | 原型方法 | 可以处理catchable                                            |
| finally() | 原型方法 | 用于不管promise最后状态如何，都会执行finally方法             |
| resolve() | 静态方法 | 常见promise成功的实例                                        |
| all()     | 静态方法 | 返回一个promise对象，当数组里面的所有promise对象的状态都为resolve，者新的promise对象的状态为resolve，反之有一个rejected状态，则新的promise对象的状态为resolve |

**Promise.all()**

```js
const promises=[async(1),async(2),async(3),async(4)]
 
Promise.all(promises)
.then(values=>{
    //...
})
.catch(err=>console.error(err))
```

**Promise.case()**

```js
const promises=[async(1),async(2),async(3),async(4)]
 
Promise.race(promises)
.then(values=>{
    //...
})
.catch(err=>console.error(err))
```

#### 4. promise解决了什么问题

1. 回调地狱问题：
Promise是回调地狱的解决方案之一，我们使用Promise的语法来解决回调地狱的问题，使代码拥有可读性和可维护性，有时候前端为了能够拿到异步的数据，使用了大量的回调函数，来获取将来异步执行成功之后的数据。从一定程度上来说，回调地狱能解决问题，但是有缺点，或者说不优雅，阅读性非常差，而Promise就解决了这个问题。

2. 代码的可读性问题：
让代码更加直观优雅精简，让人更容易的去阅读代码，也方便代码bug的寻找。

3. 信任问题：
回调函数不能保证什么时候去调用回调，以及使用什么方式去调用回调；而Promise一旦被确认成功或失败，就不能再被更改。Promise成功之后仅调用一次resolve()，不会产生回调多次执行的问题。除非Promise再次调用。所以Promise很好地解决了第三方工具导致的回调多次执行（控制反转）的问题。

#### 5. promise有哪几个状态

1. pending等待
2. resolved已处理
3. rejected已拒绝