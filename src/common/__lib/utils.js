import slugify from 'slugify'

export const firstToUpper = str =>
  str.substr( 0, 1 ).toUpperCase() + str.substr( 1 )

export const convToArray = obj => Array.isArray(obj) ? obj : [obj]

export const compose = (...fns) => (data) => {
/*  Performs right-to-left function composition.
    All functions must be unary. */
  for (let i = 0, len = fns.length; i < len; i++) {
    data = fns[len - i - 1](data)
  }
  return data
}

export const pick = (obj, props) =>
  props.reduce((o, k) => {o[k] = obj[k]; return o}, {})

export const omit = (obj, props) =>
  Object.keys(obj).reduce((o, k) => {if (!props.includes(k)) o[k] = obj[k]; return o}, {})

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

export const splitCategory = category =>
  category
    .split('/')
    .map(c => removeSpecial(c))

export const slugifyCategory = (category) =>
  category
    .split('/')
    .map(c => getSlug(c))
    .filter(c => Boolean(c))
    .join('/')

export const getCategoryBySlug = (slug, list) => {
  let category = slug.split('/'),
      errLevel = 0,
      path = 'categories'
  let title = category.map(s => {
    let c = list && list.find((item, i) => {
      let result = s === item.slug
      if (result) {
        list = item.sub
        path += `.${i}.sub`
      }
      return result
    })
    // return c ? c.title : 'ERROR!---' + slug + '---'
    // return c ? c.title : slug
    if (c) return c.title
    else {
      errLevel++
      // path = list
      return s
    }
  })
  .join(' / ')
  return {
    slug,
    category,
    title,
    errLevel,
    path,
  }
}

// const getCategoryByPath = (list, path) => {
//   // path.split('.').forEach(step => list = list[step])
//   path = path.split('.')
//   path.shift()
//   for (let i = 0, len = path.length; i < len; i++) {
//     let step = path[i]
//     if (step === 'sub' && !list[step]) {
//       // new subcategory
//       list.sub = []
//       // return list.sub = [] // ? working anywere?
//       return list.sub
//     }
//     list = list[step]
//   }
//   return list
// }

const getCategoryByPath = (list, path) => {
  // path.split('.').forEach(step => list = list[step])
  console.log('getCategoryByPath:', path, 'list:', list);
  path = path.split('.')
  let parent = list,
      index = 0,
      root = path.shift()
  // list = Array.isArray(list) ? list[0] : list[root]
  list = list[0] ? list[0] : list[root]
  for (let i = 0, len = path.length; i < len; i++) {
    let step = path[i]
    if (step === 'sub' && !list[step]) {
      // new subcategory
      list.sub = []
      // return list.sub = [] // ? working anywere?
      return {
        entry: list.sub,
        parent: list
      }
    }
    parent = list
    list = list[step]
    index = step
  }
  return {
    entry: list,
    parent,
    index
  }
}

export { getCategoryByPath }

export const findDuplicate = (list, slug, path, title) => {
  list = getCategoryByPath(list, path).entry
  // console.log('find duplicate', list, slug, path, title);
  return list ? list.find(item => {
    // item.title.toLowerCase() === title.toLowerCase()
    return (item.slug) ?
      item.slug.toLowerCase() === slug.toLowerCase()
      :
      item.title.toLowerCase() === title.toLowerCase()
  }) : false;
}


export const cmdCategoryLocal = (user, { cmd, payload }) => {
  let { path, data, index, parentPath } = payload

  switch (cmd) {
    case 'add':
      getCategoryByPath(user, path).entry.push(data)
      break
    case 'update':
      Object.assign(getCategoryByPath(user, path).entry, data)
      break
    case 'del':
      getCategoryByPath(user, parentPath).entry.splice(index, 1)
      break
  
    default:
      return user
  }


  // return user.map(item => item)
  // return Object.assign({}, user)
  return { ...user }
  // return user
  // console.log('r', r);
}

/*
export const addCategoryToPath = (list, { path, data }) => {
  let target = getCategoryByPath(list, path)
  target.push(data)
  return list.map(item => item)
}

export const updateCategoryByPath = (list, { path, data }) => {
  console.log('updateCategoryByPath', list, path, data);
  let target = getCategoryByPath(list, path).category
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
*/

/* =============  Immutability helpers  ================== */

export const pushItem = (list, item) => list.concat(item)

export const unshiftItem = (list, item) => [item].concat(list)

export const updateItemById = (list, id, set) =>
  list.map(item =>
    item.id === id ? Object.assign(item, set) : item
  )

export const deleteItemById = (list, id) =>
  list.filter(item => item.id !== id)

export const deleteItemsByIds = (list, ids) => {
  if (!ids instanceof Array) ids = [ids]
  ids = ids.slice(0)
  return list.filter(item => {
    for (let i = 0, len = ids.length; i < len; i++) {
      if (item.id === ids[i]) {
        ids.splice(i, 1)
        return false
      }
    }
    return true
  })
}
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
