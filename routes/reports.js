'use strict';

var router = require('express').Router()
  , Moment = require('moment')
  , ReportsService = require('../lib/services/reports');

var reportingService = new ReportsService();

router.get('/', function (req, res, next) {

  var endDate = Moment(req.params.endDate || Moment()).toDate()
    , startDate = Moment(req.params.startDate || Moment(endDate).add(1, 'day')).toDate();

  reportingService.findBetweenDates(startDate, endDate)
    .then(function (results) {
      res.send(results);
    })
    .catch(function (err) {
      next(err);
    })
});


module.exports = router;