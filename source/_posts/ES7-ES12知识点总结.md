---
title: ES7~ES12知识点总结
date: 2022-02-23 16:04:34
tags: ES6~ES12知识点
categories: javaScript
---

#### ES6

##### 解构赋值+重命名
```JS
let obj = {a:{b:1}}
const {a} = obj; //传统解构赋值
const {a:{{b}} = obj;//连续解构赋值
const {a:{b:value}} = obj;//连续解构赋值+重命名
```


#### ES2017(ES8)

##### Object.values()

Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

```js
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.values(obj)); // [ 'jimmy', 18, 188 ]
```

##### Object.entries()

Object.entries() 方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。

```js
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.entries(obj)); // [ [ 'name', 'jimmy' ], [ 'age', 18 ], [ 'height', 188 ] ]
console.log(Object.entries([1, 2, 3])); // [ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```

##### Object.getOwnPropertyDescriptors()

Object.getOwnPropertyDescriptors() 方法用来获取一个对象的所有自身属性的描述符。

```js
const obj = {
  name: "jimmy",
  age: 18,
};
const desc = Object.getOwnPropertyDescriptors(obj);
console.log(desc);
// 打印结果
{
  name: {
    value: 'jimmy',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: {
   value: 18,
   writable: true,
   enumerable: true,
   configurable: true
  }
}
```

上面打印结果中的

- value表示当前对象的默认值
- writable表示对象属性是否可以修改
- enumerable表示当前这个属性是否可以出现在对象的枚举属性中
- configurable表示当前对象的属性能否用delete删除

那这些对象的属性我们怎么设置和修改他们呢，我们可以使用es5的 Object.defineProperty()

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: true,
});
Object.defineProperty(obj, "age", {
  value: 34,
  writable: true,
  configurable: true,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy', age: 34 }
```

接下来我们演示下，一些属性设置为false的情况

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: false,
  configurable: false,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy' }
obj.name = "chimmy";
console.log(obj); // { name: 'jimmy' }
delete obj.name
console.log(obj); // { name: 'jimmy' }
```

我们可以看到设置 **writable: false**和**configurable: false**时，对象的name对象的值不能改变和不能被删除，打印出来还是原来的对象。

**设置enumerable为false时**

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: false,
});
console.log(obj); // { }
for (let key in obj) {
  console.log(key); // ""
}
```

当设置**enumerable: false**时，表示对象的属性不可被枚举，这时打印对象为空，遍历对象的键也为空。

##### String.prototype.padStart

把指定字符串填充到字符串头部，返回新字符串。

**语法**

str.padStart(targetLength [, padString])

- targetLength

当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。

- padString 可选

填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "

**示例**

```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

**应用场景**

日期格式化：yyyy-mm-dd的格式：

```js
const now = new Date()
const year = now.getFullYear()
// 月份和日期 如果是一位前面给它填充一个0
const month = (now.getMonth() + 1).toString().padStart(2, '0')
const day = (now.getDate()).toString().padStart(2, '0')
console.log(year, month, day)
console.log( `${year}-${month}-${day}` ) //输入今天的日期 2021-12-31
```

