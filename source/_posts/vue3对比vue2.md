---
title: vue3对比vue2
date: 2021-11-02 16:55:26
tags: vue3对比vue2
categories: vue
---

##### 使用vue-cli4.0创建项目

先把脚手架升级到最新版本，之前没有安装的话，直接全局安装就是最新版4.0

**安装**vue-cli npm install -g @vue/cli

**更新**vue-cli npm update -g @vue/cli

**创建项目：**

vue create vue3-demo

cd vue3-demo

yarn serve

**升级vue2项目**

yarn add vue-next

##### 创建vue3项目-vite方式

npm init vite-app <project-name>

cd <project-name>

yarn

yarn dev



**vite**是一个基于vue3单文件组件的非打包开发服务器，它做到了本地快速开发启动

- 快速的冷启动，不需要等待打包操作
- 即时的热模块更新，替换性能和模块数量的解耦让更新飞起
- 真正的按需编译，不再等待整个应用编译完成，这是一个巨大的改变

##### 生命周期的变化

| vue2.x          | vue3.x            |
| --------------- | ----------------- |
| beforeCreate    | 移除(setup)       |
| created         | 移除(setup)       |
| beforeMount     | onBeforeMount     |
| mounted         | onMounted         |
| beforeUpdate    | onBeforeUpdate    |
| updated         | onUpdated         |
| beforeUnmounte  | onBeforeUnmounte  |
| unmounted       | onUnmounted       |
| errorCaptured   | onErrorCaptured   |
| renderTracked   | onRenderTracked   |
| renderTriggered | onRenderTriggered |

```javascript
impor { onMounted } from 'vue';
export default {
	setup(){
		onMounted(() => {
			console.log('component is mounted')
		})
	}
}
```

##### main.js中变化 新增全局API: createApp()

vue2.x中采用的是new Vue()，vue3.x中使用如下方式创建应用实例

```javascript
import { createApp } from 'vue';
const app = createApp({});
```

##### router.js

vue3.x需要引入createRouter创建地址路由。createWebHashHistory对应之前的hash,createWebHistory对应之前的history。

```javascript
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
	{
		name: 'homepage',
		path: '/homepage',
		component: () => import('../views/homepage/index.vue')
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router;
```

##### vuex

vue3.x中状态管理的创建方式变为了createStore，代码结构更精简合理。

```javascript
import { createStore } from 'vuex';

export default createStore({
	state: {
	
	},
	getters: {
	
	},
	mutations: {
	
	},
	actions: {
	
	}
})
```

##### 应用配置

```javascript
Vue.config					->	app.config

Vue.config.ignoredElements	->	app.config.ignoredElements	

Vue.component				->	app.component	

Vue.directive				->	app.directive	

Vue.mixin					->	app.mixin	

Vue.use						->	app.use	
```

config: 包含Vue应用程序全局配置的对象，在挂载应用之前配置相应的属性。

```javascript
const app = Vue.createApp({});
app.config = {...}
```

1. devtools（类型：Boolean，默认：false），配置是否开启vue-devtools检查，一般在开发环境是true，生产环境为false。<br>app.config.devtools = true

2. errorHandler（类型：function，参数err：错误内容，vm：对应的实例，info：Vue特定的错误信息，如某个生命周期中出现的错误）<br>app.config.errorHandler = (err, vm, info) => {}

3. warnHandler（类型：function，参数msg：警告内容，vm：对应的实例，trace：组件的层次追踪）<br>app.config.warnHandler = (msg, vm, trace) => {};

4. globalProperties (类型: any)用于添加到应用程序中任何组件都能使用的全局属性，当与组件内部的属性冲突时，将优先使用组件内部的属性值。可代替Vue2中的Vue .prototype.

   ```javascript
   // Vue2.x
   Vue.prototype.name = 'zhang_san'
   // Vue3.x
   app.config.globalProperties.name = 'zhang_san'
   app.component('child-component', {
   	mounted(){
   		console.log(this.name)
   	}
   })
   ```

5. isCustomElement (类型: (tag: string) => boolean)，用于来识别Vue之外的自定义元素(如，三方web组件api) ，如果组件或元素符合这个条件，则组件不会被实例化，Vue也不会对组件或元素发出警告信息。<br>app.config.isCustomElement = tag => tag.startsWith('ion');

##### 挂载应用程序

```javascript
import { createApp } from 'vue';
import App from './App.vue'; 
const app = createApp(App);
app.mount( #app'); 
```

##### 注册全局组件

```javascript
import { createApp } from 'vue';
const app = createApp({});
// myComponent为组件实例
app.component('my-component, myComponent);
//重置组件
const MyComponent = app.component('my-component', {});
```

##### 新增全局注入/提取：provide/inject (父组件数据注入与子孙组件数据获取)

参数: Object | () => Object.

概述: provide一般与inject一起使用，provide为当前实例的所有子孙组件注入数据，inject在当前实例的子孙组件中获取注入的数据。

用例：

```javascript
import { createApp } from 'vue' ;
//全局注入数据
const app = createApp({
	procide: {
		user: 'zhang_san'
	}
});
// 获取数据
app.component(‘my-component', {
	inject: [ 'user'],
	data() {...}
});
```

##### 全局方法

```javascript
// Vue2.x
import Vue from 'vue';
Vue.nextTick(()=>{ ... })
// 或者
export default {
	...
	this.$nextTick(()=>{ ... })
	...
}

// Vue3.x
import { nextTick } from 'vue';
export default {
	...
	nextTick(()=>{ ... })
	...
}
```

##### 自定义指令：directive

Vue3.x中对自定义指令的创建提供了更加细致的API（类似于组件的生命周期）

1. bind							->	beforeMount（挂载前）
2. inserted						->	mounted（挂载后）
3. ​										->	beforeUpdate（新增，更新前）
4. update							->	删除
5. componentUpdate		->	update（更新后）
6. ​										->	beforeUnmounted（新增，卸载前）
7. unbind							->	unmounted（卸载后）

