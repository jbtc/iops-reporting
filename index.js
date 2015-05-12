'use strict';

var express = require('express')
  , config = require('./config')
  , middleware = require('./config/middleware')
  , app = express()
  , router = require('./config/router');

app.set('root', __dirname);

middleware.setup(app);

router.route(app);

var port = config.settings.port;
var server = app.listen(port, function () {

  var host = server.address().address
    , port = server.address().port;

  console.log('App started at http://%s:%s', host, port);
});


module.exports = app;