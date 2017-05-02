/* utils for normalize & denormalize data */

const normalize_rules = [
  /*  rules for normalize (from server to client):
        _id: {$oid: "xxxxxxxxxx"}    -> id
        userId: {$oid: "xxxxxxxxxx"} -> userId
        date: {$date: "xxxxxxxxxx"}  -> date
  */
  ['_id', item => {item.id = item._id; delete item._id}],
  // ['userId', item => item.userId = item.userId.$oid],
  // ['date', item => item.date = item.date.$date]
];

const convert = function(data, rules) {
  const object_convert = item => {
    rules.forEach(rule => {
      if (item[rule[0]]) rule[1](item)
    })
  }
  if (data instanceof Array) data.forEach(object_convert)
  else object_convert(data)
  return data
}

export const normalize = function(data) {
/* normalize object or collection after receive from Mongo */
  return convert(data, normalize_rules)
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const addCategory = category => ({
  $addToSet: { [category.path]: category.data }
})
/*
{
  $addToSet: {
    [category.path] : {
      title: category.title,
      slug: category.slug,
      color: category.color
    }
  }
}
*/

export const updateCategory = category => ({
  $set: setBodyFields(category)
})
/*
{
  $set: {
    [category.path + '.title']: category.title,
    [category.path + '.slug']: category.slug,
    [category.path + '.color']: category.color
  }
}
*/
const setBodyFields = ({data, path}) =>
  Object.keys(data).reduce((res, field) => {
    res[path + '.' + field] = data[field]
    return res
  }, {})

export const delCategory = category => ({
  $pull: { [category.parentPath]: {title: category.title} }
})

export const replaceCategory = categories => ({
  $set: { categories }
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
