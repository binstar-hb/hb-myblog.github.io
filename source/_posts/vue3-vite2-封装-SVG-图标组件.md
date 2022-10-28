---
title: vue3 vite2 封装 SVG 图标组件
date: 2022-10-13 15:49:48
tags: vue3 vite2 封装 SVG 图标组件
---

在真实的企业级开发中，Element Plus 内置的图标通常很难满足业务需求，项目中需要引入大量的 SVG 图标资源，本文描述如何在 Vue3 + Vite2 环境中使用 SVG 图标，封装一个支持本地 SVG 图标和在线 SVG 图标的组件 svg-icon。

#### 1 创建组件

在 src/components/ 目录下创建目录 svg-icon，该在目录中创建 svg-icon 组件 index.vue。

##### 1.1 输入属性

该组件需要两个输入属性（props）：

- icon：SVG 图标的名称或在线 URL
- className：动态传递给该组件的样式类名

代码如下：
```js
const props = defineProps({
  // SVG 图标名称或在线URL
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})
```

##### 1.2 SVG 图标样式

在 style 中定义 svg-icon 的样式类：

```css
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
```

#### 2 在线 SVG 图标

svg-icon 组件需要支持在线 SVG 图标和本地 SVG 图标。首先实现在线 SVG 图标的显示。如下 URL 为一个在线 SVG 图标，可在浏览器中直接访问：

```js
http://www.yygnb.com/demo/car.svg
```

##### 2.1 判断在线图标

const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon))

##### 2.2 模板和样式

在线 SVG 图标通过 HTML 元素 div 来显示，css3 有个 mask 属性，该属性表示遮罩，可以部分或者完全隐藏一个元素的可见区域，使用方式与 background 很类似。

template 如下：

```html
<div v-if="isOnlineSvg"
     :style="{ '--svg-icon-url': `url(${icon})` }"
     class="svg-icon svg-icon-online"
     :class="className"/>
```

style 追加 svg-icon-online 样式类：

```css
.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
```

1. 首先在模板中通过 style 属性定义了一个变量 --svg-icon-url，该变量的值为 props 中的 icon 属性。
2. 在 scss 中设置 mask-image 时，使用 var 函数获取变量 --svg-icon-url 的值。

##### 3.3 测试在线图标

```js
import SvgIcon from '@/components/svg-icon/index.vue'
```

```html
<div>
  <svg-icon class-name="icon" icon="http://www.yygnb.com/demo/car.svg"></svg-icon>
</div>
```

添加自定义样式：

```css
.icon {
  color: cornflowerblue;
  font-size: 30px;
}
```

在浏览器中访问 about 页面，可以看到在线 SVG 图标可以成功显示：

![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/be71e6a76eb445d0a2a825b46a46759b~noop.image?_iz=58558&from=article.pc_detail&x-expires=1666252043&x-signature=9k%2BU7vqVunMpcKWXFI8frCa6K3Y%3D)

#### 3 本地 SVG 图标

在 webpack 中加载 svg 资源可以使用 svg-sprite-loader，而 vite 中可以使用插件 vite-plugin-svg-icons。

##### 3.1 安装开发依赖

```shell
yarn add vite-plugin-svg-icons -D
```

##### 3.2 配置 vite

在 vite.config.ts 中配置该插件：

```js
...
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
...

export default defineConfig({
	...
  plugins: [
    ...
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [path.resolve(__dirname, 'src/svg')],
      // 执行 icon name 的格式
      symbolId: 'icon-[name]'
    })
  ],
  ...
}
```

通过 createSvgIconsPlugin() 入参指定了svg 文件所在的目录和 symbolId。

##### 3.3 修改 main.ts

在 main.ts 中添加如下语句：

```js
import 'virtual:svg-icons-register'
```

##### 3.4 完成 svg-icon 组件

通过上述步骤，便完成了 vite-plugin-svg-icons 的配置，接下来实现 svg-icon 组件即可。前面已经完成了在线 svg、样式等，现在只需要在 template 中补充本地 svg 的代码即可：

```html
<svg v-else
     class="svg-icon"
     :class="className"
     aria-hidden="true">
  <use :xlink:href="`#icon-${icon}`"/>
</svg>
```

组件
components/svg-icon/index.vue 完整代码如下：

```vue
<template>
  <div v-if="isOnlineSvg"
       :style="{ '--svg-icon-url': `url(${icon})` }"
       class="svg-icon svg-icon-online"
       :class="className"/>
  <svg v-else
       class="svg-icon"
       :class="className"
       aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`"/>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  // SVG 图标名称或在线URL
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon))
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}

.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>
```

##### 3.5 测试本地图标

由于 vite.config.ts 中配置的 svg 目录为 src/svg，首先将 car.svg 拷贝到该目录下。继续在 about.vue 中添加如下代码：

```html
<div>
  <svg-icon icon="http://www.yygnb.com/demo/car.svg"></svg-icon>
  <svg-icon icon="car"></svg-icon>

  <svg-icon class-name="icon" icon="http://www.yygnb.com/demo/car.svg"></svg-icon>
  <svg-icon class-name="icon" icon="car"></svg-icon>
</div>
```

上面的代码分别显示在线图标和本地图标，页面显示结果如下：

![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/32f8c930855f44209589826ecb3a89be~noop.image?_iz=58558&from=article.pc_detail&x-expires=1666252043&x-signature=GOzCy6YrXmSbkDCVhxN8dXoAB24%3D)

