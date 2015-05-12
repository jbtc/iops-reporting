'use strict';

var reports = require('../routes/reports')
  , gateReports = require('../routes/gates');

module.exports.route = function (app) {
  app.use('/v1/reports', reports);
  app.use('/v1/gates', gateReports)
};