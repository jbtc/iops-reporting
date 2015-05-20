'use strict';

var router = require('express').Router();
var Moment = require('moment');
var ReportsService = require('../lib/services/reports');

var reportingService = new ReportsService();
var formatter = require('../lib/services/formatter');

router.get('/', function (req, res, next) {

  var endDate = Moment(req.query.ends);
  var startDate = Moment(req.query.starts).subtract(1, 'day');
  var exportKind = (req.query.export || 'json').toLowerCase();

  reportingService.findBetweenDates(startDate, endDate)
    .then(function (results) {

      switch (exportKind) {
        case 'csv':
          return formatter.toCSV(results)
            .then(function (csv) {
              return res.send(csv);
            });
        case 'pdf':
          return formatter.generatePdf(results)
            .then(function (pdf) {
              res.sendFile(pdf.filename);
            });
          return res.send(formatter.generatePdf(results))
        default :
          return res.send(results);
      }
    })
    .catch(function (err) {
      next(err);
    })
});


module.exports = router;