##### 跨组件通讯

vue2.x eventBus

Vue3.x 中全局事件总成将使用mitt来实现跨组件通讯。

使用**mitt**之前先安装mitt模块**npm install --save mitt**

```javascript
import mitt from 'mitt'
const VueEvent = mitt()

export default VueEvent;
```



```javascript
<template>
	<div>
		<button @click="doLogin">父子组件传值</button>
	</div>
</template>

<script>
import VueEvent from '../model/event'

export default {
	data(){
		return {}
	},
	methods:{
		doLogin(){
			VueEvent.emit('login')
		}
	}
}
</script>
```

```javascript
<template>
用户登录组件
</template>

<script>
import VueEvent from '../model/event'
export default {
	mounted(){
		VueEvent.on('login',() => {
			alert('doLogin')
		})
	}
}
</script>
```

##### Vue3.x组件自定义事件验证

父组件

```javascript
<template>
	<div>
		<login @submit="getChild"></login>
	</div>
</template>

<script>
import Login from "./Login"
export default {
	data(){
		return {
			title: 'hello vue'
		}
	},
	components:{
		Login
	},
	methods:{
		getChild(data){
			alert(data)
		}
	}
}
</script>
```

子组件

```javascript
<template>
	<input type="text" v-model="username" />
	<br>
	<input type="text" v-model="password" />
	<br>

	<button @click="run">通过广播方式实现子组件给父组件传值</button>
</template>

<script>
export default {
	// 建议定义所有发出的事件，以便更好地记录组件应该如何工作
	emits: {
		submit :({
			username,
			password
		}) => {
			if (username && password) {
				return true
			} else {
				console.warn("传入的参数不能为空")
				return false
			}
		}
	}
	data(){
		return {
			username: '张三',
			password: ''
		}
	},
	methods:{
		run(){
			this.$emit('submit',{
				username: this.username,
				password: this.password
			})
		}
	}
}
</script>
```

##### Vue3.x过滤器

在3.x中，过滤器被删除，不再受支持。建议用方法调用或计算属性替换它们。

```javascript
<template>
  <div>
    <h1>Bank Account Balance</h1>
    <p>{{ accountBalance | currencyUSD }}</p>
  </div>
</template>

<script>
export default {
  props: {
    accountBalance: {
      type: Number,
      require: true
    }
  },
  filters: {
    currencyUSD(value) {
      return '$' + value
    }
  }
}
</script>
```

```javascript
<template>
  <div>
    <h1>Bank Account Balance</h1>
    <p>{{ currencyUSD }}</p>
  </div>
</template>

<script>
export default {
  props: {
    accountBalance: {
      type: Number,
      require: true
    }
  },
  computed: {
    currencyUSD() {
      return '$' + this.accountBalance
    }
  }
}
</script>
```

##### 多根节点组件

Vue2.x

```javascript
<template>
  <div>
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</template>
```

Vue3.x中可以使用多个根节点

```javascript
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

##### 按键修饰符

Vue2.x

```javascript
<input v-on:keyup.13="submit">
<input v-on:keyup.enter="submit">
Vue.config.keyCode= { f1: 112 }
```

Vue3.x 别名支持任意键

```javascript
<input v-on:keyup.delete="cancel">
<input v-on:keyup.f1="cancel">
```

##### 渲染功能render函数

Vue2.x

```javascript
export default {
  render(h){
    return h('div')
  }
}
```

Vue3.x

```javascript
import { h } from 'vue'
export default {
  render(){
    return h('div', {class: 'red'}, 'hello, Vue3.x!')
  }
}
```

##### Vue3更好用的v-model指令

1、概述：数据双向绑定

2、回顾：在Vue2.x中，v-model进行数据双向绑定（语法糖）的原理

```javascript
<my-component v-model="msg"></my-components>
<!-- 等价于 -->
<my-component :value="msg" @input="msg=$event"></my-components>

// 组件中接收绑定数据和触发数据改变
props:{ msg: String } // 获取数据
this.$emit('input', 'newValue') // 触发事件并传值
```

用于自定义组件时，v-model的prop和事件默认名称已更改：

prop: value -> modelValue

event: input -> update:modelValue

即

```javascript
<xxComponent v-model="varA" />
```

等价于

```javascript
<xxComponent :modelValue="varA" @update:modelValue="varA = $event" />
```

且在Vue2.x中不能绑定多个v-model

3、用例：Vue3.x重写了v-model的实现方式以适用绑定多个v-model

①：单个数据实现数据双向绑定

```javascript
<my-component v-model="msg"></my-components>
<!-- 等价于 -->
<myComponent :modelValue="msg" @update:modelValue="msg = $event" />

// 组件中接收绑定数据和触发数据改变
props:{ modelValue: String } // 获取数据
setup(props, {emit}){
  emit('update:modelValue', 'newValue') // 触发事件并传值
}
```

②：多个数据实现数据双向绑定

```javascript
<my-component v-model:msg="msg" v-model:name="name"></my-components>
<!-- 等价于 -->
<myComponent :msg="msg" @update:msg="msg = $event" :name="name" @update:name="name = $event"/>

// 组件中接收绑定数据和触发数据改变
props:{ msg: String, name: String } // 获取数据
setup(props, {emit}){
  emit('update:msg', 'newValue') // 触发事件并传值
  emit('update:name', 'newValue') // 触发事件并传值
}
```

###### 修饰符

支持vue2.x的所有修饰符

- .lazy 取代input监听change事件
- .number 输入字符串转为有效的数字
- .trim 输入首尾空格过滤

###### 支持自定义修饰符

例子：自定义prop名+自定义修饰符

**父组件：**

```
<zi v-model:content.camelCase="word" />
```

子组件较复杂，用组合式API来演示。

defineProps函数的写法就是这样，先写content，然后写contentModifiers，这是Vue的规定，必须是prop名跟Modefiers字串。contentModifiers必须是这样一个函数。

useContext和getCurrentInstance在开发中会经常用到。useContext()能拿到几个变量，包括props变量。getCurrentInstance()能拿到组件实例this，用来执行.emit()

content必须是计算变量，否则传入prop新值之后，子组件无法感知

emitCamelCase方法里，if语句是为了确认修饰符正确

```javascript
<template>
  <div>
    <input type="text" :value="content" @input="emitCamelCase">
  </div>
