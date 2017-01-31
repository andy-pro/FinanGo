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
