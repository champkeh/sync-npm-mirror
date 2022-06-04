# npm-mirror-sync
同步npm镜像站

> 本项目受[魔法哥](https://github.com/cssmagic/npm-mirror-sync/issues/2)的启发，但是关于实现方式我有自己的想法。<br/>
> 另外，我平时也会发布一些npm包，所以这个工具对我来说是一个刚需，于是就有了本项目。

> 注意：
> 目前该包还没有发布到npm，所以以下内容可能会失败。

## Install

### npm
```shell
npm install -D @champkeh/npm-mirror-sync
```

### yarn
```shell
yarn add -D @champkeh/npm-mirror-sync
```

### pnpm
```shell
pnpm add -D @champkeh/npm-mirror-sync
```

## Usage

### with cli
Add `postpublish` script in `package.json` as follows:

```diff
{
  "name": "awesome-tools",
  "scripts": {
+    "postpublish": "npm-mirror-sync awesome-tools"
  },
  "devDependencies": {
    "@champkeh/npm-mirror-sync": "^0.0.1"
  },
}
```

### with require
```js
import {syncNpmMirrorPackage} from '@champkeh/npm-mirror-sync'

syncNpmMirrorPackage('axios').then(console.log)
```
