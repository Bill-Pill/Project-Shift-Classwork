'use strict';


/**
 * Product Types
 * The Products endpoint returns information about the *Uber* products offered at a given location. The response includes the display name and other details about each product, and lists the products in the proper display order. 
 *
 * latitude Double Latitude component of location.
 * longitude Double Longitude component of location.
 * returns List
 **/
exports.productsGET = function(latitude,longitude) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "image" : "image",
  "product_id" : "product_id",
  "description" : "description",
  "display_name" : "display_name",
  "capacity" : "capacity"
}, {
  "image" : "image",
  "product_id" : "product_id",
  "description" : "description",
  "display_name" : "display_name",
  "capacity" : "capacity"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

