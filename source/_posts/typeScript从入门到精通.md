---
title: typescript从入门到精通
date: 2022-01-15 16:52:49
tags: typescript
categories: typescript
---

#### typescript简介

typescript是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持,它是由微软开发，并且在 github上开源。

没错，它是由微软出的，在typescript中能找到很多.net的影子。比如接口，泛型，面向对象等。像当前比较流行的angular，Vue都是基于typescript开发的。所以学习typescript已是迫在眉睫了。

众所周知，前端的核心技术javascript是一个弱类型的解释型的语言,那么既然前端有了js，为何又出现了typescript呢？

由于javascript是弱类型的语言，我们通过var定义的变量可以去赋值成任意类型的值。这就难免会出现以下这种情况。

![image.png](https://ae04.alicdn.com/kf/H37f9c75a13a64151ba204da39a431908r.png)

这里我通过原生的js实现了一个简单的加法计算，从效果图上可以看出来，它计算的结果好像有些问题， 1+1=11？

这个问题其实也很好理解，稍等有点基础的童鞋就应该能看出来，这是因为在input中的value值是一个字符串类型的，两个字符串相加，结果显而易见肯定是 1+1=11了。

其实我们的需求很明确，需要做两个数的相加。返回它们的类型为一个浮点型。那么这时候就已经带了我们接下来的一个知识点。

#### typescript中的类型

要使用typescript，我们需要在nodejs环境下全局安装typescript

```js
npm install typescript -g
```

安装完成后，我们可能使用tsc（typescript compile）命令来编译typescript，我们可以使用tsc -v来查看typescript的版本

```
tsc -v
```

typescript的后缀名为.ts，我们先来写一个typescript文件先看看它的类型

```typescript
var str:string = '123'
var num:Number = 123
```

我分别定义了字符串类型的number类型的两个变量，在变量的后面 :type 我们可以给一个变量去规定它的类型。

再来看一个错误的写法

![image.png](https://ae02.alicdn.com/kf/Hff27da5ce13a496e95bd191b0888e5bc2.png)

我定义的变量是number类型，然后却像Js中给了任意类型的，结果，可以看到，typescript在还未编译的时候就开始抛出异常了。提示我们要给num值为number类型的值。

其实这些在一些强类型的语言(java,C#,C++等)中都有这种语法提示。

我们再来编译一下这个ts文件，看看编译后的文件长什么样

![image.png](https://ae01.alicdn.com/kf/Hf608b0687ae74c04890d634368029d008.png)

生成了demo1.js，看到demo1.js就是我们熟知的Js了。

在typescript中，如果一个变量可以是多个类型，比如这样

```typescript
var anything: Number | string = '1234'
var anything1: Number | string = 1234
```

我们可以通过 | 来设置多个类型。

当然如果我们不知道具体的类型是什么，我们还可以使用any

```typescript
var any1 :any = '123';
var any2 :any = 123;
var any3 :any = [];
var any4 :any = {};
var any5 :any = false;
```

##### 类型推断

![image.png](https://ae04.alicdn.com/kf/Hed929ca20edb4afd993df2cea2caccc5I.png)

我定义了一个变量 s 没有指定类型，但是赋值了一个 字符串，然后，继续将这个s赋值为一个数字的时候，会发现有语法错误。

在typescript中，如果没有指定变量类型，第一次给变量赋值的类型默认就是这个变量的类型，后面如果改这个个类型，就是抛出语法错误，编译也不会通过。

##### void

值得注意的是在JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：比如这样

```typescript
function alertName(): void {
  alert('my name is bin')
}
```

void同样可以申明在变量中，但也只能赋值null或者undefined，好像没什么用~~

```typescript
let unusable :void = undefined;
let unusable1 :viod = null;
```

> 在我的印象中,JS中也用到了void这个关键字，一般用在两个地方<br>1、<a href='javascript:void(0)'></a><br>2、if(a === void 0 ) {} 这个是用来判断a 是否是undefined

```js
void 0 === undefined // true
```

值得注意的是：通过null和underfined定义的变量，可以直接赋值给number，string这些类型。但是void却不行，举个例子

```typescript
// 通过void来定义的变量
let unusable: void = undefined;
let unusable1: void = null;
var num1: number = unusable; // 报错
var num2: number = unusable1; // 报错

let un: undefined = undefined; 
var num3: number = un; // 不报错
```

##### 总结：

- typescript是js的一个超集，它是一种类似java、C# 强类型的语言，typescript本身不能在浏览器中运行，所以它需要经过编译成js后才可以。

- typescript可以为变量指定一个或多个类型。

- void关键字在typescript中的使用和注意事项。

#### 深入理解typescript中的类型

##### 1、自定义类型

当然，我们可以任意去扩展类型。比如像这样

```typescript
class Person {
  constructor(){
    
  }
}

var p:Person = new Person()
```

这里我们可以指定p的类型是一个Person，所以P后面只能是Person类的实例对象

当然，我们指定类型的时候不仅仅可以给变量定义，同样，我们可以给函数的参数定义

```typescript
function add(a:number, b:number) :number {
  return a +b;
}
```

这里我们给形参a,b分别设置了number类型，并且给了这个函数的返回值也规定了Number类型，所以在这个add方法的最后，必须返回一个number类型的结果出来。否则编译不通过。

##### 2、规定数组元素的类型

比如，我要创建一个number类型的数组，我们可以这样来做

```typescript
var arr :number [] = [1];
```

很明显，我定义了一个number类型的数组，里面只能存储Number类型的数据。比如1 ，2，3，NaN等。举个例子

```
var arr :number [] = [];

arr.push(1);
arr.push(NaN);
arr.push('123'); // 提示错误
```

我们定义了一个number类型的数组，当我们往里面push数值类型的值的时候，语法正常通过，当我们push一个字符串的时候，很明显，编辑器已经检测到了语法的错误。

阅读过vue源码的小伙伴不难看出，vue2.X也是基于typescript编写的

#### 函数的特性

其实上面我已经列举了一个函数的基本特性了，它可以针对形参和返回值进行类型控制。接来我们看下函数的其它特性

##### 1、默认参数和可选参数

先来看一个简单的示例

```typescript
function showName (name = '张三'):void {
  console.log(name)
}
showName()
```

没错，这一点和ES6完全一样，但是还没完，继续往下看

```typescript
function say(firstName: string, lastName ?: string) :string {
  return firstName + lastName
}

say('憨憨的斌哥');
say('张', '三');
```

第二个参数lastName这里我把它定义成了一个可选参数，也就是说这个参数我传可不传，我们只需要在形参后面跟一个小问号即可，这一点在C#语言中也经常被使用到。

你可能会有疑问，难道我不加问号，就像JS中一样只填一个参数不行吗？我们来验证一下

```
function say(firstName: string, lastName: string) :string {
  return firstName + lastName
}

say('憨憨的斌哥'); // 报语法错误
say('张', '三');
```

很明显，编辑器已经报语法错误了，所以这样不行。下面划重点

> **注意：由于可选参数可传可不传，所以它必须放在最后。也就是说，在可选参数后面，不可以有必填参数，否则也报语法错误**

##### 2、剩余参数

为了匹配形参和实参数量可能不一样的情况，typescript给我们提供了一个叫剩余参数的特性。

我们要对一组数组求和，这是具体是多少个我们不确定。也就是说，我们可以这样调用

sum(1,2,3) //针对1+2+3

sum(1,2,3,4)//针对1+2+3+4

```typescript
function sum(x1:number, ...args:number []) :number {
  var res:number = 0;
  res = args.reduce((prev, next) => {
    return prev + next
  }, x1)
  return res;
}

console.log(sum(1,2,3)); // 6
console.log(sum(1,2,3,4)); // 10
```

定义了一个sum函数，...args就是我们所说的剩余参数了，可以看到它是一个number类型的数组然后将这个数组进行累加。

先编译ts成js文件，然后通过node环境直接输出正常结果。

##### 3、函数的重载

这个概念在微软的C#中会被经常用到，什么意思呢？就是说，一个函数可以被多次定义，但是每次定义的参数都不一样。我们称之为函数的重载。

特点：

1. 函数名相同
2. 参数不相同

这在js中是完全不可能的，如果同一个函数名在同一作用域下被多次定义，不论参数，那么后定义的函数一定会得覆盖先定义的函数，也就是说同名函数只能存在一个。

但是JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。

在typescript中，我们可这样来定义函数的重载

```typescript
function getInfo(str: String): void;
function getInfo(num: number): void;
function getInfo(obj:any): void {
  if (typeof obj === 'string') {
    console.log(obj);
  }else if (typeof obj === 'number') {
    console.log(obj**2);
  }
}

getInfo('123');
getInfo(100);
```

前可以定义多个同名函数，且没有方法体，在最后一个函数的方法体中，我们可以针对各种不同类型的参数做不同的处理以达到方法的重载。

##### 总结

1. 我们给函数定义类型的时候，不仅仅可以是ES中的基本类型，也可以是我们定的类，对象。
2. 在typescript中，类比一下ES6，其实有很多相同的地方，但是更多微软采用了.net的编码风格，像函数的可选参数和方法的重载。在C#中都能找到相应的概念。

#### typescript中的接口

##### 1、typescript定义接口

```typescript
interface IPerson {
 firstName: string;
 lastName: string;
}
```

我们通过interface关键字来声明接口的定义，后面紧跟着的是接口的名称。一般来说有一个不成文的规定，为了增加辨识度，接口名称一般用大写的 **I** 来作为首字母，表示我这定义的是一个接口。

接口定义好了以后，就是去使用这个接口了。来看示例

```typescript
function greeter(person: IPerson) {
 return "Hello, " + person.firstName + " " + person.lastName;
}
```

当我们定义好了接口后，后续在使用接口的时候，typescript会给你们相应的提示了，这完全和C#一个亚子。

当然，如果我们不按照常理出牌，看看会发生什么？

![image.png](https://ae04.alicdn.com/kf/H2123cf961f0a4884a5de07aa50bcc242Z.png)

我添加一个age属性，typescript就迫不及待的给我一个大大的中文提示。所以，还是得按规矩办事呀。

##### 2、接口的继承

说到继承，那么首先肯定得有一个类，那么在typescript中的类，它包涵了ES6中的类的所有语法。

来看示例

```typescript
class Animal {
  public name: string;
  private age: number;
  // 这里面的public表示定义的属性为公有的，能被类的外部所访问到
  // private为私有的，只能在类的内部访问
  constructor(name:string, age:number) {
    this.name = name;
    this.age = age
  }
  eat() {
    console.log(this.name + 'eat something.');
  }
}
```

在typescript中，类是可以继承自接口的，这里需要注意的是，继承接口和继承类不一样，继承类我们是通过extends关键字，而继承接口，在typescript中使用的是 **implements** 来实现的。来看示例

```js
interface IAnaimal{
  walk(): void;
  weight: number;
}

class Animal implements IAnaimal {

  public name: string;
  private age: number;

  public weight: number;

  constructor(name:string, age:number) {
    this.name = name;
    this.age = age;
  }
}
```

注意：

- 类继承了接口，类中必须得有接口中的属性，比如这里面的weight
- 接口中定义的方法不用去写具体的实现，我们只需要定义即可。
- 类继承了接口，那么在类中必需要实现接口中的方法（所以上面的语法不能通过）

![image.png](https://ae03.alicdn.com/kf/H1489c963ac9a4763b5a96fb248334b68f.png)

把鼠标移到报错的类名上，提示出我们的类继承了接口，而没有实现接口中的方法。

所以我们只需要在类中实现walk方法即可。

##### 总结

1. 接口是用来定义规范的，里面可以有方法和属性，方法本身没有方法体
2. 类继承了接口的则必须要实现接口中的方法

#### 什么是泛型

我们知道，在typescript中， 我们可以通过类型来约束一个函数的参数和返回值。比如这样

```typescript
function getVal(val:string):string{
 return val;
}
```

这里我定义了一个函数getVal要求参数是一个string类型，返回值也是一个string类型，假设有这样一个需要，我还需要同样的一个函数，我传入一个number类型，那么结果也给我返回一个number类型。

那么这个时候，我们只能通过再定义一个方法，去单独实现这个功能了,我们可能这样去写

```typescript
function getVal1(val:number) :number{
 return val;
}
```

这样写肯定没毛病，那我如果还需要一个boolean类型的呢，我还要一个object类型的呢？难道一个个的去定义吗？

很明显造成了代码的冗余，同样的方法，我们要定义多次。

这时候有人可能会说，我们可以把这个类型定义成any呀，的确，好像确实可以，但是，这时候我们的返回值也是一个any,也就是说，我的参数和返回值的类型可能不一致。也就失去了约束的意义了。

为了解决类似的问题，typescript为我们提供一个叫泛型的概念。

也就是说我们可以将这个参数和返回值的类型定义成一个动态的，语法是这样的

```typescript
function getVal<T>(val:T) :T{
 return val;
}
```

我们可以将这个动态的类型定义成泛型，具体的类型只能通过调用该函数的时候才能确定

我们应该这样去调用该函数

```typescript
function getVal<T>(val:T):T{
  return val
}

getVal<string>('hello')

getVal<number>(1234)

getVal<boolean>(Math.random() > 0.5)

getVal<object>(Object.create(null))
```

这时候，我们可以去调用任意类型的数据了。这个类型将由函数调用的时候所决定。

##### 泛型类

可以看出来，上面的示例我们实际上写了一个泛型方法，那么同理，泛型类的定义也是一样的，来看示例

```typescript
class Person<T> {
  private list: T[] = [];

  add(val: T) {
    this.list.push(val)
  }
  reduce(index: number) {
    this.list.splice(index, 1)
  }
  
  getList(): T[]{
    return this.list
  }
}

let p = new Person<string>()
p.add('string')

let p2 = new Person<number>()
p2.add(NaN)
```

我们可以在类名或者方法名的后面紧跟泛型<T>,且我们在实例化的时候，在类的后面需要紧跟具体的类型。如上图

最后我们在调用 add方法的时候，就只能传对应的类型进去了

##### 泛型接口

```typescript
interface IPrint{
  <T>(val:T):T
}

var getData:IPrint = function <T>(val:T) :T{
  return val;
}

getData<string>('string')

getData<number>(NaN)

getData<boolean>(false)
```

这种写法可能有点难得理解，没关系，我们再换种写写吧

```typescript
interface IPrint<T>{
  (val:T):T
}

var getData<T>(val:T) :T{
  return val;
}

var val1: IPrint<string> = getData;
val1('123')

var val2: IPrint<number> = getData;
val2(NaN)

var val3: IPrint<object> = getData;
val3(Object.create(null))
```

我们可以直接将类型定义到接口名的后面,然后我们在拿到getData函数的引用的时候去约束类型为一个泛型接口的类型即可。最终在调用的时候，我们只需要传入对应的类型的值即可。

##### 总结

- 泛型接口可以看成是一个动态的类型，这种类型只能通过我们在最终的调用的时候去来确定它，作用就是可以避免代码冗余