数字替换(手机号，银行卡号等）

```js
const tel = '18781268679'
const newTel = tel.slice(-4).padStart(tel.length, '*')
console.log(newTel) // *******5678
```

##### String.prototype.padEnd

把指定字符串填充到字符串尾部，返回新字符串。

```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

**应用场景**

在JS前端我们处理时间戳的时候单位是ms毫秒，但是，后端同学返回的时间戳则不一样是毫秒，可能只有10位，以s秒为单位。所以，我们在前端处理这个时间戳的时候，保险起见，要先做一个13位的补全，保证单位是毫秒。

```js
// 伪代码
console.log(new Date().getTime()) // 时间戳 13位的
timestamp = +String(timestamp).padEnd(13, '0')
```

##### 尾逗号 Trailing commas

ES8 允许函数的最后一个参数有尾逗号（Trailing comma）。此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

```js
function clownsEverywhere(
    param1,
    param2
) {
    /* ... */
}

clownsEverywhere(
    'foo',
    'bar'
)
```

上面代码中，如果在param2或bar后面加一个逗号，就会报错。

如果像上面这样，将参数写成多行（即每个参数占据一行），以后修改代码的时候，想为函数clownsEverywhere添加第三个参数，或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接可以加上一个逗号。

```js
function clownsEverywhere(
    param1,
    param2,
) {
    /* ... */
}

clownsEverywhere(
    'foo',
    'bar',
)
```

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。

##### async/await

详情见[async/await](https://binstar-hb.github.io/hb-myblog.github.io/tags/async-await/)

**async/await的缺陷**

了解Async/await是非常有用的，但还有一些缺点需要考虑。

Async/await 让你的代码看起来是同步的，在某种程度上，也使得它的行为更加地同步。 await 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样。它确实可以允许其他任务在此期间继续运行，但您自己的代码被阻塞。

这意味着您的代码可能会因为大量await的promises相继发生而变慢。每个await都会等待前一个完成，而你实际想要的是所有的这些promises同时开始处理（就像我们没有使用async/await时那样）。

有一种模式可以缓解这个问题——通过将 Promise 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕。

#### ES2018(ES9)

##### Object Rest & Spread

在 ES9 新增 Object 的 Rest & Spread 方法，直接看下示例：

```js
const input = {
  a: 1,
  b: 2,
  c: 3,
}

const output = {
  ...input,
  c: 4
}

console.log(output) // {a: 1, b: 2, c: 4}
```

这块代码展示了 spread 语法，可以把 input 对象的数据都拓展到 output 对象，这个功能很实用。需要注意的是，**如果存在相同的属性名，只有最后一个会生效**。

**注意点**:

```js
const obj = { x: { y: 10 } };
const copy1 = { ...obj };
const copy2 = { ...obj };
obj.x.y = "jimmy";
console.log(copy1, copy2); // x: {y: "jimmy"} x: {y: "jimmy"}
console.log(copy1.x === copy2.x); // → true
```

如果属性的值是一个对象的话，该对象的引用会被拷贝，而不是生成一个新的对象。

我们再来看下 Object rest 的示例：

```js
const input = {
  a: 1,
  b: 2,
  c: 3
}

let { a, ...rest } = input

console.log(a, rest) // 1 {b: 2, c: 3}
```

当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据，这在之前是做不到的。注意，**rest 属性必须始终出现在对象的末尾**，否则将抛出错误。

##### for await of

异步迭代器(for-await-of)：循环等待每个Promise对象变为resolved状态才进入下一步。

我们知道 for...of 是同步运行的，看如下代码

```js
function TimeOut(time){
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for (let item of arr) {
     console.log(Date.now(),item.then(console.log))
    }
}

test()
```
上面打印结果如下图

![image.png](https://ae05.alicdn.com/kf/H0e581f3686424e91ae9b0aed689a3180K.png)

上述代码证实了 for of 方法不能遍历异步迭代器，得到的结果并不是我们所期待的，于是 for await of 就粉墨登场啦！

**ES9 中可以用 for...await...of 的语法来操作**

```js
function TimeOut(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)]
    for await (let item of arr) {
        console.log(Date.now(), item)
    }
}
test()
// 1560092345730 2000
// 1560092345730 1000
// 1560092346336 3000
```
for await of 环等待每个Promise对象变为resolved状态才进入下一步。所有打印的结果为 2000，1000，3000

##### Promise.prototype.finally()

Promise.prototype.finally() 方法返回一个Promise，在promise执行结束时，无论结果是fulfilled或者是rejected，在执行then()和catch()后，都会执行finally指定的回调函数。这为指定执行完promise后，无论结果是fulfilled还是rejected都需要执行的代码提供了一种方式，避免同样的语句需要在then()和catch()中各写一次的情况。

**示例**

```js
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
        // reject('fail')
    }, 1000)
}).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
}).finally(() => {
    console.log('finally')
})
```

**使用场景**

loading关闭

需要每次发送请求，都会有loading提示，请求发送完毕，就需要关闭loading提示框，不然界面就无法被点击。不管请求成功或是失败，这个loading都需要关闭掉，这时把关闭loading的代码写在finally里再合适不过了

##### String 扩展

放松对标签模板里字符串转义的限制, 遇到不合法的字符串转义会返回undefined，并且从raw上可获取原字符串。

ES9开始，模板字符串允许嵌套支持常见转义序列，移除对ECMAScript在带标签的模版字符串中转义序列的语法限制。

```js
function foo(a, b, c) {
    console.log(a, b, c)
}
// 在标签函数中使用
// unicode字符\u{61} 对应的值为 a
// unicode字符\u{62} 对应的值为 b
// \unicode 是一个无效的unicode字符
foo `\u{61} and \u{62}`
foo `\u{61} and \unicode`
```

![image.png](https://ae05.alicdn.com/kf/Hf0feae4c467145b68218579fbfb0e8a7f.png)

**注意点**

在模板字符串中，如果输入无效的unicode字符，还是会报错。只有在便签模板中 从es9开始才不会报错。

```js
let string = `\u{61} and \unicode`;
console.log(string); // Uncaught SyntaxError: Invalid Unicode escape sequence
```

#### ES2019(ES10)

##### Object.fromEntries()

方法 Object.fromEntries() 把键值对列表转换为一个对象，这个方法是和 Object.entries() 相对的。

```js
Object.fromEntries([
    ['foo', 1],
    ['bar', 2]
])
// {foo: 1, bar: 2}
```

**案例1：Object 转换操作**

```js
const obj = {
    name: 'jimmy',
    age: 18
}
const entries = Object.entries(obj)
console.log(entries)
// [Array(2), Array(2)]

