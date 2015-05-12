'use strict';

var router = require('express').Router()
  , ReportsService = require('../lib/services/reports');

var reportingService = new ReportsService();

router.get('/:name', function (req, res, next) {

  reportingService.findByGate(req.params.name)
    .then(function (results) {
      res.send(results);
    })
    .catch(function (err) {
      next(err);
    })
});


module.exports = router;