---
title: vue3动态路由和动态侧边菜单
date: 2022-02-22 09:38:06
tags: vue3动态路由和动态侧边菜单
categories: vue
---

在做Vue管理系统的时候，都会遇到的一个需求：每个用户的权限是不一样的，那么他可以访问的页面(路由)，可以操作的菜单选项是不一样的，如果由后端控制，我们前端需要去实现动态路由，动态渲染侧边菜单栏。

#### 实现动态路由api

```js
router.addRoute() //应用程序已经运行的时候添加路由
router.removeRoute() // 应用程序已经运行的时候删除路由
```

#### 定义共用的页面路由(无论哪个用户都会有的)

如无论什么用户都可访问登录页login，错误页面404。

```js
import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/',
    redirect: { path: '/login' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home'),
    redirect: '/welcome',
    children: [
      {
        path: '/:pathMatch(.*)*',    // 捕获所有路由或 404 Not found 路由
        component: () => import('../views/welcome')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
```

#### 接口数据：

这里模拟接口的路由数据(这里进行数据精简，便于演示，实际情况可能要进行数据结构格式的转换)

```js
navigationList : [
     {
        id: 1,
        icon: 'icon-jurassic_user',
        name: '用户管理',
        url: '/user'
    },
     {
        id: 2,
        icon: 'icon-jurassic_user',
        name: '角色管理',
        url: '/role'
     },
     {
        id: 3,
        icon: 'icon-shebei',
        name: '设备管理',
        url: '/device'
      }
]
```

#### 添加动态路由进去的时机(router.beforeEach)

利用全局前置守卫router.beforeEach,在跳转路由前先判断是否已经添加过动态路由了，如果没有，则先获取数据进行添加路由。

```js
import store from '@/store'
//这里我用vuex的一个变量 asyncRoutestMark 来标识是否拼接过路由
router.beforeEach((to, from, next) => {
    if (!store.state.asyncRoutestMark) {
        // navigationList 是上面模拟接口返回的数据
        // 这里将新的路由都作为 home 的子路由(实际开发根据情况)
        // meta 是存储一些信息，可以用于权限校验或其他
        navigationList.forEach( navigation => {
          router.addRoute('home', {
            path: navigation.url,
            meta: { name: navigation.name, isAsync: true, icon: navigation.icon },
            name: menu.url,
            component: () => import(`../views/${menu.url}`)
          })
        })
        console.log(router.getRoutes(), '查看现有路由')
        store.commit('setAsyncRoutestMark', true) // 添加路由后更改标识为true
        next({ ...to, replace: true })     //路由进行重定向放行
    } else {
      next()
    }
})
```

利用router.getRoutes()方法查看现有路由，我们将会看到根据新的路由添加进去了。