// ES10
const fromEntries = Object.fromEntries(entries)
console.log(fromEntries)
// {name: "jimmy", age: 18}
```

**案例2：Map 转 Object**

```js
const map = new Map()
map.set('name', 'jimmy')
map.set('age', 18)
console.log(map) // {'name' => 'jimmy', 'age' => 18}

const obj = Object.fromEntries(map)
console.log(obj)
// {name: "jimmy", age: 18}
```

**案例3：过滤**

course表示所有课程，想请求课程分数大于80的课程组成的对象：

```js
const course = {
    math: 80,
    english: 85,
    chinese: 90
}
const res = Object.entries(course).filter(([key, val]) => val > 80)
console.log(res) // [ [ 'english', 85 ], [ 'chinese', 90 ] ]
console.log(Object.fromEntries(res)) // { english: 85, chinese: 90 }
```

**案例4：url的search参数转换**

```js
// let url = "https://www.baidu.com?name=jimmy&age=18&height=1.88"
// queryString 为 window.location.search
const queryString = "?name=jimmy&age=18&height=1.88";
const queryParams = new URLSearchParams(queryString);
const paramObj = Object.fromEntries(queryParams);
console.log(paramObj); // { name: 'jimmy', age: '18', height: '1.88' }
```

##### Array.prototype.flat()

**语法**

```js
let newArray = arr.flat([depth])
```

- depth 可选

指定要提取嵌套数组的结构深度，默认值为 1。

**示例**

flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```js
const arr1 = [0, 1, 2, [3, 4]];
console.log(arr1.flat());  //  [0, 1, 2, 3, 4]
const arr2 = [0, 1, 2, [[[3, 4]]]];
console.log(arr2.flat(2));  //  [0, 1, 2, [3, 4]]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// `flat()` 方法会移除数组中的空项:
var arr5 = [1, 2, , 4, 5];
arr5.flat(); // [1, 2, 4, 5]
```

##### Array.prototype.flatMap()

flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。从方法的名字上也可以看出来它包含两部分功能一个是 map，一个是 flat（深度为1）。

**语法**

```js
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```

- <font color=blue>callback</font>

可以生成一个新数组中的元素的函数，可以传入三个参数

<font color=blue>currentValue</font>

当前正在数组中处理的元素

<font color=blue>index</font>

可选 数组中正在处理的当前元素的索引。

<font color=blue>array</font>

可选 被调用的 map 数组

- <font color=blue>thisArg</font>可选

执行 callback 函数时 使用的this 值。

**示例**

```js
const numbers = [1, 2, 3]
numbers.map(x => [x * 2]) // [[2], [4], [6]]
numbers.flatMap(x => [x * 2]) // [2, 4, 6]
```

这个示例可以简单对比下 map 和 flatMap 的区别。当然还可以看下下面的示例：

```js
let arr = ['今天天气不错', '', '早上好']
arr.map(s => s.split(''))
// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
arr.flatMap(s => s.split(''))
// ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]
```

flatMap 方法与 map 方法和深度depth为1的 flat 几乎相同。

##### String.prototype.trimStart()

trimStart() 方法从字符串的开头删除空格，trimLeft()是此方法的别名

```js
let str = '   foo  '
console.log(str.length) // 8
str = str.trimStart() // 或str.trimLeft()
console.log(str.length) // 5
```

##### String.prototype.trimEnd()

trimEnd() 方法从一个字符串的右端移除空白字符，trimRight 是 trimEnd 的别名。

```js
let str = '   foo  '
console.log(str.length) // 8
str = str.trimEnd() // 或str.trimRight()
console.log(str.length) // 6
```

##### 可选的Catch Binding

在 ES10 之前我们都是这样捕获异常的：

```js
try {
    // tryCode
} catch (err) {
    // catchCode
}
```

在这里 err 是必须的参数，在 ES10 可以省略这个参数：

```js
try {
    console.log('Foobar')
} catch {
    console.error('Bar')
}
```

**应用**

> 验证参数是否为json格式

这个需求我们只需要返回true或false，并不关心catch的参数。

```js
const validJSON = json => {
  try {
    JSON.parse(json)
    return true
  } catch {
    return false
  }
}
```

##### Symbol.prototype.description

我们知道，Symbol 的描述只被存储在内部的 Description ，没有直接对外暴露，我们只有调用 Symbol 的 toString() 时才可以读取这个属性：

```js
const name = Symbol('es')
console.log(name.toString()) // Symbol(es)
console.log(name) // Symbol(es)
console.log(name === 'Symbol(es)') // false
console.log(name.toString() === 'Symbol(es)') // true
```

现在可以通过 description 方法获取 Symbol 的描述:

```js
const name = Symbol('es')
console.log(name.description) // es
name.description = "es2" // 只读属性 并不能修改描述符
console.log(name.description === 'es') // true
// 如果没有描述符 输入undefined
const s2 = Symbol()
console.log(s2.description) // undefined
```

##### JSON.stringify() 增强能力

JSON.stringify 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题。因为 JSON 都是被编码成 UTF-8，所以遇到 0xD800–0xDFFF 之内的字符会因为无法编码成 UTF-8 进而导致显示错误。在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。

```js
// \uD83D\uDE0E  emoji 多字节的一个字符
console.log(JSON.stringify('\uD83D\uDE0E')) // 打印出笑脸

