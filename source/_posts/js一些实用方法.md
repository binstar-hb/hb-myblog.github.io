---
title: js一些实用方法
date: 2022-03-03 11:13:24
tags:
---

##### 采用合理的数据处理算法

```js
/**
 * 数组转树形结构,时间复杂度O(n)
 * @param list 数组
 * @param idKey 元素id键
 * @param parIdKey 元素父id键
 * @param parId 第一级根节点的父id值
 * @return {[]}
 */
 function listToTree (list,idKey,parIdKey,parId) {
    let map = {};
    let result = [];
    let len = list.length;

    // 构建map
    for (let i = 0; i < len; i++) {
        //将数组中数据转为键值对结构 (这里的数组和obj会相互引用，这是算法实现的重点)
        map[list[i][idKey]] = list[i];
    }

    // 构建树形数组
    for(let i=0; i < len; i++) {
        let itemParId = list[i][parIdKey];
        // 顶级节点
        if(itemParId === parId) {
            result.push(list[i]);
            continue;
        }
        // 孤儿节点，舍弃(不存在其父节点)
        if(!map[itemParId]){
            continue;
        }
        // 将当前节点插入到父节点的children中（由于是引用数据类型，obj中对于节点变化，result中对应节点会跟着变化）
        if(map[itemParId].children) {
            map[itemParId].children.push(list[i]);
        } else {
            map[itemParId].children = [list[i]];
        }
    }
    return result;
}
```

##### 判断一个json字符串

```js
var str = "{'   retmsg':'success   ',\n'  trans_date':'   20170906'}";
console.log(str);
//"{'   retmsg':'success   ',
//'  trans_date':'   20170906'}"
```

去掉空格

```js
str = str.replace(/\ +/g,"");   
console.log(str);
//"{'retmsg':'success',
//'trans_date':'20170906'}"
```

去掉回车换行

```js
str = str.replace(/[\r\n]/g,"");        
console.log(str);
//"{'retmsg':'success','trans_date':'20170906'}"
```

判断是否json字符串

```js
isJSON (str) {
  if (typeof str === 'string') {
    try {
      var obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}
```

