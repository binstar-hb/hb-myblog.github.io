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

```
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

```
import { createApp } from 'vue';
const app = createApp({});
```

##### router.js

vue3.x需要引入createRouter创建地址路由。createWebHashHistory对应之前的hash,createWebHistory对应之前的history。

```
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

```
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

```
Vue.config					->	app.config

Vue.config.ignoredElements	->	app.config.ignoredElements	

Vue.component				->	app.component	

Vue.directive				->	app.directive	

Vue.mixin					->	app.mixin	

Vue.use						->	app.use	
```

config: 包含Vue应用程序全局配置的对象，在挂载应用之前配置相应的属性。

```
const app = Vue.createApp({});
app.config = {...}
```

1. devtools（类型：Boolean，默认：false），配置是否开启vue-devtools检查，一般在开发环境是true，生产环境为false。<br>app.config.devtools = true

2. errorHandler（类型：function，参数err：错误内容，vm：对应的实例，info：Vue特定的错误信息，如某个生命周期中出现的错误）<br>app.config.errorHandler = (err, vm, info) => {}

3. warnHandler（类型：function，参数msg：警告内容，vm：对应的实例，trace：组件的层次追踪）<br>app.config.warnHandler = (msg, vm, trace) => {};

4. globalProperties (类型: any)用于添加到应用程序中任何组件都能使用的全局属性，当与组件内部的属性冲突时，将优先使用组件内部的属性值。可代替Vue2中的Vue .prototype.

   ```
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

```
import { createApp } from 'vue';
import App from './App.vue'; 
const app = createApp(App);
app.mount( #app'); 
```

##### 注册全局组件

```
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

```
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

```
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

```
import mitt from 'mitt'
const VueEvent = mitt()

export default VueEvent;
```



```
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

```
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

```
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

```
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

```
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

```
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

```
<template>
  <div>
    <header></header>
    <main></main>
    <footer></footer>
  </div>
</template>
```

Vue3.x中可以使用多个根节点

```
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```

##### 按键修饰符

Vue2.x

```
<input v-on:keyup.13="submit">
<input v-on:keyup.enter="submit">
Vue.config.keyCode= { f1: 112 }
```

Vue3.x 别名支持任意键

```
<input v-on:keyup.delete="cancel">
<input v-on:keyup.f1="cancel">
```