// 如果我们只去其中的一部分  \uD83D 这其实是个无效的字符串
// 之前的版本 ，这些字符将替换为特殊字符，而现在将未配对的代理代码点表示为JSON转义序列
console.log(JSON.stringify('\uD83D')) // "\ud83d"
```

##### 修订 Function.prototype.toString()

以前函数的toString方法来自Object.prototype.toString(),现在的 Function.prototype.toString() 方法返回一个表示当前函数源代码的字符串。以前只会返回这个函数，不包含注释、空格等。

```js
function foo() {
    // es10新特性
    console.log('imooc')
}
console.log(foo.toString())
// 打印如下
// function foo() {
//  // es10新特性
//  console.log("imooc");
// }
```

#### ES2020(ES11)

##### 空值合并运算符（Nullish coalescing Operator）

空值合并操作符（ ?? ）是一个逻辑操作符，当左侧的操作数为 null或者undefined时，返回其右侧操作数，否则返回左侧操作数。

```js
const foo = undefined ?? "foo"
const bar = null ?? "bar"
console.log(foo) // foo
console.log(bar) // bar
```

与逻辑或操作符（||）不同，逻辑或操作符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 || 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如'',0,NaN,false）时。见下面的例子。

```js
const foo = "" ?? 'default string';
const foo2 = "" || 'default string';
console.log(foo); // ""
console.log(foo2); // "default string"

const baz = 0 ?? 42;
const baz2 = 0 || 42;
console.log(baz); // 0
console.log(baz2); // 42
```

**注意点**

将 ?? 直接与 AND（&&）和 OR（||）操作符组合使用是不可取的。

```js
null || undefined ?? "foo"; // 抛出 SyntaxError
true || undefined ?? "foo"; // 抛出 SyntaxError
```

##### 可选链 Optional chaining

**可选链**操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为 <font color=blue>null</font> 或者 <font color=blue>undefined</font> 的情况下不会引起错误，该表达式短路返回值是 <font color=blue>undefined</font>。与函数调用一起使用时，如果给定的函数不存在，则返回 <font color=blue>undefined</font>。

当尝试访问可能不存在的对象属性时，可选链操作符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链操作符也是很有帮助的。

```js
const user = {
  address: {
    street: 'xx街道',
    getNum() {
      return '80号'
    }
  }
}
```

在之前的语法中，想获取到深层属性或方法，不得不做前置校验，否则很容易命中 Uncaught TypeError: Cannot read property... 这种错误，这极有可能让你整个应用挂掉。

```js
const street = user && user.address && user.address.street
const num = user && user.address && user.address.getNum && user.address.getNum()
console.log(street, num)
```

用了 Optional Chaining ，上面代码会变成

```js
const street2 = user?.address?.street
const num2 = user?.address?.getNum?.()
console.log(street2, num2)
```

可选链中的 ? 表示如果问号左边表达式有值, 就会继续查询问号后面的字段。根据上面可以看出，用可选链可以大量简化类似繁琐的前置校验操作，而且更安全。

**常见用法**

```js
// 对象中使用
let obj = {
  name: "jimmy",
  age: "18",
};
let property = "age";
let name = obj?.name;
let age = obj?.age;
let ages = obj?.[property];
let sex = obj?.sex;
console.log(name); // jimmy
console.log(age); // 18
console.log(ages); // 18
console.log(sex); // undefined

