---
title: vue基础
date: 2021-10-08 22:26:02
tags: vue基础
categories: vue
---

##### Setter

```js
var vm = new Vue({
 el: '#el',
 data: {
  num: 100,
 }
 computed: {
  price: {
   set: function(newValue){
    this.num = newValue * 100;
   },
   get: function() {
    return (this.num/100).toFixed(2);
   }
  }
 }
});
```

##### 绑定value

表单控件的值可以绑定在vue实例的动态属性上

```html
<input type="checkbox" v-model="checked" v-bind:true-value="a" v-bind:false-value="b">

// 选中：vm.checked==vm.a

// 未选中：vm.hchecked==vm.b
```

##### 内联样式绑定

```html
<div v-bind:style="dada"></div>

data: {
 dada: {
  color: 'green',
  fontSize: '10px'
 }
}
```

数组语法：v-bind:style允许将多个样式对象绑定到统一元素上。

```html
<div v-bind:style="[ styleObjectA, styleObjectB ]"></div>
```

##### 列表渲染

v-for 内置了 $index 变量，输出当前数组元素的索引，也可以自己指定索引的别名。

```html
<li v-for="(index,item) in items">{{index}} – {{$index}} – {{item.title}}</li>
```

在vue.js中提供了$set方法，修改数据的同时进行试图更新。

```js
this.$set('item[0]', {title: 'da'})

this.$set( target, key, value )
```

##### 内置指令

```js
v-pre指令，表示跳过编译这个元素和子元素，显示原始的{{}}Mustache标签，用来减少编译时间
```

##### v-for 中使用 key

​		使用 v-for 更新已渲染的元素列表时，默认用就地复用策略；列表数据修改的时候，他会根据 key 值去判断某个值是否修改，如果修改，则重新渲染这一项，否则复用之前的元素；

​		使用key的注意事项：

- 不要使用可能重复的或者可能变化 key 值（控制台也会给出提醒）
- 不要使用数组的 index 作为 key 值，因为如果在数组中插入一个元素时，其后面的元素 index 将会变化。
- 如果数组中没有唯一的 key 值可用，可以考虑对其添加一个 key 字段，值为 Symbol() 即可保证唯一。

##### v-if/v-else-if/v-else 中使用 key

> 可能很多人都会忽略这个点

​		原因：默认情况下，Vue 会尽可能高效的更新 DOM。这意味着其在相同类型的元素之间切换时，会修补已存在的元素，而不是将旧的元素移除然后在同一位置添加一个新元素。如果本不相同的元素被识别为相同，则会出现意料之外的副作用。

> 如果只有一个 v-if ，没有 v-else 或者 v-if-else的话，就没有必要加 key 了

​		相对于 v-for 的 key， v-if/v-else-if/v-else 中的 key 相对简单，我们可以直接写入固定的字符串或者数组即可

```html
  <transition>
    <button
      v-if="isEditing"
      v-on:click="isEditing = false"
    >
      Save
    </button>
    <button
      v-else
      v-on:click="isEditing = true"
    >
      Edit
    </button>
  </transition>
```

```css
.v-enter-active, .v-leave-active {
  transition: all 1s;
}
.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.v-leave-active {
  position: absolute;
}
```

​		例如对于上面的代码， 你会发现虽然对 button 添加了 过渡效果， 但是如果不添加 key 切换时是无法触发过渡的

##### v-for 和 v-if 不要一起使用

> 此优化技巧仅限于Vue2，Vue3 中对 v-for 和 v-if 的优先级做了调整
>
> **永远不要把 v-if 和 v-for 同时用在同一个元素上。**

​		原因是 v-for 的 优先级高于 v-if，所以当它们使用再同一个标签上时，每一个渲染都会先循环再进行条件判断

```html
<ul>
  <li v-for="user in users" v-if="user.active">
    {{ user.name }}
  </li>
</ul>
```

​		我们应该尽量将 v-if 移动到上级 或者 使用 计算属性来处理数据

```html
<ul v-if="active">
  <li v-for="user in users">
    {{ user.name }}
  </li>
</ul>
```

​		如果你不想让循环的内容多出一个无需有的上级容器，那么你可以选择使用 template 来作为其父元素，template 不会被浏览器渲染为 DOM 节点

​		如果我想要判断遍历对象里面每一项的内容来选择渲染的数据的话，可以使用 computed 来对遍历对象进行过滤

```vue
// js
let usersActive = computed(()=>users.filter(user => user.active))

// template
<ul>
    <li v-for="user in usersActive">
      {{ user.name }}
    </li>
</ul>
```

##### 使用简单的 计算属性

​		computed 大家后很熟悉， 它会在其表达式中依赖的响应式数据发送变化时重新计算。如果我们在一个计算属性中书写了比较复杂的表达式，那么其依赖的响应式数据也任意变得更多。当其中任何一个依赖项变化时整个表达式都需要重新计算

```js
let price = computed(()=>{
  let basePrice = manufactureCost / (1 - profitMargin)
  return (
      basePrice -
      basePrice * (discountPercent || 0)
  )
})
```

​		当 manufactureCost、profitMargin、discountPercent 中任何一个变化时都会重新计算整个 price。

```js
let basePrice = computed(() => manufactureCost / (1 - profitMargin))
let discount = computed(() => basePrice * (discountPercent || 0))
let finalPrice = computed(() => basePrice - discount)
```

​		如果当 discountPercent 变化时，只会 重新计算 discount 和 finalPrice，由于 computed 的缓存特性，不会重新计算 basePrice

##### functional 函数式组件**（Vue2）**

优化前

```vue
<template>
    <div class="cell">
        <div v-if="value" class="on"></div>
        <section v-else class="off"></section>
    </div>
</template>

<script>
export default {
    props: ['value'],
}
</script>
```

优化后

```vue
<template functional>
    <div class="cell">
        <div v-if="props.value" class="on"></div>
        <section v-else class="off"></section>
    </div>
</template>

<script>
export default {
    props: ['value'],
}
</script>
```

- 没有this（没有实例）
- 没有响应式数据


