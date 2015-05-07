'use strict';

var bodyParser = require('body-parser')
  , serveStatic = require('serve-static')
  , compression = require('compression')
  , responseTime = require('response-time')
  , methodOverride = require('method-override');


module.exports.setup = function (app) {
  // Middleware
  app.use(bodyParser());
  app.use(compression());
  app.use(responseTime());
  app.use(methodOverride());
  app.use(serveStatic(__dirname + '/public'));

  app.use(function (err, req, res, next) {
    console.error(err);
    next(err);
  });
};