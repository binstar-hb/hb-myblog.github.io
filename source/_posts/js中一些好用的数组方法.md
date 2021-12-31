---
title: js中一些好用的数组方法
date: 2021-10-04 18:30:25
tags: 数组方法
categories: javaScript
---

##### 1、some()

**语法：**

```
array.some(function(currentValue,index,arr),thisValue)
```

```
//把10修改成20
var ages = [5, 32, 7, 10, 33, 12, 40];
ages.some(function (currentValue, index) {
  if (currentValue === 10) {
    ages[index] = 20
    return true
  }
  console.log(index);
})

console.log(ages);

//把10修改成20 箭头函数
var ages = [5, 32, 7, 10, 33, 12, 40];
ages.some((item, index) => {
  if (item === 10) {
    ages[index] = 20
    return true
  }
  console.log(index);
})

console.log(ages);
```

##### 2、every()

**语法：**

```
array.every(function(currentValue,index,arr), thisValue)
```

```
//判断每个元素的值是否都大于4
var ages = [5, 32, 7, 10, 33, 12, 40];

var res = ages.some(function (currentValue) {
  return currentValue > 4
})
console.log(res);
//输出：true

//箭头函数
var res = ages.some(item => item > 4)
console.log(res);
//-------------------------
var arr = [ 1, 2, 3, 4, 5, 6 ]; 

var every = arr.every( function( val, index, arr){
    console.log( 'val：' + val); //打印1，不会打印2、3、4、5、6

    return val > 4; 
}); 

console.log(every); //返回false
```

##### 3、reduce()

**语法：**

```
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
total：必需。初始值, 或者计算结束后的返回值。
currentValue：	必需。当前元素
currentIndex：可选。当前元素的索引
arr：可选。当前元素所属的数组对象。
initialValue：可选。传递给函数的初始值
```

```
//计算所有元素的和
var numbers = [15.5, 2.3, 1.1, 4.7];
var res = numbers.reduce(function (total, currentValue) {
  return total += currentValue
}, 0)

console.log(res);
//23.6

//计算大于4的元素的和
var result = numbers.filter(item => item > 4).reduce((total, item) => total += item, 0)
console.log(result);
//20.2
```

##### 4、includes()

**语法：**

```
arr.includes(searchElement)
arr.includes(searchElement, fromIndex)
```

```
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```

