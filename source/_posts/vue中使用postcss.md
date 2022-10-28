---
title: vue中使用postcss
date: 2022-02-22 22:43:05
tags: postcss
categories: vue插件
---

#### 一、vue2.x中使用postcss

##### 安装

```sh
npm i postcss-plugin-px2rem -D
```

##### vue.config.js配置项

```js
module.exports = {
	css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 32, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            // unitPrecision: 5, //允许REM单位增长到的十进制数字。
            //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
            // propBlackList: [], //黑名单
            exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
            // selectorBlackList: [], //要忽略并保留为px的选择器
            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
            // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ],
      },
    },
  },
  devServer: {

  },
  ...
}
```

##### utils文件夹下创建rem.js

```js
// rem等比适配配置文件
// 基准大小
const baseSize = 32
    // 设置 rem 函数
function setRem() {
    // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 320
        // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 3) + 'px'
}
// 初始化
setRem()
    // 改变窗口大小时重新设置 rem
window.onresize = function() {
    setRem()
}
```

##### main.js配置项

```js
import '@/assets/utils/rem.js'
```



#### 二、vue3.x中使用postcss

##### 安装

```sh
npm i postcss-pxtorem -D
```

##### 与package.json同级目录创建postcss.config.js文件

```js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
        "last 10 versions", // 所有主流浏览器最近10版本用
      ],
      grid: true,
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      unitPrecision: 5
    }
  }
}
```

##### 这里只实现了 px转rem，还要安装 amfe-flexible

```sh
npm i amfe-flexible autoprefixer -D
```

##### main.ts配置项

```js
import 'amfe-flexible/index.js'
```

