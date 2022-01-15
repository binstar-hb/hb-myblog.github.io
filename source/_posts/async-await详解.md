---
title: async/await详解
date: 2021-10-09 22:45:39
tags: async/await
categories: javaScript
---

#### 1、前言

&emsp;&emsp;async函数，也就是我们常说的async/await，是在ES2017(ES8)引入的新特性，主要目的是为了简化使用基于Promise的API时所需的语法。async和await关键字让我们可以用一种更简洁的方式写出基于Promise的异步行为，而无需刻意地链式调用Promise。

#### 2、详解

&emsp;&emsp;async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。需要注意的是await关键字只在async函数内有效，如果在async函数体之外使用它，会抛出语法错误。

##### 2.1、async

&emsp;&emsp;async函数返回一个 Promise对象，可以使用then方法添加回调函数。只要使用async，不管函数内部返回的是不是Promise对象，都会被包装成Promise对象。

- 函数返回非Promise对象

![](https://s3.bmp.ovh/imgs/2021/10/70747f2e8bf92b93.jpg)

&emsp;&emsp;可以看出函数直接返回字符串时，返回的是Promise对象，相当于直接通过Promise.resolve()将字符串封装为Promise对象。如果函数没有返回值时，PromiseResult结果为undefined。

- ###### 函数返回Promise对象

![](https://s3.bmp.ovh/imgs/2021/10/40b7d757806a77dd.jpg)

&emsp;&emsp;可以看出返回的也是Promise对象。

##### 2.2、await

&emsp;&emsp;await关键字可以跟在任意变量或者表达式之前，但通常await后面会跟一个异步过程。await使用时，会阻塞后续代码执行。我们先抛开async，单独谈await。

![](https://s3.bmp.ovh/imgs/2021/10/27e1e9190d623cff.png)

&emsp;&emsp;可以看出，使用了await后，必须得等testAsync方法执行完后，才会执行后续代码。也可以尝试一下把testAsync前的async去掉，看看跟加上await时有啥区别。

##### 2.3、async、await结合使用

**语法：**

```js
async function 函数名() {
	await XXX;
}
```

**示例代码：**

```js
function testAsync() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			if (true) {
				console.log('请求中...')
				resolve('resolve return')
			} else {
				reject('reject return')
			}
		}, 2000)
	})
}

function testAsync2() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			if (true) {
				console.log('请求中2...')
				resolve('resolve return2')
			} else {
				reject('reject return2')
			}
		}, 2000)
	})
}

async function test() {
	console.log('test开始...');
	var value1 = await testAsync();
	console.log(value1);
	var value2 = await testAsync2();
	console.log(value2);
	var value3 = await 'test结束...';
	console.log(value3);
}

console.log(test());
```

<img src="https://s3.bmp.ovh/imgs/2021/10/6be29362930c2ac9.jpg" style="zoom:50%;" />

&emsp;&emsp;上图可以看出遇到第一个await后，立即返回了Promise对象，然后再按顺序去执行testAsync函数，等待testAsync函数执行后再去执行testAsync2函数。还可以看出async函数可以简化Promise的语法，以往我们需要使用.then去处理回调，现在我们可以使用await像写同步代码一样去写异步代码。

&emsp;&emsp;再升级一下，在上面的基础上再加入两个普通函数：

```js
function fun1() {
	return '函数1'
}

function fun2() {
	return '函数2'
}

function fun3() {
	console.log(fun1());
	console.log(test()); // async/await函数
	console.log(fun2());
}

 console.log(fun3());
```

<img src="https://s3.bmp.ovh/imgs/2021/10/0f950b00a372fa86.jpg" style="zoom:50%;" />

梳理一下函数的执行过程:

1. 先执行函数1
2. 进入test函数并输出开始
3. 在test函数中遇到await，立即返回Promise对象
4. 执行函数2
5. 执行test函数中的testAsync方法
6. 等到test函数中的testAsync方法执行完后，继续执行testAsync2方法
7. test函数结束

&emsp;&emsp;可以看出，async函数在遇到await后会立即返回Promise对象，继续执行async函数外部后续逻辑，async函数内部会被await阻塞并按顺序执行代码逻辑。

##### 2.4、async、await异常处理

&emsp;&emsp;await后面的函数是有可能出现异常的，所以最好把await命令放在try...catch代码块中。如果await后是Promise对象，也可以使用.catch进行捕获。

```js
 // 第一种写法
 async function myFunction() {
   try {
     await something();
   } catch (err) {
     console.log(err);
   }
 }
 
 // 第二种写法
 async function myFunction() {
   await somethingPromise()
   .catch(function (err) {
     console.log(err);
   });
 }
```

#### 3、总结

&emsp;&emsp;async函数在遇到await后会立即返回Promise对象，继续执行async函数外部逻辑，async函数内部会被await阻塞并按顺序执行代码逻辑。

&emsp;&emsp;可以使用try...catch或.catch对async函数进行异常处理。