---
title: React从入门到入狱
date: 2022-11-12 10:47:11
tags: React
categories: React
---
#### React基础
##### 1.jsx语法规则:
1. 定义虚拟DOM时，不要写引号。
2. 标签中混入JS表达式时要用{}。
3. 样式的类名指定不要用class，要用className。
4. 内联样式，要用`style={{key : value}}`的形式去写。
5. 只有一个根标签
6. 标签必须闭合
7. 标签首字母
(1). 若小写字母开头，则将改标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
(2). 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。

##### 2.函数式组件
```jsx
//1.创建函数式组件function 
Demo(){
  return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
}
//2.渲染组件到页面
ReactDOM.render(<Demo/>,document.getElementById( 'test' ))
```

##### 3.类式组件
1. 创建类式组件
```jsx
class MyComponent extends React.Component {
  render(){
    //render是放在哪里的?-- MyComponent的原型对象上，供实例使用。
    //render中的this是谁?— MyComponent的实例对象〈=>MyComponent组件实例对象。console.log( ' render中的this : ' ,this);
    return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
  }
}
```
2. 渲染组件到页面
```jsx
ReactDOM.render(<MyComponent/>,document.getElementById( 'test'))
/*
  执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么?
  1.React解析组件标签，找到了MyComponent组件。
  2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
  3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
*/
```

##### 4.生命周期函数
**旧**
- 初始化阶段:由ReactDOM.render()触发---初次渲染
1. constructor()
2. componentwillMount()
3. render()
4. componentDidMount()
- 更新阶段:由组件内部this.setSate()或父组件重新render触发
1. shouldComponentUpdate()
2. componentwillUpdate()
3.  render()
4. componentDidUpdate()
- 卸载组件:由ReactDOM.unmountComponentAtNode()触发
1. componentwi11Unmount()
**新**
- 初始化阶段:由ReactDOM.render()触发---初次渲染
1. constructor()
2. getDerivedStateFromProps()----当state完全取决于props时使用
3. render()
4. componentDidMount()
- 更新阶段:由组件内部this.setSate()或父组件重新render触发
1. getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()-----更新之前获取快照
5. componentDidUpdate()
- 卸载组件:由ReactDOM.unmountComponentAtNode()触发
1.componentwi11Unmount()

##### 5.动态初始化列表，如何确定将数据放在哪个组件的state中?
1. 某个组件使用:放在自身的state中
2. 某些组件使用:放在他们共同的父组件state中(官方称此操作为:状态提升)

##### 6.关于父子之间通信:
1. 【父组件】给【子组件】传递数据:通过props传递
2. 【子组件】给【父组件】传递数据:通过props传递，要求父提前给子传递一个函数

##### 7.编写setupProxy.js配置具体代理规则:

```js
const proxy = require('http-proxy-middleware ')
module.exports = function (app) i
app.use(
  proxy('/api1'， { //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
    target: 'http:/ /1oca7host:5000'，//配置转发目标地址(能返回数据的服务器地址)
    changeorigin: true，//控制服务器接收到的请求头中host字段的值
      /*
      changeorigin设置为true时， 服务器收到的请求头中的host为: localhost: 5000 
      changeOrigin设置为false时， 服务器收到的请求头中的host为: l1ocalhost: 3000 
      changeorigin默认值为false， 但我们一般将changeorigin值设为true
      */
    pathRewrite: {'^/api1 ': ''}//去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
  })，
  proxy('/api2'， {
    target: 'http: //localhost : 5001'，
    changeorigin: true,
    pathRewrite: {
      '^/api2': ''
    }
  })
)
```

##### 8.消息订阅与发布机制
`npm install pubsub-js`
1.先订阅，再发布（理解:有一种隔空对话的感觉)
2.适用于任意组件间通信
3.要在组件的componentwillUnmount中取消订阅

##### 9.路由的基本使用

1. 路由跳转标签改为Link标签
`<Link to="/xxxxx" >Demo</Link>`
`<NavLink activeClassName="myActiveClassName" to="/xxxxx" >Demo</NavLink>`
2. 展示区写Route标签进行路径的匹配
`<Route path='/xxxx' component={ Demo}/>`
3. <App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>

