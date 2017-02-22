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

export const calcBalance = (data, ids) =>
  ids.reduce((b, id) => b + data[id].summary, 0)
