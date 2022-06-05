# sync-npm-mirror

<p align="left">
<a href="https://npmjs.com/package/sync-npm-mirror"><img src="https://img.shields.io/npm/v/sync-npm-mirror.svg" alt="npm package"></a>
<a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/sync-npm-mirror.svg" alt="node compatibility"></a>
<a href="https://github.com/champkeh/sync-npm-mirror/actions/workflows/publish-and-release.yml"><img src="https://github.com/champkeh/sync-npm-mirror/actions/workflows/publish-and-release.yml/badge.svg" alt="workflows status"></a>
</p>

当你将自己开发的 npm 包发布到 npm 官方仓库时，想要立即同步淘宝镜像站上面的版本，那么就可以使用这个工具自动完成同步工作。

> 本项目受[魔法哥](https://github.com/cssmagic/npm-mirror-sync/issues/2)的启发，但是关于实现方式我有自己的想法。<br/>
> 另外，我平时也会发布一些 npm 包，所以这个工具对我来说是一个刚需，于是就有了本项目。

## demo

[![asciicast](https://asciinema.org/a/499462.svg)](https://asciinema.org/a/499462)

## 安装

### npm

```shell
npm install -D sync-npm-mirror
```

### yarn

```shell
yarn add -D sync-npm-mirror
```

### pnpm

```shell
pnpm add -D sync-npm-mirror
```

## 使用

### with `scripts` (推荐)

在你需要同步的 npm 包的`package.json`中添加下面这个脚本：

```diff
{
  "name": "awesome-tools",
  "scripts": {
+    "postpublish": "sync-npm-mirror awesome-tools"
  },
  "devDependencies": {
    "sync-npm-mirror": "x.y.z"
  },
}
```

这样，当你的包在发布到官方仓库之后，会立即执行`sync-npm-mirror awesome-tools`将这个包同步更新到淘宝镜像站。

> ⚠️⚠️⚠️ 注意
>
> 上面的代码段中的`awesome-tools`为演示目的，需要替换成你自己的包名。

### with `require`

```js
const { syncNpmMirrorPackage } = require("sync-npm-mirror")

// sync single package
syncNpmMirrorPackage("axios")

// sync multi pakcage
syncNpmMirrorPackage(["axios", "express"])
```

### with `cli`(global，需要全局安装)

```shell
sync-npm-mirror axios
```

### 支持同时更新多个包

```shell
sync-npm-mirror axios express koa
```

## 额外说明

由于依赖中的脚本无法获取到使用它的包名，所以需要在参数中手动指定你要同步的包名，也就是在`postpublish`脚本中指定包名作为`sync-npm-mirror`命令的参数。

参考上面的推荐用法。
