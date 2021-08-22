// /**
//  * 点击事件定义
//  */
// let clickFun = (name) => {
//   console.log(`${name}`)
// }

// /**
//  * 对象替换
//  */
// let rawClickFun = clickFun
// let clickFun = (name) => {
//   console.log("有人点击了")
//   rawClickFun()
//   console.log("点击事件完成")
// }

// /**
//  * 业务代码
//  */
// clickFun()

let rawLog = console.log
console.log = (...args) => {
  rawLog(`log 执行时间: ${Date.now()}`)
  rawLog(...args)
  rawLog("log 执行结束")
}