</template>

<script setup>
import { useContext, getCurrentInstance, defineProps, computed } from 'vue'
defineProps({
  content: String,
  contentModifiers: {
    default: () => ({})
  }
})
const ctx = useContext()
const instance = getCurrentInstance()
let content = computed(() => { ctx.props.content })
function emitCamelCase(e){
  if (ctx.props.contentModifiers.camelCase) {
    instance.emit("update:content", e.target.value.replace(/_./g, (a) => {
      return a[1].toUpperCase()
    }))
  }
}
</script>
```

##### vue3 v-is指令

```javascript
// vue的动态组件中使用is
<component is="foo"></component>
// vue2.x --> is的值指的是要渲染的组件的名称；渲染foo组件 
// vue3.x --> is的值指的是要渲染的组件的名称；渲染foo组件 

// 一般组件中使用is
<user-edit is="foo"></user-edit>
// vue2.x --> is的值指的是要江染的组件的名称;渲染foo组件
// vue3.x --> 渲染user- edit组件; is将作为组件的prop进行值的传递

// 一般元素中使用is
<tr is="val"></tr>
// vue2.x ---> is的值会被编译为boolean; 且元素会被动态加载或销毁(会触发transition效果)
// vue3.x ---> is的值为any; 值的变化不会造成元素任何变化(丢失了vue2中元素上使用的s的功能，因此vue3中引入了新的指令v-is)

// vue3.x的新指令 v-is
<tr v-is="val"></tr>
// 与vue2. x中-般元素上使用is的效果-致
```

##### v-for中使用ref

```javascript
// vue2.x 
<p v-for=”item in renderData" :key="item.name" ref=”nodes">{{item.name}}</p>
console.log(this.$refs.nodes) // 返回所有循环的p元素节点
```

```javascript
// vue3.x
//如果还是按照Vue2.x的方式
<p v-for="item in renderData" :key= "item.name" ref="nodes"></p>

console.log(this.$refs.nodes) //此时只能得到循环后最后一个P元素节点

// Vue3.x中，使用函数处理v-for中的ref;且用变量单独存储。
<p v-for="item in renderData" :key=" item.name" ref="handleNodes"></p>

setup(){
  const data = reactive({
    nodes: []
  })
  const handleNodes = nodeItem => {
    data.nodes.push(nodeItem)
  }
  return {
    ...toRefs(data)
  }
}
```

##### mixin 的合并行为更改

```javascript
// mixin
export default {
  data(){
    return {
      name: 'zhangsan',
      age: 20
    }
  }
}

// vue2.x
export default {
  data(){
    return {
      age: 30
    }
  },
  mounted(){
    console.log(this.$data); // {name: 'zhangsan', age: 30}
    console.log(this.name); // 'zhangsan
    console.log(this.age); // 30
  }
}

// vue3.x
export default {
  data(){
    return {
      age: 30
    }
  },
  mounted(){
    console.log(this.$data); // {age: 30}
    console.log(this.name); // 'zhangsan
    console.log(this.age); // 30
  }
}
```

**得出结论：**

1、与vue2.x一样会覆盖掉mixin中相同的响应属性。

2、vue3.x中当前实例的$data是不会包含mixin中定义的响应属性

##### v-if和v-for优先级

当v-if和v-for同时作用于一个元素上时：

Vue2.x中v-for的优先级会高于v-if;

Vue3.x中v-if的优先级会高于v-for;

使用禁忌: Vue3.x中不能将v -for和v-if放在同-个元素上。只能使用v-for嵌套v -if使用

使用建议:官方建议使用计算属性来处理,即提高性能，又能兼容Vue3.x。

##### $attrs和$listener的融合

我们知道，在vue2中我们使用v-bind="$attrs", v-on="$listenner"来将数据和事件做一个承 上启下的作用,但是在vue3中,首先是删除了v-on指令，其次是发现这两个组件的属性过于累赘，所以在当前版本中将$attrs 和$listenner他们的功能进行了融合, $listenner 现在已作为$attrs 的其中一部分进行传递,所以只需要在组建上指定v-bind="$attrs"，那么将同时拥有传值和传递事件的功能。

##### setup说明

- setup

setup有两个参数props和context

- props：接收父组件传的值

- context：vue3.x里面没有this，提供了一个context上下文属性，你可以通过这个属性去获取进行一些vue2.x用this实现的操作

  ```javascript
  export default {
    name: '',
    props: {
      title: {
        type: String,
        default: ""
      }
    },
    setup(props, context){
      console.log(props.title);
      
      context.attrs
      context.slots
      context.parent
      context.root
      context.emit
      context.refs
    }
  }
  ```

在setup中定义的变量或方法，都必须通过**return** {xxx,xxx} 暴露出去，外界才能使用

**注意：**props为响应式代理，如果使用es6的数据解构操作，将使得结构后的数据失去响应式（即不能实时获取到父组件传来的值）

**扩展：**父组件通过属性传的值在子组件中的各个部分的获取：

1. props：通过父传子的方式直接获取到值
2. setup(props, context){}方法中的props只能拿到选项props中已经定义的属性
3. setup(props, {attrs, emit, slots}){}方法中的attrs只能拿到未在选项props中定义的属性
4. 通过{proxy} = getCurrentInstance(); proxy.attrs; 组件实例中的attrs也只能拿到未在选项props中定义的属性

**context：**非响应式的对象，包含了组件暴露的三个property

1. context.attrs：传入组件中但是未被props接收的对象
2. context.emit：用于触发当前组件实例上的传值事件
3. context.slots：用来访问被插槽分发的内容（一般用于使用渲染函数来书写一个组件时）

**return()**：若需要在当前组件视图中或其它组件中使用当前组件创建的响应式变量及方法，则需要导出相应的响应式变量及方法

```javascript
<template>
  <p>{{name}}</p>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props, context){
    const name = ref("zhang_san")
    return { name }
  }
}
</script>
```

return 也有渲染功能

```javascript
<script>
import { ref, h } from 'vue'
export default {
  setup(props, context){
    return () => h('div', {class: 'red'}, '内容');
    // <template><div class="red">内容</div></template>
  }
}
</script>
```

##### 响应式数据对象 reactive

1、概述：函数，创建一个响应式数据对象，响应式会影响到所有的子集嵌套

2、用例：由vue提供，按需引入：import { reactive } from 'vue'

```javascript
<template>
  <p>{{user.name}}</p>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup(props, context){
    const user = reactive({ name: 'lisi', age: 20})
    return { user }
  }
}
</script>
```

##### 延伸方法--readonly只读对象

**readonly()**

1、概述：创建一个只读代理且原对象的任何嵌套属性也将是只读的

2、用例：由vue提供，按需引入：import { readonly } from 'vue'

3、对普通变量创建只读

```javascript
<script>
import { readonly } from 'vue'
export default {
  setup(props, context){
    const user = { name: 'lisi', age: 20}
    const copy = readonly(user)
    return { copy }
  }
}
</script>

