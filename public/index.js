'use strict';

require('./vendor.js')();

var app = require('./app.js');

angular.element(document).ready(function () {
  angular.bootstrap(document, [app.name], {

  });
});