---
title: Vite构建工具的使用
date: 2022-01-14 19:28:29
tags: vite
categories: vue
---

##### 特点

- 极速的服务启动，使用原生 ESM 文件，无需打包!
- 轻量快速的热重载，无论应用程序大小如何，都始终极快的模块热重载（HMR）
- 丰富的功能，对 TypeScript、JSX、CSS 等支持开箱即用。
- 优化的构建，可选 “多页应用” 或 “库” 模式的预配置 Rollup 构建
- 通用的插件，在开发和构建之间共享 Rollup-superset 插件接口。
- 完全类型化的API，灵活的 API 和完整 TypeScript 类型。

##### 为什么选 Vite

直接点说，现市面上的构建工具太慢了（webpack、Rollup 和、Parcel等），Vite直接利用浏览器原生的ES模块使构建速度更快

##### 搭建第一个 Vite 项目

使用 npm:

```js
npm init vite@latest
```

使用 yarn:

```js
yarn create vite
```

然后按照提示操作即可！

你还可以通过附加的命令行选项直接指定项目名称和你想要使用的模板。例如，要构建一个 Vite + Vue 项目，运行:

```js
# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue
```

##### 命令行界面

在安装了 Vite 的项目中，可以在 npm scripts 中使用 vite 可执行文件，或者直接使用 npx vite 运行它。下面是通过脚手架创建的 Vite 项目中默认的 npm scripts：

```js
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

可以指定额外的命令行选项，如 --port 或 --https。运行 npx vite --help 获得完整的命令行选项列表。

##### 配置文件解析（常用配置）

当以命令行方式运行 vite 时，Vite 会自动解析 项目根目录 下名为 vite.config.js 的文件。

最基础的配置文件是这样的：

```js
// vite.config.js
export default {
  // 配置选项
}
```

注意：即使项目没有在 package.json 中开启 type: "module"，Vite 也支持在配置文件中使用 ESM 语法。这种情况下，配置文件会在被加载前自动进行预处理。

你可以显式地通过 --config 命令行选项指定一个配置文件（相对于 cwd 路径进行解析）

```
vite --config my-config.js
```

##### 配置智能提示

因为 Vite 本身附带 Typescript 类型，所以你可以通过 IDE 和 jsdoc 的配合来实现智能提示：

```js
/**
 * @type {import('vite').UserConfig}
 */
const config = {
  // ...
}

export default config
```

另外你可以使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示：

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

Vite 也直接支持 TS 配置文件。你可以在 vite.config.ts 中使用 defineConfig 工具函数。

##### 情景配置

如果配置文件需要基于（dev/serve 或 build）命令或者不同的 模式 来决定选项，则可以选择导出这样一个函数：

```js
export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      // dev 独有配置
    }
  } else {
    // command === 'build'
    return {
      // build 独有配置
    }
  }
})
```

需要注意的是，在 Vite 的 API 中，在开发环境下 command 的值为 serve（在 CLI 中， vite dev 和 vite serve 是 vite 的别名），而在生产环境下为 build（vite build）。

##### 异步配置

如果配置需要调用一个异步函数，也可以转而导出一个异步函数

```js
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // 构建模式所需的特有配置
  }
})
```

##### 共享配置

###### root

- **类型：** string
- **默认：** process.cwd()项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的相对路径。

###### base

- **类型：** string
- **默认：** /开发或生产环境服务的公共基础路径。合法的值包括以下几种：绝对 URL 路径名，例如 /foo/完整的 URL，例如 https://foo.com/空字符串或 ./（用于开发环境）

###### mode

- **类型：** string
- **默认：** 'development'（开发模式），'production'（生产模式）在配置中指明将会把 **serve 和 build** 时的模式 **都** 覆盖掉。也可以通过命令行 --mode 选项来重写。

###### plugins

- **类型：** (Plugin | Plugin[])[]需要用到的插件数组。Falsy 虚值的插件将被忽略，插件数组将被扁平化（flatten）。

###### publicDir

- **类型：** string | false
- **默认：** "public"作为静态资源服务的文件夹。该目录中的文件在开发期间在 / 处提供，并在构建期间复制到 outDir 的根目录，并且始终按原样提供或复制而无需进行转换。该值可以是文件系统的绝对路径，也可以是相对于项目的根目录的相对路径。将 publicDir 设定为 false 可以关闭此项功能。

##### 开发服务器选项

###### server.host

- **类型：** string | boolean
- **默认：** '127.0.0.1'指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。也可以通过 CLI 使用 --host 0.0.0.0 或 --host 来设置。

###### server.port

- **类型：** number
- **默认值：** 3000指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口

###### server.https

- **类型：** boolean | https.ServerOptions启用 TLS + HTTP/2。注意：当 server.proxy 选项 也被使用时，将会仅使用 TLS。这个值也可以是一个传递给 https.createServer() 的 选项对象。

###### server.open

- **类型：** boolean | string在开发服务器启动时自动在浏览器中打开应用程序。当此值为字符串时，会被用作 URL 的路径名。若你想指定喜欢的浏览器打开服务器，你可以设置环境变量 process.env.BROWSER（例如：firefox）。示例：**export default defineConfig({ server: { open: '/docs/index.html' } })

###### server.proxy

- **类型：** Record<string, string | ProxyOptions>为开发服务器配置自定义代理规则。期望接收一个 { key: options } 对象。如果 key 值以 ^ 开头，将会被解释为 RegExp。configure 可用于访问 proxy 实例。使用 http-proxy。

```js
export default defineConfig({
  server: {
    proxy: {
      // 字符串简写写法
      '/foo': 'http://localhost:4567',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      },
      // 使用 proxy 实例
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      }
    }
  }
})
```

##### 构建选项

###### build.target#

- **类型：** string | string[]
- **默认：** 'modules'
- **相关内容：:** 浏览器兼容性设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'，这是指 支持原生 ES 模块的浏览器。另一个特殊值是 “esnext” —— 即假设有原生动态导入支持，并且将会转译得尽可能小：如果 build.minify 选项为 'terser'， 'esnext' 将会强制降级为 'es2019'。其他情况下将完全不会执行转译。转换过程将会由 esbuild 执行，并且此值应该是一个合法的 esbuild 目标选项。自定义目标也可以是一个 ES 版本（例如：es2015）、一个浏览器版本（例如：chrome58）或是多个目标组成的一个数组。注意：如果代码包含不能被 esbuild 安全地编译的特性，那么构建将会失败。查看 esbuild 文档 获取更多细节。

###### build.outDir

- **类型：** string
- **默认：** dist指定输出路径（相对于 项目根目录).

###### build.assetsDir

- **类型：** string
- **默认：** assets指定生成静态资源的存放路径（相对于 build.outDir）

```
官方地址：https://vitejs.cn/
```