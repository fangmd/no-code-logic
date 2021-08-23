// import "./0log"
// console.log("index.js 执行了")

// import { userLogin } from "./login"
// import { userLogin } from "./2proxy"
// userLogin("刘德华")

import { after, before } from "./3decorator"
class User {
  @after
  @before
  userLogin(name) {
    console.log(`${name} 登录了`)
  }
}
new User().userLogin('刘德华')