##### 10.路由组件与一般组件
1. 写法不同:
一般组件: `<Demo/>`
路由组件: `<Route path="/demo" component={Demo}/>`
2.存放位置不同:
一般组件: components
路由组件: pages
3. 接收到的props不同:
一般组件:写组件标签时传递了什么，就能收到什么
路由组件:接收到三个固定的属性
```js
history:
  go: f go(n)
  goBack: f goBack()
  goForward: f goForward()
  push: f push(path, state)
  replace: f replace(path，state)
location:
  pathname: "/ about"
  search: ""
  state: undefined
match:
  params: {}
  path: "/about"
  ur1: "/ about"
```

##### 11.NavLink与封装NavLink
1. NavLink可以实现路由链接的高亮，通过activeclassName指定样式名
2. 标签体内容是一个特殊的标签属性
3. 通过this.props.children可以获取标签体内容


##### 12.Switch的使用
1. 通常情况下，path和component是一一对应的关系。
2. Switch可以提高路由匹配效率(单一匹配)。
```js
import {Switch, Route} from 'react-router-dom'

import About from '../pages/About'
import Home from '../pages/Home'

<Switch>
  <Route path="/about" component={About}/>
  <Route path="/home" component={Home}/>
</Switch>
```

##### 13.history路由模式下解决多级路径刷新页面<font color=orange>样式丢失的问题</font>
1. public/index.htm1 中引入样式时不写./ 写/（常用)
2. public/index.htm1 中引入样式时不写﹒/写%PUBLIC_URL%（常用)
3. 使用HashRouter

##### 14.路由严格匹配（慎用）
`<Route path="/home" component={Home}/>`

路由默认开启模糊匹配(简单记:【输入的路径】必须包含要【匹配的路径】，且顺序要一致)
`<Link to="/home/a/b" >Demo</Link>` 

`http://localhost:3000/home/a/b`未匹配到a或b的情况下默认给到/home页面
页面没有问题一般不开启严格匹配，如果出现由于模糊匹配引发的问题，这种情况再开启严格匹配。有些时候开启会导致无法继续匹配二级路由

用法`<Route exact path="/home" component={Home}/>`

##### 15.Redirect的使用
1.一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
2.具体编码:
```jsx
<Switch>
  <Route path="/about" component={About}/>
  <Route path="/home" component={Home}/>
  <Redirect to="/about" />
</ Switch>
```

##### 16.嵌套路由
1. 注册子路山时要写上父路山的path值
2. 路山的匹配是按照注册路由的顺序进行的

##### 17.向路由组件传递参数
1. params参数
路由链接(携带参数):`<Link to='/demo/test/tom/18'}>详情</Link>`
注册路由(声明接收):`<Route path="/demo/test/:name/:age" component={Test}/>`
接收参数: `this.props.match.params`

2. search参数
路由链接(携带参数):`<Link to=' /demo/test?name=tom&age=18'}>诈情</Link>`
注册路由(无需声明，正常注册即可):`<Route path=" /demo/test" component={Test}/>`
接收参数: `this.props.location.search`
备注:获取到的search是urlencoded编码字符串，需要借助querystring解析
```js
import qs from 'querystring'
qs.parse('id=1&name=tom') //{id:'1',name:'tom'}
qs.stringfy({id:'1',name:'tom'}) //id=1&name=tom
```

3. state参数
路由链接(携带参数):`<Link to={{path: '/demo/test' ,state:{name : 'tom' ,age:18]}}>详情</Link>`
注册路由(无需声明，正常注册即可):`<Route path=" /demo/test" component={Test}/>`
接收参数: `this.props.location.state`
备注:刷新也可以保留住参数

##### 18.路由push模式和replace模式

`<Link replace to={{path:'/demo/test' ,state:{name : 'tom' ,age:18]}}>详情</Link>`

##### 19.编程式路由导航
借助this.prosp.history对象上的API对操作路由跳转、前进、后退
- this.prosp.history.push()
- this.prosp.history.replace()
- this.prosp.history.goBack()
- this.prosp.history.goForward()
- this.prosp.history.go()

