'use strict';

var bodyParser = require('body-parser')
  , serveStatic = require('serve-static')
  , compression = require('compression')
  , responseTime = require('response-time')
  , methodOverride = require('method-override');


module.exports.setup = function (app) {
  // Middleware
  app.use(bodyParser.json());
  app.use(compression());
  app.use(responseTime());
  app.use(methodOverride());
  app.use(serveStatic(app.get('root') + '/public'));

  app.use(function (err, req, res, next) {
    console.error(err);
    next(err);
  });
};