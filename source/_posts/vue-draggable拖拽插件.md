---
title: vue.draggable拖拽插件
date: 2022-02-14 17:49:27
tags: vue.draggable拖拽插件
categories: vue插件
---

vue.draggable.next是一款Vue3支持拖放的插件，并且拖放完后会与数据自动同步

```js
// github官方地址
https://github.com/SortableJS/vue.draggable.next
```

![image.png](https://p3.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/f86f8f0e932843aaa080b03312c23186?from=pc)

#### 特点

- 基于 Sortable.js 封装
- 完全支持PC端和移动端
- 支持不同列表之间的拖放
- 没有 jQuery 依赖
- 列表变化和数据同步
- 兼容 Vue.js 3.0
- 支持取消动作
- 各种监听事件提供

#### 安装

```
npm i -S vuedraggable@next
```

#### 使用

```vue
// v-model是一个数组
// item就是数组的其中一项
// item-key唯一性，一般为子项其中的一个唯一属性
// @start开始拖动事件
// @end结束拖动事件
<draggable
  v-model="myArray"
  @start="drag=true"
  @end="drag=false"
  item-key="id">
  <template #item="{element}">
    <div>{{element.name}}</div>
   </template>
</draggable>
```

```vue
<draggable
  element="div"
  :list="list"
  v-bind="{group:'title', animation:150}"
  :no-transition-on-drag="true"
>
  <transition-group type="transition" :css="true">
    <p class="list" v-for="item in list" :key="item.id">{{item.name}}</p>
  </transition-group>
</draggable>
```

```vue
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  data() {
    return {
      myArray:[
        {
          "id":1,
          "name:"张三"
        },
        {
          "id":2,
          "name:"李四"
        },
        {
          "id":3,
          "name:"王五"
        }
      ]
      drag: false,
    }
  },
}
```

如果你想要动画效果的话，加上一个tag属性，值为transition-group，component-data为过渡的名字

```vue
<draggable
    v-model="myArray"
    tag="transition-group"
    :component-data="{ name: 'fade' }"
    item-key="id"
  >
  <template #item="{ element }">
     <div>{{ element.name }}</div>
	</template>
</draggable>
```