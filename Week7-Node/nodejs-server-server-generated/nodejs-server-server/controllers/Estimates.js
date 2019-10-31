'use strict';

var utils = require('../utils/writer.js');
var Estimates = require('../service/EstimatesService');

module.exports.estimatesPriceGET = function estimatesPriceGET (req, res, next) {
  var start_latitude = req.swagger.params['start_latitude'].value;
  var start_longitude = req.swagger.params['start_longitude'].value;
  var end_latitude = req.swagger.params['end_latitude'].value;
  var end_longitude = req.swagger.params['end_longitude'].value;
  Estimates.estimatesPriceGET(start_latitude,start_longitude,end_latitude,end_longitude)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.estimatesTimeGET = function estimatesTimeGET (req, res, next) {
  var start_latitude = req.swagger.params['start_latitude'].value;
  var start_longitude = req.swagger.params['start_longitude'].value;
  var customer_uuid = req.swagger.params['customer_uuid'].value;
  var product_id = req.swagger.params['product_id'].value;
  Estimates.estimatesTimeGET(start_latitude,start_longitude,customer_uuid,product_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