copy.age++ // warning! target is readonly
```

4、对reactive创建只读

```js
<script>
import { reactive, readonly } from 'vue'
export default {
  setup(props, context){
    const user = reactive({ name: 'lisi', age: 20})
    const copy = readonly(user)
    return { copy }
  }
}
</script>

user.age++	21
copy.age++ // warning! target is readonly
```

##### 延伸方法--isProxy()

1、概述判断对象是否由reactive创建或者是readonly创建的代理

2、用例：由vue提供，按需引入：import { isproxy } from 'vue'

```js
import {ref, reactive, readonly, isproxy} from 'vue'

//ref创建
const refVal = ref(123)
isProxy(refVal) // false

//reactive创建
const reactiveVal = reactive({age: 20})
isProxy(reactiveVal) // true

//reactive创建
const readonlyVal = readonly(reactiveVal)
isProxy(readonlyVal) // true

//普通变量
const defaultVal = 'default'
isProxy(defaultVal) // false
```

##### isReactive()

1、检查对象是否由reactive创建

2、用例：由vue提供，按需引入：import { isReactive } from 'vue'

```js
import { reactive, isReactive } from 'vue'
export default {
  setup(props, context){
    const user = reactive({ name: 'lisi', age: 20})
    console.log(isReactive(user)); // true
  }
}
```

还能判断readonly代理的对象是否由reactive创建

```js
import { reactive, isReactive, readonly } from 'vue'
export default {
  setup(props, context){
    const user = reactive({ name: 'lisi', age: 20})

    // 创建普通只读代理
    const plain = readonly({name: 'lisi'})
    console.log(isReactive(plain)); // false

    // 创建reactive制度代理
    const copy = readonly(user)
    console.log(isReactive(copy)); // true
  }
}
```

##### 延伸方法-- isReadonly()

1、概述：检查代理是否由readonly创建

2、用例：由vue提供，按需引入：import { isReadonly } from 'vue'

```js
import { reactive, readonly, isReadonly } from 'vue'
export default {
  setup(props, context){
    const user = reactive({ name: 'lisi', age: 20})
    const copy = readonly(user)
    console.log(isReadonly(copy)); // true
  }
}
```

##### 延伸方法--toRaw()

1、概述：返回由reactive或者是readonly代理的原始对象

2、用例：由vue提供，按需引入：import { toRaw } from 'vue'

```js
import { reactive, readonly, isProxy, toRaw } from 'vue'
export default {
  setup(props, context){
    const user = {}
    const reactiveUser = reactive(user)
    const readonlyUser = readonly(readonlyUser)

    console.log(toRaw(reactiveUser) === user); // true
    console.log(toRaw(readonlyUser) === user); // true
    console.log(isProxy(toRaw(reactiveUser))); // false
    console.log(isProxy(toRaw(readonlyUser))); // false
  }
}
```

##### 延伸方法--markRaw()

1、概述：标记一个对象，被标记后，该对象永远不会被转换为代理

2、用例：由vue提供，按需引入：import { markRaw } from 'vue'

```js
import { markRaw, reactive, isReactive, isProxy } from 'vue'
export default {
  setup(props, context){
    const user = markRaw({})
    const reactiveUser = reactive(user)
    console.log(isReactive(reactiveUser)); // false

    const reactiveUser1 = reactive({ user })
    console.log(isProxy(toRaw(reactiveUser1))); // true
    console.log(isProxy(toRaw(reactiveUser1.user))); // false
  }
}
```

##### 延伸方法--shallowReactive()

1、概述：创建一个反应式代理，但只是浅度创建

2、用例：由vue提供，按需引入：import { shallowReactive } from 'vue'

```js
import { isReactive, shallowReactive } from 'vue'
export default {
  setup(props, context){
    const data = shallowReactive({
      count: 10,
      content: {
        age: 20
      }
    })
    data.count++ // 11 逻辑层数据已发生变化,视图重新渲染
    isReactive(data.content) // 因为data.content属于深度嵌套，未被代理
    data.content.age++ // 21 逻辑层数据发生变化，但是视图层不会被更新渲染
  }
}
```

##### 延伸方法--shallowReadonly()

1、概述：创建一个只读代理，但只是浅度创建

2、用例：由vue提供，按需引入：import { shallowReadonly } from 'vue'

```js
import { isReadonly, shallowReadonly } from 'vue'
export default {
  setup(props, context){
    const data = shallowReadonly({
      count: 10,
      content: {
        age: 20
      }
    })
    data.count++ // warning! target is readonly.
    isReadonly(data.content) // 因为data.content属于深度嵌套，未被代理
    data.content.age++ // 21 深度嵌套未被代理，所以操作成功
  }
}
```

##### 响应式数据-- ref

1、概述：函数，创建并返回一个响应式数据对象，并在此对象上只包含一个.value属性指向该数据值

2、用例：由vue提供，按需引入：import { ref } from 'vue'

```js
<template>
  <p>{{name}}</p> 
  <!-- 视图中直接使用即可，不需要.value -->
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props, context){
    const name = ref('zhang_san')
    console.log(name.value); // 'zhang_san'
    // 同样需要return返回
    return { name }
  }
}
</script>
```

如果使用ref将一个对象创建为响应式代理的话，则该对象会被进行深度响应式创建

```js
<template>
  <p>{{data.count}}</p>   <!-- 0 -->
  <p>{{data.content.age}}</p>   <!-- 10 -->
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props, context){
    const defaultVal = {
      count: 0,
      content: {
        age: 10
      }
    }
    const data = ref(defaultVal)
    console.log(data.value.count); // 0
    console.log(data.value.content.age); // 10
    return { data }
  }
}
</script>
data.value.count++ // 1 视图重新渲染
data.value.content.age++ // 11 视图重新渲染
```

##### ref数据能访问到的部分常用方法及延伸方法

###### unref()

1、概述：返回代理原始值，如果参数为ref则返回代理原始值，如果不是ref则返回参数本身

2、用例：由vue提供，按需引入：import { unref } from 'vue'

```js
import { unref } from 'vue'
const a = ref(1)
const b = 'zhang_san'
console.log(unref(a)); // 1
console.log(unref(b)); // 'zhang_san'
```

###### toRef()

1、概述：可以将reactive创建的代理的某个属性传递出来用ref进行代理

2、用例：由vue提供，按需引入：import { toRef } from 'vue'

```js
import { reactive, toRef } from 'vue'
const data = reactive({ name: 'zhang_san', age: 20 })
const toRefValue = toRef(data, 'age')

