'use strict';

var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var converter = Promise.promisifyAll(require('json-2-csv'));
var pdf = Promise.promisifyAll(require('html-pdf'));
var handlebars = require('handlebars');
var _ = require('lodash');

var currentDirectory = process.env.PWD || process.cwd() || __dirname;

module.exports.toCSV = function (data) {
  return Promise.resolve(converter.json2csvAsync(data));
};

module.exports.generatePdf = function (data) {
  var fileName = path.resolve(__dirname, '../../config/templates/alarms-pdf.html');
  var html = fs.readFileSync(fileName, 'utf8');
  var template = handlebars.compile(html);

  var columns = [];
  var keys = [];
  if (_.isArray(data) && data.length > 0) {
    var row = _.first(data);
    keys = _.keys(row);
    columns.push(keys); // For possible formatting later
  }
  return pdf
    .createAsync(template({ keys: keys, columns: columns, payload: data }), { format: 'Tabloid', orientation: 'landscape', border: '0.5in' })
    .then(function (result) {
      return Promise.resolve(result);
    });
};