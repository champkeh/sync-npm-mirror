# sync-npm-mirror
同步npm镜像站

> 本项目受[魔法哥](https://github.com/cssmagic/npm-mirror-sync/issues/2)的启发，但是关于实现方式我有自己的想法。<br/>
> 另外，我平时也会发布一些npm包，所以这个工具对我来说是一个刚需，于是就有了本项目。


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
Add `postpublish` script in `package.json` as follows:

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

### with `require`
```js
const { syncNpmMirrorPackage } = require("sync-npm-mirror")

// sync single package
syncNpmMirrorPackage('axios').then(console.log)

// sync multi pakcage
syncNpmMirrorPackage(['axios', 'express']).then(console.log)
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
