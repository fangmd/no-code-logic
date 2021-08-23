export const before = (target, name, descriptor) => {
  let oldValue = descriptor.value

  descriptor.value = function () {
    console.log(`before calling ${name} with`, arguments)
    return oldValue.apply(this, arguments)
  }

  return descriptor
}

export const after = (target, name, descriptor) => {
  let oldValue = descriptor.value

  descriptor.value = function () {
    const ret = oldValue.apply(this, arguments)
    console.log(`after calling ${name} with`, arguments)
    return ret
  }

  return descriptor
}
