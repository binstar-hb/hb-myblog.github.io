---
title: git版本回退
date: 2021-10-07 17:55:22
tags:
categories: git
---

对于git版本的回退，我们一般会用到如下两个命令：

- git reset
- git revert

这两个命令有什么区别呢？

##### 1、git reset

假设有如下几个提交:

![](https://i.bmp.ovh/imgs/2021/10/acf69ed2c12427dd.png)

执行如下命令

```js
git reset --hard a0fvf8
```

命令执行之后，HEAD指针就会移动到B提交下

![](https://i.bmp.ovh/imgs/2021/10/fc6aaccc7c536e28.png)

此时，远程仓库的指针依然在D提交上。直接push的话，无法将更改推送到远程仓库，只能使用-f强推到远程仓库：

```js
git push -f
```

这个方法的弊端显而易见，之前的C、D提交将会被抹除，无法再找回了。

##### 2、git revert

通过反做创建一个新的版本，新版本的内容与要回退的目标版本一样，而HEAD指针指向新生成的版本。

用git revert 来实现上述例子的话可以先revert D，再revert C（由新到旧依次revert）

```js
git revert 5lk4er
git revert 76sdeb
```

![](https://i.bmp.ovh/imgs/2021/10/9acffeb81c1085a5.png)

如果回退的数量较大，一个个回退容易出错，可以使用以下方法进行批量回退

```js
git revert OLDER_COMMIT^..NEWER_COMMIT
```

这样操作的话HEAD指针是往后移动的，可以直接push到远程仓库中。将来甩锅便有迹可循