```jsx
this.propps.histroy.push('/xxx/id/name')
this.propps.histroy.push('/xxx/?id=xxx&name=xxx')
this.propps.histroy.push('/xxx', {...})
```

##### 20.withRouter的使用

```jsx
import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
class Header extends Component { … }
export default withRouter(Header)
//withRouter可以加工一般组件，让一般组件具备路由组件所特有的API
// withRouter的返回值是一个新组件
```

##### 21.BrowserRouter、HashRouter的区别
1. 底层原理不一样:
BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。HashRouter使用的是URL的哈希值。
2. ur1表现形式不一样
BrowserRouter的路径中没有#,例如: localhost:3000/demo/testHashRouter的路径包含#,例如: localhost:3000/#/demo/test
3. 刷新后对路由state参数的影响
(1). BrowserRouter没有任何影响，因为state保存在history对象中。
(2). HashRouter刷新后会导致路由state参数的丢失。
4.备注: HashRouter可以用于解决一些路径错误相关的问题。

##### 22.antd的按需引入+自定主题

1. 安装依赖:`yarn add react-app-rewired customize-cra babel-plugin-import less less-loader`
2. 修改package.json
```json
"scripts": {
  "start" :"react-app-rewired start",
  "build" :"react-app-rewired build",
  "test" : "react-app-rewired test",
  "eject" : "react-scripts eject"
},
```
3. 根目录下创建config-overrides.js
```js
//配置具体的修改规则
const { override，fixBabelImports,addLessLoader} = require( ' customize-cra');
module.exports = override(
  fixBabelImports('import , {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessoptions:{
      javascriptEnabled: true,
      modifyVars: {'@primary-color' : 'green'},
    }
  })
})
```
4. 备注:不用在组件里亲自引入样式了，即: import 'antd/dist/antd.css'应该删掉

##### 23.redux精简版
**(1)**. 去除Count组件自身的状态
**(2)**. src下建立:

>-redux
>
>>-store.js
>>-count_reducer.js

