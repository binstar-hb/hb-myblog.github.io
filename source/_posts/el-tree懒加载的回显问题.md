---
title: el-tree懒加载的回显问题
date: 2022-07-25 10:10:24
tags: el-tree懒加载的回显问题
---

#### 场景

给某一用户绑定组织，由于组织数据量比较大，做成懒加载的树结构模式，出于与别的模块进行联动，需要把关联的选中的组织和半选的组织均存到库中，此时存在一个问题，当对该数据编辑时半选组织的回显无法实现。

#### 解决方法

弹窗显示前先拿到选中和半选的数据，注意el-tree标签要给node-key属性，然后在树加载的方法中设置选中和半选的节点，示例：

```js
loadNode(node, resolve) {
  if(node.level === 0) {
    // 接口请求 data
    resolve(data)
    // 设置选中
    this.$refs.tree.setCheckedKeys(selectedKeyArr)
  } else {
    // 接口请求 data
    resolve(data)
    // 设置选中
    this.$refs.tree.setCheckedKeys(selectedKeyArr)
  }
  // 设置半选
  halfKeyArr.forEach(key => {
    const node = this.$refs.tree.getNode(key)
    node.indeterminate = true
  })
}
```