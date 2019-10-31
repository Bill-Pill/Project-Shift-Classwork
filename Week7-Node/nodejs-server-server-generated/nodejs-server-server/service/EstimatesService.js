'use strict';


/**
 * Price Estimates
 * The Price Estimates endpoint returns an estimated price range for each product offered at a given location. The price estimate is provided as a formatted string with the full price range and the localized currency symbol.<br><br>The response also includes low and high estimates, and the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) currency code for situations requiring currency conversion. When surge is active for a particular product, its surge_multiplier will be greater than 1, but the price estimate already factors in this multiplier. 
 *
 * start_latitude Double Latitude component of start location.
 * start_longitude Double Longitude component of start location.
 * end_latitude Double Latitude component of end location.
 * end_longitude Double Longitude component of end location.
 * returns List
 **/
exports.estimatesPriceGET = function(start_latitude,start_longitude,end_latitude,end_longitude) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "high_estimate" : 6.02745618307040320615897144307382404804229736328125,
  "product_id" : "product_id",
  "low_estimate" : 0.80082819046101150206595775671303272247314453125,
  "surge_multiplier" : 1.46581298050294517310021547018550336360931396484375,
  "estimate" : "estimate",
  "display_name" : "display_name",
  "currency_code" : "currency_code"
}, {
  "high_estimate" : 6.02745618307040320615897144307382404804229736328125,
  "product_id" : "product_id",
  "low_estimate" : 0.80082819046101150206595775671303272247314453125,
  "surge_multiplier" : 1.46581298050294517310021547018550336360931396484375,
  "estimate" : "estimate",
  "display_name" : "display_name",
  "currency_code" : "currency_code"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Time Estimates
 * The Time Estimates endpoint returns ETAs for all products offered at a given location, with the responses expressed as integers in seconds. We recommend that this endpoint be called every minute to provide the most accurate, up-to-date ETAs.
 *
 * start_latitude Double Latitude component of start location.
 * start_longitude Double Longitude component of start location.
 * customer_uuid UUID Unique customer identifier to be used for experience customization. (optional)
 * product_id String Unique identifier representing a specific product for a given latitude & longitude. (optional)
 * returns List
 **/
exports.estimatesTimeGET = function(start_latitude,start_longitude,customer_uuid,product_id) {
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

