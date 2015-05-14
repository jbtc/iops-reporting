'use strict';

module.exports = function () {
  global._ = require('lodash');
  global.$ = global.jQuery = require('jquery');

  require('angular');
  require('angular-new-router');
  require('angular-strap');
  require('angular-resource');
  require('angular-chartist.js');
  require('angular-loading-bar');

};