**(3)**. store.js:
1).引入redux中的createStore函数，创建一个store
2).createstore调用时要传入一个为其服务的reducer
3).记得暴露store对象
**(4)**. count_reducer.js:
1).reducer的本质是一个函数，接收: preState,action，返回加工后的状态
2).reducer有两个作用:初始化状态，加工状态
3).reducer被第一次调用时，是store自动触发的，传递的preState是undefined，传递的action是:{type : '@@REDUX/ INIT_a.2.b.4}
**(5)**. 在index.js中监测store中状态的改变，一旦发生改变重新渲染`<App/>`
备注: redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。

##### 24.redux完整版
**新增文件:**
1. count_action.js 专门用于创建action对象
2. constant.js放置容易写错的type值工
![redux原理图](https://pic2.58cdn.com.cn/nowater/webim/big/n_v2317857e1c4c9412f94132d33a41cbc8c.png)

##### 25.redux异步action版
1. 明确:延迟的动作不想交给组件自身，想交给action
2. 何时需要异步action:想要对状态进行操作，但是具体的数据靠异步任务返回。
3. 具体编码:
  - yarn add redux-thunk，并配置在store中
  - 创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
  - 异步任务有结果后，分发一个同步的action去真正操作数据
4. 备注:异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。

##### 26.react-redux基本使用
1. 明确两个概念:
1). UI组件:不能使用任何redux的api，只负责页面的呈现、交互等。
2). 容器组件:负责和redux通信，将结果交给UI组件。
2. 如何创建一个容器组件--—靠react-redux的connect函数
connect(mapStateToProps,mapDispatchToProps)(UI组件)
-mapstateToProps:映射状态，返回值是一个对象
-mapDispatchToProps:映射操作状态的方法，返回值是一个对象
3. 备注:容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
4. 备注2: mapDispatchToProps，也可以是一个对象
![react-redux原理图](https://pic2.58cdn.com.cn/nowater/webim/big/n_v22da92f5537ff42928c964b2672e2f221.png)

##### 27.react-redux优化
1. 容器组件和UI组件混成一个文件
2. 无需自己给容器组件传递store，给`<App/>`包裹一个`<Provider store={store}>`即可。
3. 使用了react-redux后也不用再自己检测redux中状态的改变了,
容器组件可以自动完成这个工作。
4. mapDispatchToProps也可以简单的写成一个对象
5. 一个组件要和redux“打交道”要经过那几步?
 - (1).定义好UI组件---不暴露
 - (2).引入connect生成一个容器组件，并暴露，写法如下:
 ```jsx
  connect(
    state =>({key:value}), // 映射状态
    {key : xxxxXAction} // 映射操作状态的方法
  )(UI组件)
  ```
 - (3).在UI组件中通过this.props.xxxxxxx读取和操作状态

##### 28.react-redux数据共享
1. 定义一个Pserson组件，和lCount组件通过redux共享数据。
2. 为Person组件编写: reducer、action，配置constant常量。
3. 重点:Person的reducer和Count的Reducer要使用combineReducers进行合并，合并后的总状态是一个对象!
4. 交给store的是总reducer，最后注意在组件中取出状态的时候，记得“取到位”。

##### 29.react-redux开发者工具的使用
1. yarn add redux-devtools-extension
2. store中进行配置
```js
import {composewithDevTools} from 'redux-devtools-extension'
const store = createStore(allReducer,composewithDevTools(applyMiddleware(thunk)))
```

##### 30.react-redux代码优化
1. 所有变量名字要规范，尽量触发对象的简写形式。
2. reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer

#### React扩展

##### 1. setState
###### setState更新状态的2种写法
1. setState(statechange，[callback])------对象式的setState
 - 1.stateChange为状态改变对象(该对象可以体现出状态的更改)
 - 2.callback是可选的回调函数，它在状态更新完毕、界面也更新后(render调用后)才被调用
2. setState(updater,[callback])------函数式的setState
 - 1.updater为返回stateChange对象的函数。
 - 2.updater可以接收到state和props.
 - 3.callback是可选的回调函数，它在状态更新、界面也更新后(render调用后)才被调用。
**总结:**
1. 对象式的setstate是函数式的setstate的简写方式(语法糖)
2. 使用原则:
 - (1).如果新状态不依赖于原状态===>使用对象方式
 - (2).如果新状态依赖于原状态===≥使用函数方式
 - (3).如果需要在setstate()执行后获取最新的状态数据，要在第二个callback函数中读取

##### 2.lazyLoad
路由组件的lazyLoad
```jsx
//1.通过React的lazy函数配合import()函数动态加载路由组件===>路由组件代码会被分开打包
const Login = lazy(()=>import('@/pages/Login'))
//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
<Suspense fallback={<h1>loading. . . ..</h1>}>
  <Switch>
    <Route path="/××x" component={Xxx×}/>
    <Redirect to="/login" />
  </Switch>
</Suspense>
```

##### 3.Hooks
###### 1. React Hook/Hooks是什么?
1. Hook是React 16.8.0版本增加的新特性/新语法
2. 可以让你在函数组件中使用state以及其他的React特性

###### 2.三个常用的Hook
1. state Hook: React.usestate()
2. Effect Hook: React.useEffect()
3. Ref Hook: React.useRef()

###### 3.state Hook
1. state Hook让函数组件也可以有state状态，并进行状态数据的读写操作
2. 语法: const [xxx，setxxx] = React.useState(initvalue)
3. useState()说明:
    参数:第一次初始化指定的值在内部作缓存
    返回值:包含2个元素的数组，第1个为内部当前状态值，第2个为更新状态值的函数
4. setXx×()2种写法:
    setXxx(newvalue):参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值
    setxxx(value => newvalue):参数为函数，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值

```jsx
import React from "react"

export default function Demo() {
  const [count, setCount] = React.useState(0)

  function add() {
    setCount(count+1)
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={add}>+1</button>
    </div>
  )
}
```

###### 4.Effect Hook
1. Effect Hook可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
2. React中的副作用操作:
    发ajax请求数据
    获取设置订阅/启动定时器
    手动更改真实DOM
3. 语法和说明:
```jsx
useEffect(( ={
  //在此可以执行任何带副作用操作
  return ( = {[//在组件卸载前执行
  //在此做一些收尾工作，比如清除定时器/取消订阅等
}，[statevalue])//如果指定的是[]，回调函数只会在第一次render()后执行
```
4. 可以把useEffect Hook看做如下三个函数的组合
    componentDidMount()
    componentDidupdate()
    componentwillUnmount()

###### 5.Ref Hook
1. Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
2. 语法: const refcontainer = useRef(O
3. 作用:保存标签对象,功能与React.createRef()一样

##### 4.Fragment
使用:
```jsx
<Fragment><Fragment>
<></>
```
作用:
> 可以不用必须有一个真实的DOM根标签了


##### 5.Context
**理解**
> —种组件间通信方式,常用于【祖组件】与【后代组件】间通信使用
1. 创建context容器对象:
```jsx
const xxxContext = React.createContext()
```
2. 渲染子组时，外面包裹xxxContext.Provider，通过value属性给后代组件传递数据:
```jsx
<XXXContext.Provider value={数据}>
  子组件
</xxxContext.Provider>
```
3. 后代组件读取数据:
```jsx
//第一种方式:仅适用于类组件
static contextType = xxxContext//声明接收context 
this.context //读取context中的value数据
//第二种方式:丞数组件与类组件都可以
<XXXContext.consumer>
{
  value =>( /* value就是context中的value数据要显示的内容 */ )
}
</xxxcontext.Consumer>
```

示例：
```jsx
import React, { Component } from 'react'

const countContext = React.createContext()
const {Provider, Consumer} = countContext
export default class About extends Component {
  state = {
    count: 999
  }

  render() {
    return (
      <div>about A
        <Provider value={{count: this.state.count}}>
          <B />
        </Provider>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>B
        <C />
        <D />
      </div>
    )
  }
}

class C extends Component {
  static contextType = countContext
  render() {
    return (
      <div>C
        {this.context.count}
      </div>
    )
  }
}

function D() {
  return (
    <div>
      <Consumer>
        {
          value => (<div>{value.count}</div>)
        }
      </Consumer>
    </div>
  )
}
```

##### 6.组件优化
Component的2个问题
1. 只要执行setState(),即使不改变状态数据,组件也会重新render() ==>效率低
2. 只当前组件重新render(),就会自动重新render子组件，纵使子组件没有用到父组件的任何数据==>效率低
效率高的做法
> 只有当组件的state或props数据发生改变时才重新render()
原因
> Component中的shouldComponentUpdate()总是返回true
 - 解决办法1:
    重写shouldComponentUpdate()方法
    比较新旧state或props数据，如果有变化才返回true，如果没有返回fa1se
 - 办法2:
使用PureComponent
    PureComponent重写了shouldComponentUpdate()，只有state或props数据有变化才返回true注意:
    只是进行state和props数据的浅比较，如果只是数据对象内部数据变了，返回false不要直接修改state数据,而是要产生新数据
项目中一般使用PureComponent来优化

##### 7.render props(相当于vue中的插槽)
**如何向组件内部动态传入带内容的结构(标签)?**
vue中:
  使用slot技术，也就是通过组件标签体传入结构<A><B/></A>
React中:
  使用chi1dren props :通过组件标签体传入结构
  使用render props:通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性
选择语言
**children props**
```jsx
<A>
  <B>XXXX</B>
</A>
{this.props.children}
问题:如果B组件需要A组件内的数据，==>做不到
```
**render props**
```jsx
<A render={(data) =><c data={data}></C>}></A>
A组件: {this.props.render(内部state数据)}
c组件:读取A组件传入的数据显示 {this.props.data}
```
示例：
```jsx
import React, { Component } from 'react'

export default class About extends Component {
  state = {
    count: 999
  }

  render() {
    return (
      <div>
        <h1>A组件</h1>
        <B render={(testB) => <C testB={testB}/>}/>
      </div>
    )
  }
}

class B extends Component {
  state = {
    testB: 'B'
  }

  render() {
    return (
      <div>
        <h2>B组件</h2>
        {this.props.render(this.state.testB)}
      </div>
    )
  }
}

class C extends Component {
  render() {
    return (
      <div>
        <h3>C组件</h3>
        {this.props.testB}
      </div>
    )
  }
}
```

##### 8.错误边界
**理解:**
  错误边界(Error boundary):用来捕获后代组件错误，渲染出备用页面
**特点:**
  只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误
**使用方式:**
  getDerivedStateFromError配合componentDidCatch
```jsx
//生命周期函数，一旦后台组件报错，就会触发
static getDerivedstateFromError(error) {
  console.log(error);
  //在render之前触发
  //返回新的state
  return {
    hasError : true,
  }
}

componentDidcatch(error,info) {
  //统计页面的错误。发送请求发送到后台去
  console.log(error, info);
}
```

示例代码：
```jsx
export default class Parent extends Component {
  state = {
    hasError: '' //用于标识子组件是否产生错误
  }
  //当Parent的子组件出现报错时候，会触发getDerivedStateFromError调用，并携带错误信息
  static getDerivedStateFromError(error){
    console.log( '@@@' ,error);
    return {hasError : error}
  }

  componentDidCatch(){
    console.log('此处统计错误，反馈给服务器，用于通知编码人员进行bug的解决');
  }

  render() {
    return (
      <div>
        <h2>我是Parent组件</h2>
        {this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <child/>}
      </div>
    )
}}
```

##### 9. 组件通信方式总结
**组件间的关系:**
 - 父子组件
 - 兄弟组件(非嵌套组件)
 - 祖孙组件(跨级组件)

**几种通信方式:**
1. props:
  (1).children props
  (2).render props
2. 消息订阅-发布:
  pubs-sub、event等等
3. 集中式管理:
  redux、dva等等
4. conText:
  生产者-消费者模式

**比较好的搭配方式:**
  父子组件: props
  兄弟组件:消息订阅-发布、集中式管理
  祖孙组件(跨级组件)∶消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)


#### React Router 6快速上手
> ##### 概述

1. React Router以三个不同的包发布到npm上，它们分别为:
    1. react-router:路由的核心库，提供了很多的:组件、钩子。
    2. <font color=red>**react-router-dom:包含react-router所有内容，并添加一些专门用于DOM的组件，例如`<BrowserRouter>`等。**</font>
    3. react-router-native:包括react-router所有内容，并添加一些专门用于ReactNative的API，例如: `<NativeRouter>`等。
2. 与React Router 5.x版本相比，改变了什么?
    1. 内置组件的变化:移除`<Switch/>`，新增`<Routes/>`等。
    2. 语法的变化:`component={About}`变为`element={<About/>}`等。
    3. 新增多个hook: `useParams` 、`useNavigate`、`useMatch`等。
    4. <font color=red>**官方明确推荐函数式组件了! ! !**</font>
    ...

##### 1.`<BrowserRouter>`
1. 说明:`<BrowserRouter>`用于包裹整个应用。
2. 示例代码:
```jsx
import React from "react";
import ReactDOM from "react-dom" ;
import { BrowserRouter } from "react-router-dom" ;

ReactDOM.render(
  <BrowserRouter>
  {/*整体结构（通常为App组件）*/}
  </BrowserRouter>,root
);
```

##### 2. `<HashRouter>`
1. 说明:作用与`<BrowserRouter>`一样，但`<HashRouter>`修改的是地址栏的hash值。
2. 备注:6.x版本中`<HashRouter>` 、`<BrowserRouter>`的用法与5.x相同。

##### 3.`<Routes/>` 与`<Route/>`
1. v6版本中移除了先前的`<Switch>`，引入了新的替代者:`<Routes>`。
2. `<Routes>`和`<Route>`要配合使用，且必须要用`<Routes>`包裹`<Route>`。
3. `<Route>`相当于一个if语句，如果其路径与当前URL匹配，则呈现其对应的组件。
4. `<Route caseSensitive>`属性用于指定:匹配时是否区分大小写（默认为false)。
5. 当URL发生变化时，`<Routes>`都会查看其所有子`<Route>`元素以找到最佳匹配并呈现组件。
6. `<Route>`也可以嵌套使用，且可配合useRoutes()配置“路由表”，但需要通过`<outlet>`组件来渲染其子路由。
7. 示例代码:
```jsx
<Routes>
  /*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/
  <Route path="/login" element={<Login />}></Route>

  /*用于定义嵌套路由，home是一级路由，对应的路径/home*/
  <Route path="home" element=f<Home />}>
    /*test1和 test2是二级路由,对应的路径是/home/test1或/home/test2*/
    <Route path="test1" element={<Test />}></Route>
    <Route path="test2" element={<Test2 />}></Route>
  </Route>
</Routes>
```