toRefValue.value++ // toRefValue.value 21
console.log(data.age); // 21

data.age++ // data.age 22
console.log(toRefValue.value); // 22
```

3、**注意：使用toRef将reactive的属性代理后，属性的值的变化会同时影响toRef后的值和原本的reactive的属性值**

4、实例：在将prop的引用传递给复合函数的时候，toRef将非常有用

```js
setup(props){
	userHandler(toRef(props, 'name'))
	// 这将使得userHandler拿到的name为响应式代理
}
```

###### toRefs()

1、概述：可以将reactive创建的代理的所有属性传递出来用ref进行代理

2、用例：由vue提供，按需引入：import { toRefs } from 'vue'

```js
import { reactive, toRefs } from 'vue'
const data = reactive({ name: 'zhang_san', age: 20 })
const toRefValue = toRefs(data)

toRefValue.age.value++ // toRefValue.age.value 21
console.log(data.age); // 21

data.age++ // data.age 22
console.log(toRefValue.age.value); // 22
```

3、**注意：使用toRefs将reactive的属性代理后，属性的值的变化会同时影响toRef后的对应属性值和原本的reactive的属性值**

4、实例：从组合函数返回响应式对象时，这将很有用，**而不是使用es6数据结构的方式，这样会使reactive的属性失去响应式代理**

```js
function userHandler() {
  const state = reactive({ name: 'zhang_san', age: 20 })
  return toRefs(state)
}
export default {
  setup() {
    const { name, age } = userHandler()
    return { name, age }
  }
}
```

###### isRef()

1、概述：判断响应式代理是否为ref所创建

2、用例：由vue提供，按需引入：import { isRef } from 'vue'

```js
import { ref, reactive, isRef } from 'vue'
const name = ref('zhang_san')
const user = reactive({ sex: '男', age: 20 })

