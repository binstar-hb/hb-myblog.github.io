---
title: nuiapp踩坑指南
date: 2022-05-30 10:44:53
tags: nuiapp踩坑指南
categories: uniapp
---

#### 1.主动调用uni.hideKeyboard()收起键盘后点击屏幕任意区域键盘重新抬起的问题。

解决方案:给input的focus绑一个flag(false)，聚焦赋true，失焦赋flase即可解决

#### 2. 日历组件选择时间域时 input显示的时间与点击同步修改，预期为点击完成时才进行值变更

原因: 传递给子组件的时一个数组，由于传入的是一个引用赋值时未进行深拷贝导致此问题出现 解决方案: 对象或者数组传递时需要进行深拷贝 可以使用扩展运算符 ...

#### 3. ios系统 浏览器div可编辑属性 `contenteditable``=``"true" 不生效`

解决方案: 加入css -webkit-user-select:text;

#### 4.对象中用新的字段绑定v-model时输入框修改不变化的问题

data.info.key = '' {} = data.info

解决方案：在赋值给对象前将该字段添加至对象中，如果是赋值后在添加该字段还是无效

#### 5.预加载后从登录页跳转到首页  快速点击其他tabbar 控制台报错 手机无反应

原因：预加载API错误  在成功后 页面并未加载到队列中 解决方案 ： 在预加载成功后 适当延迟 或者看下commonjs中得isPreloadPageOK方法

#### 6.二级页面出现底部tabbar 渲染闪烁

原因: nvue所有组件默认背景色都是透明的 可能出现类似情况 解决方案 ： 在页面最外层容器加上背景色

#### 7.全屏加载页会覆盖顶部导航栏 出现闪烁情况

原因: 不明 解决方案 ：给loading组件加上边框 解决。

#### 8.nvue 在巨力pda上阴影样式异常以及如何设置阴影

原因: Android平台weex对阴影样式(box-shadow)支持不完善
具体官方有说明 https://uniapp.dcloud.io/nvue-css?id=android%e5%b9%b3%e5%8f%b0%ef%bc%9a%e9%98%b4%e5%bd%b1elevation
解决方案 ：使用 elevation

#### 9.首页刷新权限 应用卡死

原因：在鉴权组件中 判断是否显示 使用的是方法 v-if="xxx()" 直接在页面上使用方法在页面重绘就会调用一次 一次数据改变 可能会重绘多次页面
-----------  在以后开发中发 尽可能不在页面上直接调用方法 -------------------
解决方案： 使用computed来进行条件判断

#### 10.数据刷新 页面内容未被撑开

解决方案：给其加上key 在数据改变时 修改key

#### 11.ios下滚动组件list、scroller组件内容过少无法触发下拉刷新

解决方案：加上属性 alwaysScrollableVertical="true" https://uniapp.dcloud.io/use-weex?id=ios平台下拉组件refresh组件注意问题

#### 12.关闭NVUE滚动组件得回弹效果

为其加上属性 :bounce="false" 即可

#### 13.swiper 中得swiper如需做循环滚动 swiper-item key直接给index即可

** **否则 key发生变化 会自动回到第一页

#### 14.NVUE 中view绑定tap事件失效

将view标签改为div标签

#### 15.NVUE 中picker组件无法弹出

为其子标签绑定上tap事件

#### 16.NVUE中 使用 transform: translateY + position: fixed; 制作底部弹出层 样式无法生效

为弹出部分加上背景色问题解决

#### 17.ios使用list可能会出现 熄屏一段时间后不能滚动的问题

可以采用scroller标签代替list

#### 18.ios 点击输入框 键盘会将页面上推 在自定义头部时不希望这种情况出现

在 输入框上 加入属性 :adjust-position="false"

#### 19.ios如需开启下拉刷新 不可关闭滚动组件的回弹效果

应该设置 ** **:bounce="true" 或者不设置 默认为true

#### 20. 安卓下 子节点绑定点击事件且内容为占满scroller的情况下 按住子节点无法下拉问题

使用list组件代替scroller组件 为了兼容ios 可以根据操作系统来选择组件 因为ios端的list可能会出现滚不动的现象 具体操作凡是 参照 evol-lazy-list 组件

#### 21. 编写云上医护日历选择器时 点击遮罩 视图无法检测到变量变化 进行样式更新

解决方案: 在方法中阻止事件冒泡  e.stopPropagation()

#### 22. nvue需要进行页面元素动态切换时 受其渲染速度影响会出现闪烁情况

解决方案: 使用样式控制元素的隐藏 例如 margin-left：-750upx;width:0upx;

#### 23. 递归组件的使用

解决方案: 如果需要进行组件递归 需要在export中写上name属性 否则递归组件会被忽略

#### 24. nvue中text无法撑开父容器

解决方案: 给text加上宽度即可

#### 25. nvue 在ios上要注意节点的加载顺序 先出现的节点无法覆盖后出现的

解决方案: 使用v-if来控制加载的时机

#### 26.在uniapp中使用webview时打开非常慢

 解决方案: 对页面进行预加载 参数通过evaljs进行传递 具体解决方案参考云上医护 病区上报功能  this.$refs.webview.evalJS(setParams('${this.pending}'))

#### 27.nvue预加载页面 在ios上左滑会销毁页面

解决方案: 在onLoad中 使用 以下代码来放防止在iOS上左滑页面被销毁

```js
 if(uni.getSystemInfoSync().platform=='ios'){     plus.webview.currentWebview().setStyle({popGesture:'hide'})

 }
```

#### 28. 解决安卓第一次按住有tap事件的dom 滚动会触发刷新问题

```js
  //在scroller顶部放入节点
  <view ref="dom" />
  //延迟调用
  scrollFixed() { // 解决安卓第一次按住有tap事件的dom 滚动会触发刷新问题
    dom.scrollToElement(this.$refs.dom, { offset: 1 });
  }
```

#### 29.keyboardheightchange获取的键盘高度不对

```js
  // 手机存在虚拟键位获取差值后即可获取正确高度
  keyboardheightchange(e) {
    const _sysInfo = uni.getSystemInfoSync()
　　const _heightDiff = _sysInfo.screenHeight - _sysInfo.windowHeight
　　this.keyHeight = e.detail.height - _heightDiff
  },
```

#### 30. 安卓下 scroller 使用refresh 首次点击到元素会出现抖动

在加载完数据后 进行滚动偏移即可
```js
  setTimeout(()=>{
     dom.scrollToElement(this.$refs.yyRefresh, { offset: 1,animated:false  })
  },40)
```

#### 30. uni.previewImage API 会缓存图片

当两次打开的图片url一致时,就算图片内容发生变化 使用previewImage 看到的图片还是第一次的
解决方案 : 使用uuid算法使图片名随机

#### 30. uniapp云打包失败

错误详情：API fatal error handler returned after process out of memory
原因：node内存溢出
解决：
```js
// 全局安装increase-memory-limit
cnpm install -g increase-memory-limit
// 进入工程目录，执行：
increase-memory-limit
```