##### 4. `<Navigate>`
1. 作用:只要`<Navigate>`组件被渲染，就会修改路径，切换视图。
2. replace属性用于控制跳转模式(push 或 replace，默认是push)。
3. 示例代码:
```jsx
import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'

export default function About () {
  const [num, setNum] = useState(0)

  function add(params) {
    setNum(num + params)
  }

  return (
    <div className='content'>about
      {num !== 4 ? <h2>num的值为{num}</h2> : <Navigate to="/home" replace={true}/> }
      <button onClick={() => add(2)}>点击+2</button>
    </div>
  )
}
```

##### NavLink 高亮
```jsx
export default function App () {
  function computedActiveName ({isActive}) {
    return isActive ? 'activeLink' : ''
  }
  return (
    <div>
      <div>
        <NavLink to='/home' className={computedActiveName}>去home</NavLink>
        <NavLink to='/about' className={computedActiveName}>去about</NavLink>
      </div>
      <Routes>
        <Route path='/' element={<Navigate to="/about"/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}
```

##### useRoutes 路由表的使用
在src下新建一个文件夹routes，routes文件夹下新建文件index.js
```js
import About from '../About'
import Home from '../Home'

import {Navigate} from 'react-router-dom'

const routes = [
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/about',
    element: <Navigate to="/about" />
  },
]

export default routes
```