// 数组中使用
let arr = [1,2,2];
let arrayItem = arr?.[42]; // undefined

// 函数中使用
let obj = {
  func: function () {
    console.log("I am func");
  },
};
obj?.func(); // I am func
```

**与空值合并操作符一起使用**

```js
let customer = {
  name: "jimmy",
  details: { age: 18 }
};
let customerCity = customer?.city ?? "成都";
console.log(customerCity); // "成都"
```

**注意点**

> 可选链不能用于赋值

```js
let object = {};
object?.property = 1; // Uncaught SyntaxError: Invalid left-hand side in assignment
```

##### globalThis

在以前，从不同的 JavaScript 环境中获取全局对象需要不同的语句。在 Web 中，可以通过 window、self 取到全局对象，在 Node.js 中，它们都无法获取，必须使用 global。

在松散模式下，可以在函数中返回 this 来获取全局对象，但是在严格模式和模块环境下，this 会返回 undefined。

以前想要获取全局对象，可通过一个全局函数

```js
const getGlobal = () => {
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof global !== 'undefined') {
    return global
  }
  throw new Error('无法找到全局对象')
}

const globals = getGlobal()
console.log(globals)
```

现在globalThis 提供了一个标准的方式来获取不同环境下的全局 this 对象（也就是全局对象自身）。不像 window 或者 self 这些属性，它确保可以在有无窗口的各种环境下正常工作。所以，你可以安心的使用 globalThis，不必担心它的运行环境。

为便于记忆，你只需要记住，全局作用域中的 this 就是globalThis。以后就用globalThis就行了。

##### BigInt

BigInt 是一种内置对象，它提供了一种方法来表示大于 2的53次方 - 1 的整数。这原本是 Javascript中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。

**使用 BigInt 有两种方式:**

- **方式一：数字后面增加n**

```js
const bigInt = 9007199254740993n
console.log(bigInt)
console.log(typeof bigInt) // bigint

// `BigInt` 和 [`Number`]不是严格相等的，但是宽松相等的。
console.log(1n == 1) // true
console.log(1n === 1) // false

// `Number` 和 `BigInt` 可以进行比较。
1n < 2 // ↪ true
2n > 1 // ↪ true
```

- **方式二：使用 BigInt 函数**

```js
const bigIntNum = BigInt(9007199254740993n)
console.log(bigIntNum)
```

**运算**

```js
let number = BigInt(2);
let a = number + 2n; // 4n
let b = number * 10n; // 20n
let c = number - 10n; // -8n
```

**注意点**

BigInt不能用于 [Math] 对象中的方法；不能和任何 [Number] 实例混合运算，两者必须转换成同一种类型。在两种类型来回转换时要小心，因为 BigInt 变量在转换成 [Number] 变量时可能会丢失精度。

##### String.prototype.matchAll()

**<font color=blue>matchAll()</font>** 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

```js
const regexp = /t(e)(st(\d?))/g;
const str = 'test1test2';

const array = [...str.matchAll(regexp)];
console.log(array[0]);  // ["test1", "e", "st1", "1"]
console.log(array[1]); // ["test2", "e", "st2", "2"]
```

##### Promise.allSettled()

我们都知道 Promise.all() 具有并发执行异步任务的能力。但它的最大问题就是如果其中某个任务出现异常(reject)，所有任务都会挂掉，Promise直接进入reject 状态。

场景：现在页面上有三个请求，分别请求不同的数据，如果一个接口服务异常，整个都是失败的，都无法渲染出数据

我们需要一种机制，如果并发任务中，无论一个任务正常或者异常，都会返回对应的的状态，这就是Promise.allSettled的作用

```js
const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise1");
      //   reject("error promise1 ");
    }, 3000);
  });
};
const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
      //   reject("error promise2 ");
    }, 1000);
  });
};
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   resolve("promise3");
      reject("error promise3 ");
    }, 2000);
  });
};