console.log(isRef(name)); // true
console.log(isRef(user)); // false
// 应用场景，在获取一个未知的数据对象的值时，如：
const newV = isRef(name) ? name.value : name
```

##### toRefs -- 解构响应式对象数据

```js
<template>
  <div>
    <h1>解构响应式对象数据</h1>
    <p>UserName: {{username}}</p>
    <p>Age: {{age}}</p>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup(){
    const user = reactive({
      username: 'zhang_san',
      age: 20
    })
    return { ...toRefs(user) }
  }
}
</script>
```

##### reactive和ref的相互作用

1、将ref的数据对象挂载到reactive上时，会把原始的响应数据对象展开为原始值，这样就不需要.value而被直接访问到

```js
export default {
  setup(){
    const ref1 = ref(0)
    const reactive1 = reactive({ref1})
    console.log(reactive1.ref1); // 0
    reactive1.ref1++
    console.log(reactive1.ref1); // 1
    console.log(ref1.value); // 1
  }
}
```

2、新的ref会覆盖旧的ref

```js
export default {
  setup(){
    const ref1 = ref(0)
    const reactive1 = reactive({ref1})
    
    const ref2 = ref(100)
    reactive.ref1 = ref2
    reactive.ref1++
    
    console.log(reactive1.ref1); // 101
    console.log(ref2.value); // 101
    console.log(ref1.value); // 0
  }
}
```

##### reactive和ref的区别

```js
import { reactive, ref } from 'vue'
export default {
  setup(){
    let num1 = 10
    let num2 = ref(10)
    let num3 = reactive(100)
    console.log(num1); // 定义的纯数字10, 打印结果是一个数字类型的10
    console.log(num2); // 使用vue3中提供的ref方法定义的值 打印的时候是一个对象
    console.log(num3); // 使用reactive定义的num3 结果是一个数值类型100
    return { num1, num2, num3 }
  }
}
```

我们发现使用ref定义的数据，打印结果是一个被对象包裹的响应的数据，使用reactive的方式和纯变量声明的方式打印结果是一样的，这是什么原因呢

我们发现在控制台输出一个警告信息，提示100这个值不能被reactive创建，官方也推荐我们在定义数据的时候，reactive定义复杂的数据类型的数据，ref推荐定义基本数据类型，所以如果要使用reactive第一基本数据类型的话，我们需要在reactive中将数据包裹一下

```js
let num3 = reactive({val: 100})
```

我们在使用reactive定义数据的时候用对象做一层包裹，这样控制台就不会报警告信息了

但是使用reactive定义的数据和ref定义的数据打印结果有一些差异

```js
let num2 = ref(10)
let num3 = reactive({val: 100})
console.log(num2); // 使用vue3中提供的ref方法定义的值 打印的时候是一个对象
console.log(num3); // 使用reactive定义的num3 结果是一个数值类型100
```

我们发现ref定义的数据打印结果需要.value才能获取到结果，而reactive则不需要

```js
let num2 = ref(10)
let num3 = reactive({val:100})
console.log(num2.value) // 10 
console.log(num) // {val:100}
```

总结：

reactive和ref都是用来定义响应式数据的，reactive更推荐去定义复杂的数据类型，ref更推荐定义基本数据类型

ref和reactive本质我们可以简单的理解为ref是对reactive的二次包装，ref定义的数据访问的时候要多一个.value

使用ref定义一本数据类型，ref也可以定义数组和对象

**ref函数仅能监听基本类型的变化，不能监听复杂类型的变化(比如数组，对象)**

##### 计算属性-- computed

1、概述：vue2.x中的计算属性，在vue3.x中以方法的形式使用

2、用例：用例：由vue提供，按需引入：import { computed } from 'vue'

```js
import { computed, ref } from 'vue'
export default {
  setup(){
    const age = ref(20)
    const userAge = computed(() => `今年${age.value}岁了`)
    return { userAge }
  }
}
```

带有get和set功能的用法

```js
import { computed, ref } from 'vue'
export default {
  setup(){
    const age = ref(20)
    const userAge = computed({
      get: () => `今年${age.value}岁了`,
      set: val => age.value = age + 1
    })
    return { userAge }
  }
}
```

##### 观察者-- watch

1、概述：vue2.x中的响应式变量监听，在vue3.x中以方法的形式使用

2、用例：用例：由vue提供，按需引入：import { watch} from 'vue'

3、监听单一数据

```js
import { ref, reactive, computed, watch } from 'vue'
export default {
  setup(props){
    //ref
    const age = ref(20)
    watch(() => age.value, (nv, ov) => { ... })

    // reactive
    const product = reactive({ name: 'pig', conut: 1})
    watch(() => product.count, (nv, ov) => { ... })

    // props
    watch(() => props.msg, (nv, ov) => { ... })

    //computed
    const userAge = computed(() => `今年${age.value}岁了`)
    watch(() => userAge.value, (nv, ov) => { ... })
  }
}
```

4、监听对象

```js
import { ref, reactive, watch } from 'vue'
export default {
  setup(){
    //ref
    const user = ref({ name: 'zhang_san', age: 20 })
    // 字面量引发的监听触发： user.value = { ... }
    watch(() => user.value, (nv, ov) => { ... })
    // 如果使用user.value.age = 30 这种方式修改user的age值，将不会触发上面的监听，需要使用watch的第三个参数(深度监听)
    watch(() => user.value, (nv, ov) => { ... }, { deep: true })
    // 如果我们只需要监听name的值，那么
    watch(() => user.value.name, (nv, ov) => { ... })

    // reactive
    const reactiveData = reactive({ user: { name: 'zhang_san', age: 20 }})
    // 字面量引发的监听触发： user.value = { ... }
    watch(() => reactiveData.user, (nv, ov) => { ... })
    // 如果使用user.value.age = 30 这种方式修改user的age值，将不会触发上面的监听，需要使用watch的第三个参数(深度监听)
    watch(() => reactiveData.user, (nv, ov) => { ... }, { deep: true })
    // 如果我们只需要监听name的值，那么
    watch(() => reactiveData.user.name, (nv, ov) => { ... })
  }
}
```

5、监听数组

```js
import { ref, reactive, watch } from 'vue'
export default {
  setup(){
    //ref
    const user = ref([
      { name: 'zhang_san', age: 20 },
      { name: 'li_si', age: 10 },
    ])
    // 字面量引发的监听触发： user.value = { ... }
    watch(() => user.value, (nv, ov) => { ... })
    // 如果使用数组的操作方法( 如：push() )或者user.value[0].age = 20这类操作去修改数组某项的属性值，将不会触发监听，也需要使用深度监听
    watch(() => user.value, (nv, ov) => { ... }, { deep: true })
    
    // reactive
    const reactiveData = reactive({ user: [
      { name: 'zhang_san', age: 20 },
      { name: 'li_si', age: 20 },
    ]})
    // 字面量引发的监听触发： user.value = { ... }
    watch(() => reactiveData.user, (nv, ov) => { ... })
    // 如果使用数组的操作方法( 如：push() )或者user.value[0].age = 20这类操作去修改数组某项的属性值，将不会触发监听，也需要使用深度监听
    watch(() => reactiveData.user, (nv, ov) => { ... }, { deep: true })
  }
}
```

6、监听多个数组

```JS
import { ref, reactive, watch } from 'vue'
export default {
  setup(props){
    const age = ref(20)
    const user = ref({ name: 'zhang_san', age: 20 })

    watch([() => age.value, () => user.name], ([newAge, newName], [oldAge, newName]) => { ... })
  }
}
```

7、终止监听

```js
import { ref, watch } from 'vue'
const age = ref(20)
// watch监听会返回一个方法
const stop = watch(age, (nv, ov) => { ... })
// 当调用此方法后，该监听就会被移除
stop()
```

8、清除watch中无效的异步任务

```js
<template>
  <div>
    <input type="text" v-model="keywords">
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
export default {
  setup(){
    const keywords = ref("")
    //异步任务：打印用户输入的关键词
    const asyncPrint = val => {
      return setTimeout(() => {
        console.log(val);
      }, 1000)
    }

    watch(
      keywords,
      (keywords, prevKeywords, onCleanup) => {
        // 执行异步任务，并得到关闭异步任务的 timerId
        const timerId = asyncPrint(keywords)
        // 如果 watch 监听被重复了，则会先清除上次未完成的异步任务
        onCleanup(() => clearTimeout(timerId))
      },
      { lazy: true }
    )

    return { keywords }
  }
}
</script>
```

##### provide和inject

1、概述：实现嵌套组件树形数据传递与接收

2、使用：由vue提供，按需引入：import { provide, inject } from 'vue'

3、用例

```js
import { provide, inject } from 'vue'
//父组件注入
const component = {
  setup(){
    provide('name', 'zhang_san')
    // 如果是需要注入多个值则重复使用provide即可
  }
}
// 子组件接收
const children = {
  setup(){
    // inject的第二个参数为没有接收到注入的数据时的默认返回值，如果没有，则返回undefined
    const user = inject('name', 'li_si')
    // 需要接收多个注入的值也是重复使用inject
    return { user }
  }
}
```

4、实例：在实际使用过程中，往往我们需要将注入的值实现响应式变化，则需要注入响应式

```js
//父组件注入
const component = {
  setup(){
    const user = reactive({ name: 'zhang_san', age: 20 })
    provide('user', user)
  }
}
// 子组件接收后，如果父组件中的user发生了改变，则子组件中也会发生响应式变化
const children = {
  setup(){
    const user = inject('user', {})
    return { user }
  }
}
```

5、注意：**不建议在注入时对响应式变量进行改变(在子组件中改变注入的值)，因为此操作会改变vue的单向数据流，建议采用注入改变其值的方法来对响应式变量进行改变**

```js
import { reactive, provide, inject } from 'vue'
//父组件注入
const component = {
  setup(){
    const user = reactive({ name: 'zhang_san', age: 20 })
    function changeHandler(){
      user.age = 30
    }
    provide('user', user)
    provide('changeHandler', changeHandler)
  }
}
// 子组件接收后，通过调用注入的方法来对响应式变量进行改变
const children = {
  setup(){
    const user = inject('user', {})
    const changeHandler = inject('changeHandler')
    return { user, changeHandler }
  }
}
```

##### template和ref获取元素或组件实例

1、概述：通过ref获取模板元素节点

2：使用：由vue提供，按需引入：import { ref } from 'vue'

3、回顾：options API中是：this.refs.refAdd(获取某个组件)或者this.refs.refDiv(获取某个元素节点)

4、用例：

- 在组件或节点中定义ref属性：add(ref="refAdd")或div(ref="refDiv")
- 在setup中定义对应ref属性相同的变量名，赋值为任意值即可
- 访问方式为：refAdd.value或refDiv.value

```js
<template>
  <div ref="divBox">content</div>
