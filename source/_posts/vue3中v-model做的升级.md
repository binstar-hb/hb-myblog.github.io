---
title: vue3中v-model做的升级
date: 2022-07-26 15:45:04
tags: vue3中v-model做的升级
categories：vue
---

- 在自定义组件上使用时，v-model的prop和event默认名称会更改：prop: value => modelValue event: input => update:modelValue
- v-bind的.sync修饰符和组件model选项被删除并替换为v-model
- v-model现在可以在同一个组件上进行多个绑定
- 可以自定义v-model修饰符

#### vue2.x语法

在input中使用

```html
<input v-model='message'>

<!-- would be shorthand for: -->

<input :value='message' @input='message=$event.target.value'>
```

在组件中使用

```vue
<ChildComponent v-model="message" />

<!-- would be shorthand for: -->

<ChildComponent :value="message" @input="message = $event" />
```

如果我们想将 prop 或事件名称更改为不同的名称，我们需要向组件添加一个model选项，如：

```vue
//ParentComponent.vue

<ChildComponent v-model="message" />

//ChildComponent.vue

export default {
  model: {
    prop: 'info',
    event: 'change',
  },
}
```

v-model在这种情况下，就相当于：

```vue
<ChildComponent :info="message" @change="message = $event" />
```

##### v-bind.sync

某些情况下，我们需要实现对组件属性的双向绑定。例如我们在上面这个ChildComponent中，通过某一事件的触发（如点击某一按钮）从而向父组件传达分配新值

```js
this.$emit('update:info', newValue)
```

父组件侦听该事件并更新本地数据

```vue
//ParentComponent.vue
<ChildComponent :info="message" @update:info="message = $event" />
```

简写为以下形式：

```vue
<ChildComponent :info.sync="message" />
```

#### vue3.x语法

在 3.x 版本中，组件上使用 v-model相当于传递了一个 modelValue 属性以及触发一个 update:modelValue 事件

```vue
<ChildComponent v-model="message" />

<!-- would be shorthand for: -->

<ChildComponent
  :modelValue="message"
  @update:modelValue="message = $event"
/>
```

如果要改变绑定的属性名，我们可以将参数传递给v-model

```vue
<ChildComponent v-model:info="message" />

<!-- would be shorthand for: -->

<ChildComponent :info="message" @update:info="message = $event" />
```

如果我们想在子组件中用input绑定传递过来的数据，并做实时修改那该怎么操作呢？
首先我们不能直接绑定传递过来数据，哪怕绑定了也无法做到实时修改，父组件传递了那就是传递了你如何都影响不到我当前组件的实际数据。而且一般在项目中我们都不会直接对props数据进行绑定修改。我们可以利用个中间值数据去操作，如：

```vue
<input v-model='dataDetail'>
export default {
  computed: {
    dataDetail: {
      set(value) {
        this.$emit('update:modelValue',value)
      },
      get() {
        return this.modelValue
      }
    }
  },
}
```

另外，它可以进行多个绑定：

```vue
<ChildComponent v-model:info="message" v-model:content="cons" />
<!-- 相当于 -->
<ChildComponent
    :info="message"
    @update:info="message = $event"
    :content="cons"
    @update:content="cons = $event"
/>
```