注册路由
```jsx
import {NavLink, useRoutes} from 'react-router-dom'
import routes from './routes'

export default function App () {
  function computedActiveName ({isActive}) {
    return isActive ? 'activeLink link' : 'link'
  }
  const element = useRoutes(routes)
  return (
    <div>
      <div>
        <NavLink to='/home' className={computedActiveName}>去home</NavLink>
        <NavLink to='/about' className={computedActiveName}>去about</NavLink>
      </div>
      {/* <Routes>
        <Route path='/' element={<Navigate to="/about"/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes> */}
      { element }
    </div>
  )
}
```

##### 嵌套路由

路由表：
```js
import About from '../About'
import Home from '../Home'
import Message from '../Home/Message'
import News from '../Home/News'

import {Navigate} from 'react-router-dom'

const routes = [
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: 'news',
        element: <News />
      },
      {
        path: 'message',
        element: <Message />
      },
    ]
  },
  {
    path: '/about',
    element: <Navigate to="/about" />
  },
]

export default routes
```

```jsx
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Home () {
  return (
    <div className='content'>Home <br />
      <NavLink to='news' className='news_link'>news</NavLink>
      <NavLink to='message' className='news_link'>message</NavLink>
      <Outlet />
    </div>
  )
}
```

```jsx
<NavLink to='/home' className={computedActiveName} end>去home</NavLink>
```

