export const __copy = obj => Array.isArray(obj) ? obj.map(item => ({...item})) : {...obj}

export const __del_id = obj => {
  let del_id = k => {
    delete k.id
    return k
  }
  // let obj = __copy(data)
  return Array.isArray(obj) ? obj.map(item => del_id(item)) : del_id(obj)
}