</template>
 
<script>
import { ref } from 'vue'
export default {
  setup(){
    const divBox = ref(null); // <div ref="divBox">content</div>
    const user = ref(null); // user.value -> null
    return { divBox }
  }
}
</script>
```

4、注意：

**①：元素节点对应ref的分配只会在render时进行对比赋值，因此若在setup中未将对应的响应式变量return出来，则不会获取到组件实例或元素节点**

**②：在满足①的前提下，只要在定义变量时变量名称与当前组件中ref属性值相同，则该变量会被统一赋值为组件实例或元素节点，与定义变量时的赋值无关**

setup的context中访问到refs对象，所以获取组件实例或者元素节点的方式还可以

```js
<template>
  <div ref="divBox">content</div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props, { refs }){
    const divBox = refs.divBox;
    return { divBox }
  }
}
</script>
```

##### vue3.x中的emits选项

vue3.x组件自定义事件实现子组件给父组件传值

注意：vue官方推荐你始终使用**kebab-case**的事件名

子组件

```js
<template>
  <button @click="run">通过广播方式实现子组件给父组件传值</button>
</template>

<script>
export default {
  // 建议定义所有发出的事件，以便更好地记录组件应该如何工作、
  emit: ['run-parent'],
  data(){
    return {}
  },
  methods: {
    run(){
      this.$emit("run-parent", "传给爸爸")
    }
  },
}
</script>
```

1、概述：当前组件的通过emit的事件列表

2：类型：Array|Object

3、作用：vue3.0中使用emit发起事件时会要求当前组件记录emit事件(没有则控制台会抛出警告)

4、用途：用于记录当前组件emit的事件，当为对象时，则可以验证传入的值是否有效

```js
setup(prop, { emit }){
  const changeOne = val => {
    emit('on-changeOne', val)
  }
  const changeTwo = val => {
    emit('on-changeTwo', val)
  }
}
```

用法一：数组用法

```js
export default {
  emits: ['on-changeOne', 'on-changeTwo'],
  setup(){ ... }
}
```

用法二：对象用法，当emits为对象时，可以验证事件中的参数是否有效

```js
export default {
  emits: {
    click: null,
    'on-changeOne': payload => {
      if (...) {
        return true; // 验证通过
      }
      console.warn('验证失败！')
      return false; // 验证失败，控制台打印警告信息“验证失败”
    },
    'on-changeTwo': payload => { ... }
  },
  setup(){ ... }
}
```

##### vue3.x核心值getCurrentInstance

1、概述：一个很重要的方法，获取当前组件的实例、上下文来操作router和vuex等

2、使用：由vue提供，按需引入：import { getCurrentInstance } from 'vue'

```js
import { getCurrentInstance } from 'vue'
// 获取当前组件实例
const instance = getCurrentInstance();