备注： 
1. `<Outlet />`相当于vue中的`<router-view />`
2. 父路由NavLink添加end属性，点击子路由，父路由的高亮消失

##### 路由传参
###### params
路由表：
```js
{
  path: 'message',
  element: <Message />,
  children: [
    {
      path: 'detail/:id/:title/:content',
      element: <Detail />
    },
  ]
},
```

父路由：
```jsx
import React, {useState} from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Message() {
  const [messageList] = useState([
    {id: '001', title: '消息1', content: '锄禾日当午'},
    {id: '002', title: '消息2', content: '汗滴禾下土'},
    {id: '003', title: '消息3', content: '谁知盘中餐'},
    {id: '004', title: '消息4', content: '粒粒皆辛苦'},
  ])
  return (
    <div>message.......<br />
      <ul>
        {
          messageList.map(item => {
            return (
              <li key={item.id}>
                <Link to={`detail/${item.id}/${item.title}/${item.content}`}>{item.title}</Link>
              </li>
            )
          })
        }
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
```

子路由
```jsx
import React from 'react'
import { useParams, useMatch } from 'react-router-dom'

export default function Detail() {
  const {id, title, content} = useParams()
  // const match = useMatch('/home/message/detail/:id/:title/:content')
  // console.log(match)
  return (
    <div>
      <ul>
        <li>消息键值：{id}</li>
        <li>消息标题：{title}</li>
        <li>消息内容：{content}</li>
      </ul>
    </div>
  )
}
```

