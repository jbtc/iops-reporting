'use strict';

var router = require('express').Router()
  , ReportsService = require('../lib/services/reports')
  , Moment = require('moment');

var reportingService = new ReportsService();

router.get('/:name', function (req, res, next) {

  var name = req.params.name
    , startAt = Moment(req.query.starts)
    , endsAt = Moment(req.query.ends);

  reportingService.findByGateBetweenDates(name, startAt, endsAt)
    .then(function (results) {
      res.send(results);
    })
    .catch(function (err) {
      next(err);
    })
});

router.get('/:name/:plc', function (req, res, next) {

  var name = req.params.name
    , plc = req.params.plc
    , startAt = Moment(req.query.starts)
    , endsAt = Moment(req.query.ends);

  reportingService.findByGateAndPlcBetweenDates(name, plc, startAt, endsAt)
    .then(function (results) {
      res.send(results);
    })
    .catch(function (err) {
      next(err);
    })

});


module.exports = router;