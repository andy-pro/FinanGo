var api = new XMLHttpRequest();
api.call = function (method, resource, data, callback) {
    this.onreadystatechange = function () {
        if (this.readyState != 4 || this.status != 200) return;
        return (callback instanceof Function) ? callback(JSON.parse(this.responseText)) : null;
    };
    this.open(method, 'https://api.mongolab.com/api/1/' + resource + '?' + apiKey);
    this.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    console.log(JSON.stringify(data));
    this.send(data ? JSON.stringify(data) : null);
};
/** код ниже выглядит намного удобнее и его можно вызывать несколько раз */
// api.call('GET', 'databases', null, function (databases) {
//     console.log(databases);
// });

// Внести новую запись в коллекцию demo с title: test

var test = {
    title: 'testuische'
};

// var test1 = { purchases: { "$set": {"0": { "y" : 5 } } } } ;
var purchase = {
  product: 'tratata',
  cost: 100,
  userId: '584565afec910a0db4fb8ef5'
}

export const postUser1 = (purchase) => {
  // api.call('POST', 'databases/shop/collections/users/584565afec910a0db4fb8ef5', test1, function (result) {
  api.call('POST', 'databases/shop/collections/purchases', purchase, function (result) {
      // test = result; // получить ID из базы после добавления
      console.log('urra:', result);
  });
}
