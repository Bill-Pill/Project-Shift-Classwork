'use strict';


/**
 * User Activity
 * The User Activity endpoint returns data about a user's lifetime activity with Uber. The response will include pickup locations and times, dropoff locations and times, the distance of past requests, and information about which products were requested.<br><br>The history array in the response will have a maximum length based on the limit parameter. The response value count may exceed limit, therefore subsequent API requests may be necessary.
 *
 * offset Integer Offset the list of returned results by this amount. Default is zero. (optional)
 * limit Integer Number of items to retrieve. Default is 5, maximum is 100. (optional)
 * returns Activities
 **/
exports.historyGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "offset" : 0,
  "limit" : 6,
  "count" : 1,
  "history" : [ {
    "uuid" : "uuid"
  }, {
    "uuid" : "uuid"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * User Profile
 * The User Profile endpoint returns information about the Uber user that has authorized with the application.
 *
 * returns Profile
 **/
exports.meGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "last_name" : "last_name",
  "promo_code" : "promo_code",
  "first_name" : "first_name",
  "email" : "email",
  "picture" : "picture"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

