'use strict';

import slugify from 'slugify'

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

export const getElementSize = el => {
  let display = el.style.display;
  if (display === 'none' && el.offsetHeight === 0) {
    el.style.display = 'block';
  }
  let size = {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
  el.style.display = display;
  return size;
}

export const findDuplicate = (data, title, path) => {
  path.split('.').forEach(step => data = data[step])
  return data ? data.find(item =>
    // item.title.toLowerCase() === title.toLowerCase()
    item.slug.toLowerCase() === title.toLowerCase()
  ) : false;
}

/* =============  Immutability helpers  ================== */

export const pushItem = (collection, item) => collection.concat(item)

export const unshiftItem = (collection, item) => [item].concat(collection)

export const updateItemById = (collection, id, set) =>
  collection.map(item =>
    item.id === id ? Object.assign(item, set) : item
  )

export const deleteItemById = (collection, id) =>
  collection.filter(item => item.id !== id)

// function update(collection, element, key, set) {
//   let value = element[key]
//   return collection.map(item =>
//     item[key] === value ? Object.assign(item, set) : item
//   )
// }