###### search
父路由：
```jsx
  <li key={item.id}>
    <Link to={`detail?id=${item.id}&title=${item.title}&content=${item.content}`}>{item.title}</Link>
  </li>
```

子路由：
```jsx
import React from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'

export default function Detail() {
  const [search, setSearch] = useSearchParams()
  const id = search.get('id')
  const title = search.get('title')
  const content = search.get('content')

  // const x = useLocation()
  // console.log(x)
  /*
    {
      "pathname": "/home/message/detail",
      "search": "?id=007&title=%E6%9B%B4%E6%94%B9search&content=%E6%9B%B4%E6%94%B9search",
      "hash": "",
      "state": null,
      "key": "z9khz9rk"
    }
  */
  return (
    <div>
      <ul>
        <li>消息键值：{id}</li>
        <li>消息标题：{title}</li>
        <li>消息内容：{content}</li>
      </ul>
      <button onClick={() => setSearch('id=007&title=更改search&content=更改search')}>更改search</button>
    </div>
  )
}
```

###### state
父路由：
```jsx
<ul>
  {
    messageList.map(item => {
      return (
        <li key={item.id}>
          <Link to="detail"
            state={{
              id: item.id,
              title: item.title,
              content: item.content,
            }}
          >{item.title}</Link>
        </li>
      )
    })
  }
</ul>
```

子路由：
```jsx
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Detail() {
  const {state: {id, title, content}} = useLocation()
  return (
    <div>
      <ul>
        <li>消息键值：{id}</li>
        <li>消息标题：{title}</li>
        <li>消息内容：{content}</li>
      </ul>
    </div>
  )
}
```

##### 函数式路由跳转
案例1：
```jsx
import { Link, Outlet, useNavigate } from 'react-router-dom'

...
const navigator = useNavigate()
function seeDetail(item) {
  navigator('detail', { // params和search参数在后面拼接detail?id=1&title=2
    replace: false,
    state: {
      id: item.id,
      title: item.title,
      content: item.content,
    }
  })
}
...

<li key={item.id}>
  <button onClick={() => seeDetail(item)}>查看消息</button>
</li>
```

案例2：
```jsx
import { useNavigate } from 'react-router-dom'

export default function Demo(){
  const navigator = useNavigate()

  function forward(){
    navigator(1)
  }
  function back(){
    navigator(-1)
  }
  
  return (
    <div>
      <button onClick={forward}>前进</button>
      <button onClick={back}>后退</button>
    </div>
  )
}
```

##### 7.uselnRouterContext()
作用:如果组件在`<Router>`的上下文中呈现，则useInRouterContext钩子返回true，否则返回false。
译：当前组件是否被`<BrowserRouter></BrowserRouter>`或者`<HashRouter></HashRouter>`包裹

##### 8. useNavigationType()
1. 作用:返回当前的导航类型（用户是如何来到当前页面的)。
2. 返回值:POP、PUSH、 REPLACE。
3. 备注:POP是指在浏览器中直接打开了这个路由组件（刷新页面)。

##### 9.useOutlet()
1. 作用:用来呈现当前组件中渲染的嵌套路由。
2. 示例代码:
```jsx
const result = useoutlet()
console.log(result)
//如果嵌套路由没有挂载,则result为null
//如果嵌套路由已经挂载,则展示嵌套的路由对象
```

##### 10.useResolvedPath()
1.作用:给定一个URL值，解析其中的: path、search、hash值。
