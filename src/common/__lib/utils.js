import slugify from 'slugify'

export const pick = (obj, props) =>
  props.reduce((o, k) => {o[k] = obj[k]; return o}, {})

export const fmtCost = cost =>
  Number(cost || 0).toFixed(2).replace(/[.,]00$/, "")

export const getValue = v =>
  typeof v === 'object' ? v.target.value : v

export const testColor = v =>
  /^[0-9,a-f]{3}$/.test(v) || /^[0-9,a-f]{6}$/.test(v)

export const splitOnce = (str, dt, last=false) => {
  let pos = last ? str.lastIndexOf(dt) : str.indexOf(dt);
  return (pos >=0 ) ? [str.substr(0, pos), str.substr(pos+dt.length)] : [str];
}

const specialCharsRegex = /[\/|\&\?<>]/g

const removeSpecial = s => s.trim().replace(specialCharsRegex, '')

const getSlug = s => slugify(removeSpecial(s))

export { removeSpecial, getSlug }

export const slugifyCategory = (category) =>
  category
    .split('/')
    .map(c => getSlug(c))
    .filter(c => Boolean(c))
    .join('/')

export const getCategoryBySlug = (path, list) =>
  path
  .split('/')
  .map(slug => {
    let c = list.find(item => {
      let result = slug === item.slug
      if (result) {
        list = item.sub
      }
      return result
    })
    // return c ? c.title : 'ERROR!---' + slug + '---'
    return c ? c.title : slug
  })
  .join(' / ')

const getCategoryByPath = (list, path) => {
  // path.split('.').forEach(step => list = list[step])
  path = path.split('.')
  path.shift()
  for (let i = 0, len = path.length; i < len; i++) {
    let step = path[i]
    if (step === 'sub' && !list[step]) {
      // new subcategory
      list.sub = []
      // return list.sub = [] // ? working anywere?
      return list.sub
    }
    list = list[step]
  }
  return list
}

export { getCategoryByPath }

export const findDuplicate = (list, title, path) => {
  list = getCategoryByPath(list, path)
  return list ? list.find(item =>
    // item.title.toLowerCase() === title.toLowerCase()
    item.slug.toLowerCase() === title.toLowerCase()
  ) : false;
}

export const addCategoryToPath = (list, { path, data }) => {
  let target = getCategoryByPath(list, path)
  target.push(data)
  return list.map(item => item)
}

export const updateCategoryByPath = (list, { path, data }) => {
  let target = getCategoryByPath(list, path)
  Object.assign(target, data)
  return list.map(item => item)
}

export const delCategoryByPath = (list, { index, parentPath }) => {
  let target = getCategoryByPath(list, parentPath)
  // target.push(data)
  // console.log('del', target, index);
  target.splice(index, 1)
  return list.map(item => item)
}

/* =============  Immutability helpers  ================== */

export const pushItem = (list, item) => list.concat(item)

export const unshiftItem = (list, item) => [item].concat(list)

export const updateItemById = (list, id, set) =>
  list.map(item =>
    item.id === id ? Object.assign(item, set) : item
  )

export const deleteItemById = (list, id) =>
  list.filter(item => item.id !== id)

// function update(list, element, key, set) {
//   let value = element[key]
//   return list.map(item =>
//     item[key] === value ? Object.assign(item, set) : item
//   )
// }

//
// export const getElementSize = el => {
//   let display = el.style.display;
//   if (display === 'none' && el.offsetHeight === 0) {
//     el.style.display = 'block';
//   }
//   let size = {
//     width: el.offsetWidth,
//     height: el.offsetHeight
//   }
//   el.style.display = display;
//   return size;
// }
