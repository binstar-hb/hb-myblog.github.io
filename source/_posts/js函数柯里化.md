---
title: js函数柯里化
date: 2021-10-12 22:05:48
tags: js函数柯里化
categories: javaScript
---

&emsp;&emsp;函数柯里化，指的是将一个接受多个参数的函数，变为接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)。

&emsp;&emsp;如何实现add(1)(2)(3)(4)=10

```
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