//  Promise.all 会走到catch里面
Promise.all([promise1(), promise2(), promise3()])
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log("error", error); // error promise3
  });

// Promise.allSettled 不管有没有错误，三个的状态都会返回
Promise.allSettled([promise1(), promise2(), promise3()])
  .then((res) => {
    console.log(res);
    // 打印结果
    // [
    //    {status: 'fulfilled', value: 'promise1'},
    //    {status: 'fulfilled',value: 'promise2'},
    //    {status: 'rejected', reason: 'error promise3 '}
    // ]
  })
  .catch((error) => {
    console.log("error", error);
  });
```

##### Dynamic Import（按需 import）

import()可以在需要的时候，再加载某个模块。

```js
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

上面代码中，import()方法放在click事件的监听函数之中，只有用户点击了按钮，才会加载这个模块。

#### ES2021(ES12)

##### 逻辑运算符和赋值表达式（&&=，||=，??=）

##### &&=

逻辑与赋值 x &&= y等效于：

```js
x && (x = y);
```

上面的意思是，当x为真时，x=y。具体请看下面的示例:

##### ||=

逻辑或赋值（x ||= y）运算仅在 x 为false时赋值。

```js
const a = { duration: 50, title: '' };

a.duration ||= 10;
console.log(a.duration); // 50

a.title ||= 'title is empty.';
console.log(a.title); // "title is empty"
```

##### ??=

逻辑空赋值运算符 (x ??= y) 仅在 x 是 nullish[3] (null 或 undefined) 时对其赋值。

x ??= y 等价于：x ?? (x = y);

**示例一**

```js
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration); // 50

a.speed ??= 25;
console.log(a.speed); // 25
```

**示例二**

```js
function config(options) {
  options.duration ??= 100;
  options.speed ??= 25;
  return options;
}

config({ duration: 125 }); // { duration: 125, speed: 25 }
config({}); // { duration: 100, speed: 25 }
```

##### String.prototype.replaceAll()

**介绍**

replaceAll() 方法返回一个新字符串，新字符串中所有满足 pattern 的部分都会被replacement 替换。pattern可以是一个字符串或一个RegExp，replacement可以是一个字符串或一个在每次匹配被调用的函数。

原始字符串保持不变。

**示例**

```js
'aabbcc'.replaceAll('b', '.'); // 'aa..cc'
```

使用正则表达式搜索值时，它必须是全局的。

```js
'aabbcc'.replaceAll(/b/, '.');
TypeError: replaceAll must be called with a global RegExp
```

这将可以正常运行:

```js
'aabbcc'.replaceAll(/b/g, '.');
"aa..cc"
```

##### 数字分隔符

欧美语言中，较长的数值允许每三位添加一个分隔符（通常是一个逗号），增加数值的可读性。比如，1000可以写作1,000。

ES2021中允许 JavaScript 的数值使用下划线（_）作为分隔符。

```js
let budget = 1_000_000_000_000;
budget === 10 ** 12 // true
```

这个数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。

```js
123_00 === 12_300 // true

12345_00 === 123_4500 // true
12345_00 === 1_234_500 // true
```

小数和科学计数法也可以使用数值分隔符。

```js
// 小数
0.000_001

// 科学计数法
1e10_000
```

数值分隔符有几个使用注意点。

- 不能放在数值的最前面（leading）或最后面（trailing）。
- 不能两个或两个以上的分隔符连在一起。
- 小数点的前后不能有分隔符。
- 科学计数法里面，表示指数的e或E前后不能有分隔符。

##### Promise.any

方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

```js
const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise1");
      //  reject("error promise1 ");
    }, 3000);
  });
};
const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
      // reject("error promise2 ");
    }, 1000);
  });
};
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
      // reject("error promise3 ");
    }, 2000);
  });
};
Promise.any([promise1(), promise2(), promise3()])
  .then((first) => {
    // 只要有一个请求成功 就会返回第一个请求成功的
    console.log(first); // 会返回promise2
  })
  .catch((error) => {
    // 所有三个全部请求失败 才会来到这里
    console.log("error", error);
  });
```

只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。

Promise.any()跟Promise.race()方法很像，只有一点不同，就是Promise.any()不会因为某个 Promise 变成rejected状态而结束，必须等到所有参数 Promise 变成rejected状态才会结束。