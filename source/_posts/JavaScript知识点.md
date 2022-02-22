---
title: JavaScript知识点
date: 2022-02-16 18:02:32
tags: JavaScript知识点
categories: javaScript
---

##### 1.严格模式

- 使用严格模式，可以在函数内部进行较为严格的全局和局部的错误条件检查
- 严格模式的编译指示，"use strict"
- 创建全局变量，未声明变量，非严格模式下为创建全局变量；严格模式下为抛出ReferenceError
- 对变量调用delete操作符，删除变量，非严格模式下为静默失败；严格模式下为抛出ReferenceError
- 操作对象情况下：a，只读属性赋值会抛出TypeError；b，对不可配置的属性使用delete操作符会抛出TypeError；c，为不可扩展的对象添加属性会抛出TypeError。
- 重名属性情况：a，非严格模式下没有错误，以第二个属性为准；b，严格模式下会抛出语法错误。
- 函数参数必须唯一，重名参数，在非严格模式下没有错误，只能访问第二个参数；严格模式下，会抛出错误。