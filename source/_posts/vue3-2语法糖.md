---
title: vue3.2语法糖
date: 2022-07-20 15:30:54
tags: vue3.2语法糖
categories: vue
---

### vue3.2 版本开始才能使用语法糖！

在 Vue3.0 中变量必须 return 出来， template 中才能使用；而在 Vue3.2 中只需要在 script 标签上加上 setup 属性，无需 return ， template 便可直接使用，非常的香啊！

#### 1、如何使用setup语法糖

只需在 script 标签上写上 setup 代码如下（示例）：

```vue
<template>
</template>
<script setup>
</script>
<style scoped lang="less">
</style>
```

#### 2、data数据的使用

由于 setup 不需写 return ，所以直接声明数据即可 代码如下（示例）：

```vue
<script setup>
  import { ref, reactive, toRefs } from 'vue'

  const data = reactive({
    patternVisible: false,
    debugVisible: false,
    aboutExeVisible: false,
  })

  const content = ref('content')
  //使用toRefs解构
  const { patternVisible, debugVisible, aboutExeVisible } = toRefs(data)
</script>
```

#### 3、method方法的使用

```vue
<template >
  <button @click="onClickHelp">系统帮助</button>
</template>
<script setup>
import {reactive} from 'vue'

const data = reactive({
  aboutExeVisible: false,
})
// 点击帮助
const onClickHelp = () => {
  console.log(`系统帮助`)
  data.aboutExeVisible = true
}
</script>
```

#### 4、watchEffect的使用

```vue
<script setup>
import { ref, watchEffect } from 'vue'

let sum = ref(0)

watchEffect(()=>{
  const x1 = sum.value
  console.log('watchEffect所指定的回调执行了')
})
</script>
```

#### 5、watch的使用

<script setup>
  import { reactive, watch } from 'vue'
  //数据
  let sum = ref(0)
  let msg = ref('你好啊')
  let person = reactive({
    name:'张三',
    age:18,
    job:{
      j1:{
        salary:20
      }
    }
  })
  // 两种监听格式
  watch([sum,msg],(newValue,oldValue)=>{
    console.log('sum或msg变了',newValue,oldValue)
  },{immediate:true})

  watch(()=>person.job,(newValue,oldValue)=>{
    console.log('person的job变化了',newValue,oldValue)
  },{deep:true})
</script>

#### 6、computed计算属性的使用

computed 计算属性有两种写法(简写和考虑读写的完整写法) 代码如下（示例）：

```vue
<script setup>
  import { reactive, computed } from 'vue'
  //数据
  let person = reactive({
    firstName:'小',
    lastName:'叮当'
  })
  // 计算属性简写
  person.fullName = computed(()=>{
    return person.firstName + '-' + person.lastName
  })
  // 完整写法
  person.fullName = computed({
    get(){
      return person.firstName + '-' + person.lastName
    },
    set(value){
      const nameArr = value.split('-')
      person.firstName = nameArr[0]
      person.lastName = nameArr[1]
    }
  })
</script>
```

#### 7 、props父子传值的使用

子组件代码如下（示例）：

```vue
<template>
  <span>{{props.name}}</span>
</template>

<script setup>
  import { defineProps } from 'vue'
  // 声明props
  const props = defineProps({
    name: {
      type: String,
      default: '11'
    }
  })
  // 或者
  //const props = defineProps(['name'])
</script>
```

父组件代码如下（示例）：

```vue
<template>
  <child :name='name'/>
</template>

<script setup>
  import {ref} from 'vue'
  // 引入子组件
  import child from './child.vue'
  let name= ref('小叮当')
</script>
```

#### 8 、emit子父传值的使用

子组件代码如下（示例）：

```vue
<template>
   <a-button @click="isOk">确定</a-button>
</template>

<script setup>
import { defineEmits } from 'vue';

// emit
const emit = defineEmits(['aboutExeVisible'])
/**
 * 方法
 */
// 点击确定按钮
const isOk = () => {
  emit('aboutExeVisible');
}
</script>
```

父组件代码如下（示例）：

```vue
<template>
  <AdoutExe @aboutExeVisible="aboutExeHandleCancel" />
</template>
<script setup>
import {reactive} from 'vue'
// 导入子组件
import AdoutExe from '../components/AdoutExeCom'

const data = reactive({
  aboutExeVisible: false,
})
// content组件ref


// 关于系统隐藏
const aboutExeHandleCancel = () => {
  data.aboutExeVisible = false
}
</script>
```

#### 9、获取子组件ref变量和defineExpose暴露

即 vue2 中的获取子组件的 ref ，直接在父组件中控制子组件方法和变量的方法

子组件

```vue
<template>
  <p>{{data }}</p>
</template>

<script setup>
import { reactive, toRefs } from 'vue'

/**
 * 数据部分
 * */
const data = reactive({
  modelVisible: false,
  historyVisible: false,
  reportVisible: false,
})
defineExpose({
  ...toRefs(data),
})
</script>
```

父组件：

```vue
<template>
  <button @click="onClickSetUp">点击</button>
  <Content ref="content" />
</template>

<script setup>
import {ref} from 'vue'

// content组件ref
const content = ref('content')
// 点击设置
const onClickSetUp = ({ key }) => {
   content.value.modelVisible = true
}
</script>
<style scoped lang="less">
</style>
```

#### 10、路由useRoute和us eRouter的使用

```vue
<script setup>
  import { useRoute, useRouter } from 'vue-router'

  // 声明
  const route = useRoute()
  const router = useRouter()

  // 获取query
  console.log(route.query)
  // 获取params
  console.log(route.params)

  // 路由跳转
  router.push({
    path: `/index`
  })
</script>
```

#### 11、store仓库的使用

```vue
<script setup>
  import { useStore } from 'vuex'
  import { num } from '../store/index'

  const store = useStore(num)

  // 获取Vuex的state
  console.log(store.state.number)
  // 获取Vuex的getters
  console.log(store.state.getNumber)

  // 提交mutations
  store.commit('fnName')

  // 分发actions的方法
  store.dispatch('fnName')
</script>
```

#### 12、await的支持

setup 语法糖中可直接使用 await ，不需要写 async ， setup 会自动变成 async setup

```vue
<script setup>
  import api from '../api/Api'
  const data = await Api.getData()
  console.log(data)
</script>
```

#### 13、provide 和 inject 祖孙传值

```vue
<template>
  <AdoutExe />
</template>

<script setup>
  import { ref, provide } from 'vue'
  import AdoutExe from '@/components/AdoutExeCom'

  let name = ref('Jerry')
  // 使用provide
  provide('provideState', {
    name,
    changeName: () => {
      name.value = '小叮当'
    }
  })
</script>
```

子组件代码如下（示例）：
```vue
<script setup>
  import { inject } from 'vue'
  const provideState = inject('provideState')

  provideState.changeName()
</script>
```