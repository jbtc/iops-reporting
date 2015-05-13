'use strict';

module.exports = function () {
  require('./styles/app.scss');

  require('angular');
  require('angular-new-router');

  global.$ = global.jQuery = require('jquery');

  require('angular-strap');
};