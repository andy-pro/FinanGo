var assert = require('chai').assert;

var utils = require('../src/common/__api/mongolab/utils');

let { normalize, denormalize } = utils

describe("mongodb utils: normalize & denormalize", function() {

  var id    = '584565afec910a0db4fb8ef5';
  var userId = '5845e24dec910a0db4fb8f04';
  var date = new Date().toISOString();

  function denormalized_data() {
    return {
      _id: {$oid: id},
      userId: {$oid: userId},
      date: {$date: date}
    }
  }

  function normalized_data() {
    return {
      id,
      userId,
      date
    }
  }

  describe("test normalize function", function() {
    /*  rules for normalize (from server to client):
          _id: {$oid: "xxxxxxxxxx"}    -> id
          userId: {$oid: "xxxxxxxxxx"} -> userId
          date: {$date: "xxxxxxxxxx"}  -> date
    */

    it("normalize object", function() {
      assert.deepEqual(
        normalize(denormalized_data()),
        normalized_data()
      );
    });

    it("normalize array", function() {
      assert.deepEqual(
        [ normalize(denormalized_data()),
          normalize(denormalized_data()),
          normalize(denormalized_data()) ],
        [ normalized_data(),
          normalized_data(),
          normalized_data() ]
      );
    });

  });

  //========================================================================

  describe("test denormalize function", function() {
    /*  rules for denormalize (from client to server):
          id    -> _id: {$oid: "xxxxxxxxxx"}
          userId -> userId: {$oid: "xxxxxxxxxx"}
          date   -> date: {$date: "xxxxxxxxxx"}
    */

    it("denormalize object", function() {
      assert.deepEqual(
        denormalize(normalized_data(), false),
        denormalized_data()
      );
    });

    it("denormalize array", function() {
      assert.deepEqual(
        [ denormalize(normalized_data(), false),
          denormalize(normalized_data(), false),
          denormalize(normalized_data(), false) ],
        [ denormalized_data(),
          denormalized_data(),
          denormalized_data() ]
      );
    });

    it("result type after denormalize & stringify", function() {
      /* second argument of 'denormalize' is true by default */
      var result = denormalize(normalized_data());
      assert.isString(result);
    });

  });

  describe("complex denormalize & stringify & normalize", function() {

    it("processing", function() {
      /* get denormalized & stringified */
      var stringified = denormalize(normalized_data());
      /* parse to object */
      var obj = JSON.parse(stringified);
      /* normalize object */
      var norm = normalize(obj);
      /* compare with original object */
      assert.deepEqual(norm, normalized_data());
    });

  });



});
