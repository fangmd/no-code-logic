# 前端无代码入侵方案

在一些基础库开发的时候，为了将基础库的介入成本降到最低，经常会使用到一些无代码入侵的方案。

本文主要介绍一些前端常见的无代码入侵方案。

# 什么是无代码入侵方案

无代码入侵方案是希望在尽量不影响业务层代码的情况下实现一些功能

# 无代码入侵方案常见应用场景

举例一些无代码入侵方案的常用库

常见应用场景：监控类型和数据埋点，数据统计

1. 全埋点/可视化埋点
2. 代码执行链路跟踪：如果要统计一个业务流程中执行了哪些函数，每个函数耗费了多少时间。这种通过业务去每个函数加统计逻辑肯定是不可行的，只能通过无代码入侵方案实现

# 替换函数实现无代码入侵

利用 JS 的灵活性，我们可以通过直接替换函数实现代码入侵。

案例: 对 `console.log` 做拦截，执行前后插入代码

```js
// log.js
let rawLog = console.log
console.log = (...args) => {
  rawLog(`log 执行时间: ${Date.now()}`)
  rawLog(...args)
  rawLog("log 执行结束")
}
```

```js
// 业务层代码
import "./log"

console.log("index.js 执行了")
```

>这种方法适合修改一些全局调用的函数

最后执行结果：

```
log 执行时间: 1629514693170
index.js 执行了
log 执行结束
```

通过直接修改函数实现代码入侵。

这种方法只有灵活的动态类型的语言才能实现，如果是静态类型的语言比如 Java，是无法实现的。

这种方法的使用场景：

1. 希望对工程中某个函数做统计或者分析的功能
2. 要修改第三方库的某个函数，但是又不想直接改第三方库的源码

# API 本身提供的入侵方案

在使用一些第三方库的时候，第三方库本身就提供一些代码入侵方法。

1. 拦截器类型：最典型案例是 axios，axios 提供的是拦截器方法。我们可以给 axios 添加自定义拦截器统一处理代码错误，或者统计一些接口问题。
2. 观察者模式：JQuery DOM 添加点击事件，`$('#id').on('click',, ()=>{})`

# 代理方案

js 端对象代理方法：

1. Object.defineProperty
2. Proxy

案例：通过 Proxy 实现对用户登录过程注入代码。登录函数来自封装库，所以不能对其作直接的修改。

```js
// login.js, 一个封装库中有个登录功能
export const userLogin = (username) => {
  console.log("用户登录成功:" + username)
  return true
}
```

```js
// proxyLogin.js
import { userLogin as rawUserLogin } from "./login"

export const userLogin = new Proxy(rawUserLogin, {
  apply(target, context, args) {
    console.log("proxy 拦截成功")
    const ret = Reflect.apply(...arguments)
    console.log("proxy 拦截end")
    return ret
  },
})
```

```js
// 业务层代码，需要修改 import 代码，让业务层使用 Proxy 对象
// import { userLogin } from "./login"
import { userLogin } from "./2proxy"
userLogin("刘德华")
```

# AOP 切面编程


# 借助打包工具实现无代码入侵

webpack