// 获取当前组件的上下文，下面两种方式都能获取到组件的上下文
const { ctx } = getCurrentInstance(); // 方式一，这种方式只能在开发环境下使用，生产环境下的ctx将访问不到
const { proxy } = getCurrentInstance(); // 方式二，此方法在开发环境及生产环境都能放到组件上下文对象(推荐)
// ctx 中包含了组件中由ref和reactive创建的响应式数据对象，以及以下对象及方法
proxy.$attrs
proxy.$data
proxy.$el
proxy.$emit
proxy.$forceUpdate
proxy.$nextTick
proxy.$options
proxy.$parent
proxy.$props
proxy.$refs
proxy.$root
proxy.$slots
proxy.$watch
```

##### vue3.x中我们采用mitt实现全局事件总成

1、前言：由于vue3.x中删除了on和off，因此不能借助于一个单独的vue实例来实现全局事件的发布和订阅与取消订阅(也就是组件通讯)

2、概述：mitt是一个三方库，npm安装：npm install -D mitt

3、使用：我们同样使用插件的方式将mitt集成到vue中

4、mitt对象：

- all (map对象)：包含了所有订阅的事件名称，及对应的处理方法数组
- emit (方法)：触发事件，参数为（事件名(方法名), 携带的参数），当前携带的参数只能为一个，不能为多个
- on (方法)：创建事件订阅，参数为(事件名，处理方法)
- off (方法)：取消事件订阅，参数为(事件名，处理方法)

5、全局事件总成搭建

```js
import _ from 'lodash'
import mitt from 'mitt'
export default {
  install(Vue, options){
    const _emitter = mitt()

    // 全局发布(在vue全局方法中自定义$pub发布方法)
    // 这里做了$pub方法能够携带多个参数的处理，方便我们在业务中触发事件时带多个参数
    Vue.config.globalProperties.$pub = (...args) => {
      _emitter.emit(_.head(args), args.slice(1))
    }

    // 全局订阅(在vue全局方法中自定义$sub订阅方法)
    Vue.config.globalProperties.$sub = function(event, callback){
      Reflect.apply(_emitter.on, _emitter, _.toArray(arguments))
    }

    // 取消订阅
    Vue.config.globalProperties.$unsub = function(event, callback){
      Reflect.apply(_emitter.off, _emitter, _.toArray(arguments))
    }
  }
}
```

6、组件实例中使用：

**全局事件发布**

```js
<template>
  <div class="child">
    <button @click="pubHandler">发起事件</button>
  </div>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'
export default {
  setup(props, context){
    const { proxy } = getCurrentInstance()
    const pubHandler = () => {
      proxy.$pub('foo', 1, 2, 3)
    }
    return { pubHandler }
  }
}
</script>
```

**全局事件订阅/取消订阅**

```js
<template>
  <div class="child">
    <button @click="unsubHandler">注销事件</button>
  </div>
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'
export default {
  setup(props, context){
    const { proxy } = getCurrentInstance()
    const watchHandler = ([a, b, c] = args) => {
      console.log('组件监听触发！');
    }
    onMounted(() => {
      proxy.$sub('foo', watchHandler)
    })
    const unsubHandler = () => {
      proxy.$unsub('foo', watchHandler)
    }
    return { unsubHandler }
  }
}
</script>
```

##### Vue-Router在vue3.x中的使用方式及特性

1、描述：区别于vue2，在vue3中vue-router将使用新的方法来创建路由，其中重要的是：createRouter, createWebHashHistory, createWebHistory这三个方法

2、创建：

```js
// router.js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const routes = [...]
const router = createRouter({
  // 区别于vue2的mode,vue3中将使用history属性来决定采用哪种路由模式
  history: createWebHashHistory(), // 默认为hash模式，可设置createWebHistory模式
  // 区别于vue2的base，vue3中的基础路由路径将作为createWebHashHistory或者createWebHistory的唯一参数配置到路由中
  routes
})
export default router;
```

```js
// main.js
import router from './routes'
const app = createApp(App);
// 注册路由
app.use(router)
```

3、扩展：在组件中使用路由，查看路由

```js
// index.vue
// vue-router库当中暴露了useRouter和useRoute两个方法供组件使用，还暴露有其他方法
import { useRouter, useRoute } from 'vue-router'
import { onMounted, getCurrentInstance } from 'vue'
export default {
  setup(props, context){
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const route = useRoute()
    onMounted(() => {
      console.log(proxy.$router === router); // true
      console.log(route); {path, params, query ...}
    })
  }
}
```

##### hooks

Vue3的hook函数相当于vue2的mixin，不同在于hooks是函数

Vue3的hook函数可以帮助我们提高代码的复用性，让我们能在不同的组件中都利用hooks函数

```js
import { onBeforeUnmounted, onMounted, ref } from 'vue'
export default function () {
  const x = ref(-1); // x绑定为响应式数据
  const y = ref(-1);
  const clickHandler = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  }
  onMounted(() => {
    window.addEventListener('click', clickHandler)
  })
  onBeforeUnmounted(() => {
    window.removeEventListener('click', clickHandler)
  })
  return {
    x, y
  }
}
```

##### 新组件-- Teleport

Teleport是一种能够将我们的模板移动到DOM中Vue app之外的其他位置的技术，就有点像哆啦A梦的“任意门”

场景：像modals,toast等这样的元素，很多情况下，我们将它完全的和我们的vue应用的DOM完全剥离，管理起来反而会方便容易很多

原因在于如果我们嵌套在vue的某个组件内部，那么处理前套组件的定位、z-index和样式就会变得很困难

另外，像modals,toast等这样的元素需要使用到vue组件的状态(data或者props)的值

这就是Teleport派上用场的地方，我们可以在组件的逻辑位置写模板代码，这意味着我们可以使用组件的data或props，然后在vue应用的范围之外渲染它

```js
  <button @click="showToast" class="btn">打开toast</button>
  <!-- to 属性就是目标位置 -->
  <teleport to="#teleport-target">
    <div v-if="visiable" class="toast-warp">
      <div class="toast-msg">我是一个toast文案</div>
    </div>
  </teleport>
```

##### vue3中css使用js变量

```js
<template>
  <div>
    <h1>Hello Vue 3.0 + Vite</h1>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        color: "red",
        backg: "blue"
      }
    }
  }
</script>

<style vars="{ color, backg}">
  h1{
    color: var(--color);
    background-color: var(--backg);
    text-align: center;
  }
</style>
```

