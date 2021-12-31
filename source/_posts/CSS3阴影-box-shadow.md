---
title: CSS3阴影(box-shadow)
date: 2021-10-06 22:51:21
tags:
categories: css
---

##### 1、单侧投影

- 外 box-shadow 前四个参数：x 偏移值、y 偏移值 、模糊半径、扩张半径。 

- 单侧投影的核心是第四个参数：扩张半径。这个参数会根据你指定的值去扩大或缩小投影尺寸，如果我们用一个负的扩张半径，而他的值刚好等于模糊半径，那么投影的尺寸就会与投影所属的元素尺寸完全一致，除非使用偏移量来移动他，否则我们将看不到任何投影。

```
<style>
.left {
 box-shadow: -8px 0 5px -5px #333;
}
.right {
 box-shadow: 8px 0 5px -5px #333;
}
.top {
 box-shadow: 0 -8px 5px -5px #333;
}
.bottom {
 box-shadow: 0 8px 5px -5px #333;
}
</style>
<div class='left'>左</div>
<div class='right'>右</div>
<div class='top'>上</div>
<div class='bottom'>下</div>
```

![](https://s3.bmp.ovh/imgs/2021/10/990e7064af72aa94.png)

##### 2、立体文字阴影

- 立体文字阴影的关键点在于多层 text-shadow 的叠加
- 合理运用了 SASS 函数来自动计算多层 text-shadow 的 CSS 代码
- 运用了 Sass 的颜色函数，渐进实现层级阴影颜色 - fade-out: 改变颜色的透明度，让颜色更加透明 - desaturate: 改变颜色的饱和度值，让颜色更少的饱和
- HSL(颜色值)
- - H：Hue(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
  - S：Saturation(饱和度)。取值为：0.0% - 100.0%
  - L：Lightness(亮度)。取值为：0.0% - 100.0%

```
<style>
@function blessing($color) {
 $val: 0px 0px $color;
 @for $i from 1 through 50 {
 $color: fade-out(desaturate($color, 1%), .02);
 $val: #{$val}, -#{$i}px #{$i}px #{$color};
 }
 @return $val;
}

div {
 text-align: center;
 font-size: 20vmin;
 line-height: 45vh;
 text-shadow: blessing(hsl(0, 100%, 50%));
 color: hsl(14, 100%, 60%);
}
</style>
<div>福</div>
```

![](https://s3.bmp.ovh/imgs/2021/10/d8c04e272d3e7109.png)

##### 3、线性渐变模拟长阴影

- 借用了元素的两个伪元素
- 通过渐变色填充两个伪元素，再通过位移、变换放置在合适的位置

```
<style>
div {
 position: relative;
 width: 30vmin;
 height: 30vmin;
 line-height: 30vh;
 text-align: center;
 font-size: 30px;
 background: #fff;
 margin: 30vmin auto;
}

div::before,
div::after {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: -1;
}

div::before {
 content: ':before';
 font-size: 30px;
 text-align: center;
 line-height: 30vh;
 transform-origin: 0 50%;
 transform: translate(100%, 0) skewY(45deg) scaleX(.6);
 background: linear-gradient(90deg, rgba(0, 0, 0, .3), transparent);
}

div::after {
 content: ':after';
 font-size: 30px;
 text-align: center;
 line-height: 30vh;
 transform-origin: 0 0;
 transform: translate(0%, 100%) skewX(45deg) scaleY(.6);
 background: linear-gradient(180deg, rgba(0, 0, 0, .3), transparent);
}
</style>
<div>Web秀</div>
```

![](https://s3.bmp.ovh/imgs/2021/10/ca90721fe4663ef1.png)

##### 4、渐变实现内切角

- 阴影实现的关键点在于使用伪元素绝对定位在容器的一角，元素本身透明，阴影扩散开形成内切圆角效果
- 阴影实现缺点，单个标签最多只能是2个内切圆角
- 径向渐变实现内切圆角可以是4边

```
<style>
div {
 position: relative;
 width: 20vw;
 height: 8vw;
 margin: 1vw auto;
 border-radius: 1vmin;
 overflow: hidden;
 line-height: 8vw;
 color: #fff;
 text-align: center;
}

.shadow::before {
 position: absolute;
 content: "";
 top: -2vw;
 left: -2vw;
 width: 4vw;
 height: 4vw;
 border-radius: 50%;
 box-shadow: 0 0 0 15vw #e91e63; 
 z-index: -1;
}

.shadow::after {
 position: absolute;
 content: "";
 bottom: -2vw;
 right: -2vw;
 width: 4vw;
 height: 4vw;
 border-radius: 50%;
 box-shadow: 0 0 0 15vw #e91e63; 
 z-index: -1;
}

.linear {
 background-size: 70% 70%;
 background-image: 
 radial-gradient(
 circle at 100% 100%, 
 transparent 1vw, 
 transparent 2vw, 
 #03A9F5 2vw),
 radial-gradient(
 circle at 0 0, 
 transparent 0, 
 transparent 2vw, 
 #03A9F5 2vw),
 radial-gradient(
 circle at 100% 0, 
 transparent 0, 
 transparent 2vw, 
 #03A9F5 2vw),
 radial-gradient(
 circle at 0 100%, 
 transparent 0, 
 transparent 2vw, 
 #03A9F5 2vw);
 background-repeat: no-repeat;
 background-position: 
 right bottom, 
 left top, 
 right top, 
 left bottom;
}
</style>
<div class="shadow">阴影实现缺点最多是2边</div>
<div class="linear">径向渐变内切圆角4边</div>
```

![](https://s3.bmp.ovh/imgs/2021/10/f96a46e2de9e4910.png)