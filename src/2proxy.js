import { userLogin as rawUserLogin } from "./login"

export const userLogin = new Proxy(rawUserLogin, {
  apply(target, context, args) {
    console.log("proxy 拦截成功")
    const ret = Reflect.apply(...arguments)
    console.log("proxy 拦截end")
    return ret
  },
})
