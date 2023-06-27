---
title: js数组去重方法
date: 2021-10-13 20:45:28
tags: js数组去重方法
categories: javaScript
---

##### 1.将数组的每一个元素依次与其他元素做比较，发现重复元素，删除

```js
var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5,5,5,5];
    console.log(arr);    //[1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5, 5, 5, 5]
    function noRepeat1(arr) {
        for(var i = 0; i < arr.length-1; i++){
            for(var j = i+1; j < arr.length; j++){
                if(arr[i]===arr[j]){
                    arr.splice(j,1);
                    j--;
                }
            }
        }
        return arr;
    }
    var arr2 = noRepeat1(arr);
    console.log(arr2);    //[1, 23, 3, 5, 6, 7, 9, 8]
```

##### 2.借助<font color=red>indexOf()</font >方法判断此元素在该数组中首次出现的位置下标与循环的下标是否相等

```js
var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5,5,5];
    console.log(arr);    //[1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5, 5, 5]
    function noRepeat2(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr.indexOf(arr[i]) != i) {
                arr.splice(i,1);//删除数组元素后数组长度减1后面的元素前移
                i--;//数组下标回退
            }
        }
        return arr;
    }
    var newArr = noRepeat2(arr);
    console.log(newArr);    //[1, 23, 3, 5, 6, 7, 9, 8]
```

##### 3.利用数组中的<font color=red>filter</font>方法

```js
var arr = ['apple','banana','pear','apple','orange','orange'];
console.log(arr)    //["apple", "banana", "pear", "apple", "orange", "orange"]
var newArr = arr.filter(function(value,index,self){
    return self.indexOf(value) === index;
});
console.log(newArr);    //["apple", "banana", "pear", "orange"]
```

##### 4.借助<font color=red>新数组</font> 通过indexOf方判断当前元素在数组中的索引如果与循环的下标相等则添加到新数组中

```js
var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5,5,5];
    console.log(arr)    //[1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5, 5, 5]
    function noRepeat4(arr) {
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr.indexOf(arr[i]) == i) {
                ret.push(arr[i]);
            }
        }
        return ret;
    }
    var arr2 = noRepeat4(arr);
    console.log(arr2);    //[1, 23, 3, 5, 6, 7, 9, 8]
```

##### 5.利用<font color=red>空对象</font>来记录新数组中已经存储过的元素

```js
var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
    console.log(arr)    //[1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5]
    var obj={};
    var newArr=[];
    for(var i=0;i<arr.length;i++){
        if(!obj[arr[i]]){
            obj[arr[i]]=true;
            newArr.push(arr[i]);
        }
    }
    console.log(newArr);    //[1, 23, 3, 5, 6, 7, 9, 8]
```

##### 6.借助新数组，判断新数组中是否存在该元素如果不存在则将此元素添加到新数组中

```js
var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
    console.log(arr);    //[1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5]
    function noRepeat6(arr){
        var newArr = [];
        for(var i = 0; i < arr.length; i++){
            if(newArr.indexOf(arr[i]) == -1){
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }
    var arr2 = noRepeat6(arr);
    console.log(arr2);    //[1, 23, 3, 5, 6, 7, 9, 8]
```

##### 7.借助新数组，判断新数组中是否存在该元素如果不存在则将此元素添加到新数组中（原数组长度不变但被按字符串顺序排序）

```js
var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
    console.log(arr);    //[1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5]
    function noRepeat7(arr) {
        var ret = [],
            end;//临时变量用于对比重复元素
        arr.sort();//将数重新组排序
        end = arr[0];
        ret.push(arr[0]);
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] != end) {//当前元素如果和临时元素不等则将此元素添加到新数组中
                ret.push(arr[i]);
                end = arr[i];
            }
        }
        return ret;
    }
    var arr2 = noRepeat7(arr);
    console.log(arr2);    //[1, 23, 3, 5, 6, 7, 8, 9]
```

##### 8.此方法没有借助新数组直接改变原数组,并且去重后的数组被排序

```js
var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
    console.log(arr);    //[1, 23, 1, 1, 1, 3, 23, 5, 6, 7, 9, 9, 8, 5]
    function noRepeat8(arr) {
        var end;//临时变量用于对比重复元素
        arr.sort();//将数重新组排序
        end = arr[0];
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] == end) {//当前元素如果和临时元素相等则将此元素从数组中删除
                arr.splice(i,1);
                i--;
            }else{
                end = arr[i];
            }
        }
        return arr;
    }
    var arr2 = noRepeat8(arr);
    console.log(arr2);    //[1, 23, 3, 5, 6, 7, 8, 9]
```

##### 9.<font color=red>双层循环</font>改变原数组

```js
var arr = [1,1,2,2,3,3,4,4,5,5,4,3,1,2,6,6,6,6];
    console.log(arr);    //[1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 4, 3, 1, 2, 6, 6, 6, 6]
    function noRepeat9(arr){
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                if (arr[i] == arr[j] && i != j) {//将后面重复的数删掉
                    arr.splice(j, 1);
                }
            }
        }
        return arr;
    }
    var arr2  = noRepeat9(arr);
    console.log(arr2);    //[1, 2, 3, 4, 5, 6]
```

##### 10.借助新数组

```js
var arr = [1,1,2,2,3,3,4,4,5,5,4,3,2,1,1,1];
    console.log(arr);    //[1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 4, 3, 2, 1, 1, 1]
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var repArr = [];//接收重复数据后面的下标
        //内层循环找出有重复数据的下标
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                repArr.push(j);//找出后面重复数据的下标
            }
        }
        //console.log(repArr);
        if (repArr.length == 0) {//若重复数组没有值说明其不是重复数据
            newArr.push(arr[i]);
        }
    }
    console.log(newArr);    //[5, 4, 3, 2, 1]
```

##### 11.借助ES6提供的<font color=red>Set</font>结构

```js
var arr = [1,1,2,2,3,3,4,4,5,5,4,3,2,1,1,1];
    console.log(arr);    //[1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 4, 3, 2, 1, 1, 1]
    function noRepeat11(arr){
        var newArr = [];
        var myset = new Set(arr);//利用了Set结构不能接收重复数据的特点
        for(var val of myset){
            newArr.push(val)
        }
        return newArr;
    }
    var arr2 = noRepeat11(arr)
    console.log(arr2);    //[1, 2, 3, 4, 5]
```

