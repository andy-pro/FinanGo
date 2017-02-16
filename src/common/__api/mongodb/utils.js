/* utils for normalize & denormalize data */

const normalize_rules = [
  /*  rules for normalize (from server to client):
        _id: {$oid: "xxxxxxxxxx"}    -> id
        userId: {$oid: "xxxxxxxxxx"} -> userId
        date: {$date: "xxxxxxxxxx"}  -> date
  */
  ['_id', item => {item.id = item._id.$oid; delete item._id}],
  ['userId', item => item.userId = item.userId.$oid],
  ['date', item => item.date = item.date.$date]
];

const denormalize_rules = [
  /*  rules for denormalize (from client to server):
        id    -> _id: {$oid: "xxxxxxxxxx"}
        userId -> userId: {$oid: "xxxxxxxxxx"}
        date   -> date: {$date: "xxxxxxxxxx"}
  */
  ['id', item => {item._id = {$oid: item.id}; delete item.id}],
  ['userId', item => item.userId = {$oid: item.userId}],
  ['date', item => item.date = {$date: item.date}]
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

export const denormalize = function(data, stringify=true) {
/* denormalize & optional stringify object
   or collection before send to MongoDB */
  convert(data, denormalize_rules)
  return stringify ? JSON.stringify(data) : data
}

/*
export const convertCategoryPath = function(path, sub='') {
  path = isNaN(parseInt(path)) ? '' : '.' + path.split(',').join('.sub.');
  if (!path) {
    sub = '';
  }
  return 'categories' + path + sub;
}
*/
