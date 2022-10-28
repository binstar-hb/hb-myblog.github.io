---
title: js数组转树
date: 2022-07-18 16:54:35
tags: js数组转树
categories: javaScript
---

#### 方法一

```js
let input = [
  {
    id: 1,
    val: "学校",
    parentId: null,
  },
  {
    id: 2,
    val: "班级1",
    parentId: 1,
  },
  {
    id: 3,
    val: "班级2",
    parentId: 1,
  },
  {
    id: 4,
    val: "学生1",
    parentId: 2,
  },
  {
    id: 5,
    val: "学生2",
    parentId: 3,
  },
  {
    id: 6,
    val: "学生3",
    parentId: 3,
  },
];
function buildTree(arr, parentId, childrenArray) {
  arr.forEach((item) => {
    if (item.parentId === parentId) {
      item.children = [];
      buildTree(arr, item.id, item.children);
      childrenArray.push(item);
    }
  });
}
function arrayToTree(input, parentId) {
  const array = [];
  buildTree(input, parentId, array);
  return array.length > 0 ? (array.length > 1 ? array : array[0]) : {};
}
const obj = arrayToTree(input, null);
console.log(obj);
```

#### 方法二

```js
const tempArr = [{
    id: 1,
    parentId: 0
  },
  {
    id: 2,
    parentId: 1
  },
  {
    id: 3,
    parentId: 1
  },
  {
    id: 4,
    parentId: 2
  },
];

function arrayToTree(sourceArr) {
  sourceArr.forEach(item => {
    let parentId = item.parentId;
    if (parentId !== 0) {
      sourceArr.forEach(subitem => {
        if (subitem.id == parentId) {
          if (!subitem.children) {
            subitem.children = [];
          }
          subitem.children.push(item);
        }
      });
    }
  });
  return sourceArr.filter(item => item.parentId === 0);
}
console.log(arrayToTree(tempArr));
```

#### 方法三

```js
/**
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = null;
 *     this.right = null;
 * }
 */

var sortedArrayToBST = function (nums) {
    if (!nums.length) {
        return null
    };
    const root = new TreeNode(null);

    if (nums.length > 1) {
        root.left = sortedArrayToBST(nums.splice(0, nums.length / 2))
    };
    root.val = nums[0];
    root.right = sortedArrayToBST(nums.splice(1));
    return root;
};
```

#### 方法四

```js
var list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
function convert(list) {
  const map = list.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
  const result = []
  for (const key in map) {
    const item = map[key]
    if (item.parentId === 0) {
      result.push(item)
    } else {
      const parent = map[item.parentId]
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(item)
      }
    }
  }
  return result
}
var result = convert(list)Buy and Sell Domain Namesvar list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
function convert(list) {
  const map = list.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
  const result = []
  for (const key in map) {
    const item = map[key]
    if (item.parentId === 0) {
      result.push(item)
    } else {
      const parent = map[item.parentId]
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(item)
      }
    }
  }
  return result
}
var result = convert(list)
```

#### 方法五 **<font color=red>*</font>**

```js
function convertStr(list) {
    const res = [];

    const map = new Map();

    for (let i = 0; i < list.length; i++) {
        map.set(list[i].id, list[i]);
    }

    for (let item of list) {
        if (item.parentId == null) {
            res.push(item);
        } else {
            const pItem = map.get(item.parentId);
            pItem.children = pItem.children || [];
            pItem.children.push(item);
        }
    }

    return res;
}
```

#### 方法六

```js
var list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
function convert(list) {
  const map = list.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
  const result = []
  for (const key in map) {
    const item = map[key]
    if (item.parentId === 0) {
      result.push(item)
    } else {
      const parent = map[item.parentId]
      if (parent) {
        parent.children = parent.children || []
        parent.children.push(item)
      } else{
        result.push(item) // 要加上else，否则，5，7就被抛弃了
      }
    }
  }
  return result
}
var result = convert(list)
```

#### 方法七

```js
let data = [
  {
      rankId: 1,
      value: 'BeiJing',
      label: '北京',
      parentId: 0,
  },
  {
      rankId: 2,
      value: 'jiangsu',
      label: '江苏',
      parentId: 0,
  },
  {
      rankId: 3,
      value: 'gugong',
      label: '故宫',
      parentId: 1,
  },
  {
      rankId: 4,
      value: 'tiantan',
      label: '天坛',
      parentId: 1,
  },
  {
      rankId: 5,
      value: 'zhengyangmen',
      label: '正阳门',
      parentId: 1,
  }
]
function setTreeData(data) {
    let cloneData = JSON.parse(JSON.stringify(data))    // 对源数据深度克隆
    let tree = cloneData.filter((father) => {              //循环所有项
        let branchArr = cloneData.filter((child) => {
            return father.rankId == child.parentId      //返回每一项的子级数组
        });
        if (branchArr.length > 0) {
            father.children = branchArr;    // 如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.parentId == 0;      //返回第一层
    });
    return tree     //返回树形数据
}

console.log('setTreeData', setTreeData(data));
```

#### 方法八

```js
let input = [
    {
        id: 1,
        val: "学校",
        parentId: null,
    },
    {
        id: 2,
        val: "班级1",
        parentId: 1,
    },
    {
        id: 3,
        val: "班级2",
        parentId: 1,
    },
    {
        id: 4,
        val: "学生1",
        parentId: 2,
    },
    {
        id: 5,
        val: "学生2",
        parentId: 3,
    },
    {
        id: 6,
        val: "学生3",
        parentId: 3,
    },
    {
        id: 7,
        val: "学校2",
        parentId: null,
    },
    {
        id: 8,
        val: "班级1",
        parentId: 7,
    },
    {
        id: 9,
        val: "班级2",
        parentId: 7,
    },
    {
        id: 10,
        val: "学生1",
        parentId: 8,
    },
    {
        id: 11,
        val: "学生2",
        parentId: 9,
    },
    {
        id: 12,
        val: "学生3",
        parentId: 8,
    },
];
/**
 *
 * @param {Array} arr
 */
function listToTree(arr){
    let tree = []
    let temp = {}
    arr.forEach((item) => {
        item.children = []
        temp[item.id] = item
        if(!item.parentId){
            tree.push(item)
        }else{
            temp[item.parentId].children.push(item)
        }
    })
    return tree
}
console.log(listToTree(input))
/**
 *
 * @param {Array} tree
 */
function treeToList(tree){
    let list = []
    let temp = {}
    function dfs(children){
        for(let node of children){
            if(!temp[node.id]){
                list.push(node)
                temp[node.id] = true
            }
            dfs(node.children)
            delete node.children
        }
    }
    dfs(tree)
    return list
}
console.log(treeToList(JSON.parse(JSON.stringify(listToTree(input)))))
```

#### 方法九 **<font color=red>*</font>**
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