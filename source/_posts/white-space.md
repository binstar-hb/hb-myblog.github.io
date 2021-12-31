---
title: CSS white-space 属性
date: 2021-10-11 20:51:48
tags: white-space
categories: css
---

##### 兼容性：

&emsp;&emsp;所有浏览器都支持 white-space 属性。

&emsp;&emsp;注释：任何的版本的 Internet Explorer （包括 IE8）都不支持属性值 "inherit"。

##### 官方定义和用法：

&emsp;&emsp;这个属性声明建立布局过程中如何处理元素中的空白符。值 pre-wrap 和 pre-line 是 CSS 2.1 中新增的。

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| normal   | 默认。空白会被浏览器忽略。                                   |
| pre      | 空白会被浏览器保留。其行为方式类似 HTML 中的 <pre> 标签。    |
| nowrap   | 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 |
| pre-wrap | 保留空白符序列，但是正常地进行换行。                         |
| pre-line | 合并空白符序列，但是保留换行符。                             |
| inherit  | 规定应该从父元素继承 white-space 属性的值。                  |

###### pre-line

&emsp;&emsp;合并空格，保留换行符，允许自动换行

###### normal

&emsp;&emsp;合并空格，换行符转化为一个空格，允许自动换行

###### nowrap

&emsp;&emsp;合并空格，换行符转化为一个空格，不允许自动换行

###### pre

&emsp;&emsp;保留空格，保留换行符，不允许自动换行

###### pre-wrap

&emsp;&emsp;保留空格，保留换行符，允许自动换行。

| **值**   | **空白符** | **换行符** | **自动换行** |
| -------- | ---------- | ---------- | ------------ |
| pre-line | 合并       | 保留       | 允许         |
| normal   | 合并       | 忽略       | 允许         |
| nowrap   | 合并       | 忽略       | 不允许       |
| pre      | 保留       | 保留       | 不允许       |
| pre-wrap | 保留       | 保留       | 允许         |