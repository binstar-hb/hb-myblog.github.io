---
title: 用CSS代码让你的列表网页提升渲染性能
date: 2021-10-03 20:47:58
tags:
categories: css
---

&emsp;&emsp;在长列表网页，DOM元素较多的情况下，我们会经常采用虚拟滚动、分页、上拉加载更多等不同的方式来进行优化，需要写大量的js或者css逻辑去实现。现在，我们多了一种方式——content-visibility。只需要一行CSS代码，就可以实现可见网页只加载可见区域内容。

##### content-visibility属性有三个可选值:

- visible: 默认值。对布局和呈现不会产生什么影响。
- hidden: 元素跳过其内容的呈现。用户代理功能（例如，在页面中查找，按Tab键顺序导航等）不可访问已跳过的内容，也不能选择或聚焦。类似于对其内容设置了display: none属性。
- auto: 对于用户可见区域的元素，浏览器会正常渲染其内容；对于不可见区域的元素，浏览器会暂时跳过其内容的呈现，等到其处于用户可见区域时，浏览器在渲染其内容。

##### 代码：

```html
    <div class="card"></div>
    <div class="card"></div>
    <!-- ... -->
    <!-- 此处省略n个<div class="card"></div> -->
    <!-- ... -->
    <div class="card"></div>
```



```css
 .card {
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    background-color: #ffaa00;
    content-visibility: auto;
  }
```

##### 问题：

&emsp;&emsp;当元素的部分内容如img标签这种，元素的高度是有图片内容决定的，因此在这种情况下，如果使用content-visibility，则可见视图外的img初始未渲染，高度为0，随着滚动条向下滑动，页面高度增加，会导致滚动条的滚动有问题

##### 解决方法：

&emsp;&emsp;如果在已知元素高度的情况下，可以使用contains-intrinsic-size属性，为上面的card添加：contains-intrinsic-size：312px;，这会给内容附一个初始高度值。（如果高度不固定也可以附一个大致的初始高度值，会使滚动条问题相对减少）。

##### 总结：

&emsp;&emsp;content-visibility是一个非常实用的CSS属性，虽然其兼容性现在不是很好，但是相信不久的将来这并不是问题。现在来看是部分场景下它对浏览器的滚动条影响问题，如果你的列表项高度相同，那么可以通过contain-intrinsic-size来设置一个初始高度解决。如果列表项高度不固定而又非常重视用户的滚动条体验，那么不建议使用此属性。