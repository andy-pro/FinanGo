import * as dt from '../__lib/dateUtils'


export const Query = (query={date: dt.getCurrentDate()}) => {

/*
query:

  undefined - данные за текущий месяц;
  { date: {year} } - за год;
  { date: {year, month} } - за указанный месяц;
  { date: {$gte: {year, month}, $lt: {year, month}} } - за указанный период;
  { date: {$all: true} } - база данных целиком;

  { id: {$in: [id1, id2, ..., idN]} } - записи с этими id
*/

  let q = {}

  Object.keys(query).forEach(key => {
    let _filter = query[key],
        _query = {}
    switch (key) {
      case 'date':
        let { $all, $gte, $lt, year, month } = _filter
        if (year && month !== undefined) {
          // запрос за месяц
          _query.$gte = _filter
          _query.$lt = dt.monthForward(_filter, false)
        }
        else if (year) {
          // запрос за год
          _query.$gte = {year, month: 0}
          _query.$lt = {year: year + 1, month: 0}
        }
        else if ($gte && $lt) {
          // запрос за указанный период период
          _query.$gte = $gte
          _query.$lt = $lt
        }
        else if ($all) return // whole database
        q.date = {
          $gte: dt.startMonth(_query.$gte),
          $lt: dt.startMonth(_query.$lt)
        }
        break;

      case 'id':
        q.id = _filter
        break

      default:

    }
  })

  return q

}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const getSuggestions = (inputList, query, order) => {
  // order: 1 - ascendant, -1 - descendant
  const inputValue = query.trim().toLowerCase(),
        inputLength = inputValue.length,
        suggestions = [];
  if (!inputValue) return suggestions
  const createList = (data, path=[]) => {
    data.forEach((item, index) => {
      let title = item.title;
      if (title.toLowerCase().slice(0, inputLength) === inputValue) {
        suggestions.push({
          title,
          path,
          path_str: path.reduce((p, c) => p + c + ' / ', '')
        });
      }
      if (item.sub && item.sub.length) {
        createList(item.sub, path.concat([title]));
      }
    });
  }
  createList(inputList);
  return suggestions.sort((a, b) => (b.path.length - a.path.length)*order);
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const amountTypes = [
  {title: 'кг'},
  {title: 'г'},
  {title: 'л'},
  {title: 'мл'},
  {title: 'шт'},
  {title: 'м.п.'}
]

const re = /^\d*\.?\d+\s/

export const getAmountTypes = query => {
    if (!re.test(query)) return []
    query = query.split(' ')[1].toLowerCase()
    return amountTypes
      .filter(item => !query || item.title.startsWith(query))
      .map(({ title }) => ({ title }))
  }

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
