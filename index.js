'use strict';

var express = require('express')
  , config = require('./config')
  , middleware = require('./config/middleware');

var app = express();

middleware.setup(app);

var port = config.settings.port;
var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('App started at http://%s:%s', host, port);
});


module.exports = app;
