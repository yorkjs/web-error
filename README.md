# web-error
捕获页面异常，并上报

## 安装

### CDN

```html
<script src="https://unpkg.com/@yorkjs/web-error"></script>
```

### NPM

```shell
npm install @yorkjs/web-error
```

### YARN

```shell
yarn add @yorkjs/web-error
```

### 初始化

#### 提供了两种上传方式

```
webError.sendImage(url, queryStr)
webError.sendBeacon(url, data)
```

参考:

[Navigator.sendBeacon()](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)

#### ErrorMsg 对象

```
export interface ErrorMsg {
  url: string,
  type: number | string,
  error?: string,
  file?: string,
  line?: number,
  column?: number,
}
```

#### 使用示例

```js
import * as webError from '@yorkjs/web-error'

// 初始化需要的对象
// reportError 上报错误信息方法
webError.init({
  reportError(errObj) {
    // 方式一: 使用图片方式上传错误信息
    // 将错误对象处理成功 query 参数
    const query = formatMessage(errObj)
    webError.sendImage(url, query)

    // 方式二: 使用 Navigator.sendBeacon 方法
    webError.sendBeacon(url, errObj)
  },
})
