---
title: js函数柯里化
date: 2021-10-12 22:05:48
tags: js函数柯里化
categories: javaScript
---

&emsp;&emsp;函数柯里化，指的是将一个接受多个参数的函数，变为接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)。

&emsp;&emsp;如何实现add(1)(2)(3)(4)=10

**方法一**

```js
function add(){
	// 将传入的不定参数转为数组对象
	var _args = Array.prototype.slice.call(arguments);
	var _adder = function(){
		_args.push(...arguments)
		return _adder
	}
	// toString隐形转换的特性
	_adder.toString = function(){
		return _args.reduce((a,b) => {
			return a + b
		}, 0)
	}
	return _adder
}
console.log(add(1,2,3)) // 6
console.log(add(1)(2)(3)) // 6
```

**方法二**

```js
// 函数柯里化，利用递归和闭包实现
const curry = function(fn) {
  const len = fn.length; // 获取初始函数fn的形参个数
  
  // curry返回改造后的函数
  return function t() {
    const innerLength = arguments.length; // 获取t的实参个数
    const args = Array.prototype.slice.call(arguments); // 将类数组arguments对象转为真正的数组（类数组arguments对象是函数传入的实际参数，类似数组，拥有数组属性，但不是数组）
      
    if (innerLength >= len) { // 递归出口，如果t实参个数已经大于fn形参个数,则终止递归
      return fn.apply(undefined, args) // 执行改造后的函数

    } else { // 如果t的实参个数少于fn的形参个数，说明柯里化并没有完成，则继续执行柯里化
      return function () {
        const innerArgs = Array.prototype.slice.call(arguments); // 将类数组arguments对象转为真正的数组（类数组arguments对象是函数传入的实际参数，类似数组，拥有数组属性，但不是数组）
        const allArgs = args.concat(innerArgs);
        return t.apply(undefined, allArgs)
      }
    }
  }
}

// 测试
function add (num1, num2, num3, num4, num5) {
  return num1 + num2 + num3 + num4 + num5;
}


const finalFun = curry(add);
const result1 = finalFun(1)(2)(3)(4)(5);
const result2 = finalFun(1, 2)(3)(4)(5);
const result3 = finalFun(1,2,3)(4)(5);
const result4 = finalFun(1,2,3)(4, 5);

console.log(result1, result2, result3, result4); // 15 15 15 15
```