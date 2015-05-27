'use strict';

var moment = require('moment')
  , _ = require('lodash');

var EventingModule = require('../../infrastructure/eventEmitter');
var ReportingServiceModule = require('../../infrastructure/services/reporting');
var AllFilterModule = require('../shared/allFilter/filter');


class ReportsController {
  constructor(EventEmitter, ReportingServices, AllFilterService) {
    this.emitter = EventEmitter;
    this.reporting = ReportingServices;
    this.filter = AllFilterService;
    this.performSearch();
  }

  performSearch(gate, plc, startsAt, endsAt) {
    var self = this;
    this.reporting.allBetweenDates(gate, plc, startsAt, endsAt)
      .success(function (data) {
        self.results = data;
        var keys = _.keys(_.first(data));
        keys.shift();
        self.keys = keys;
        self.tableHeaders = keys;
      });
  }
}


export default angular
  .module('app.main', [
    EventingModule.name,
    ReportingServiceModule.name,
    AllFilterModule.name
  ])
  .controller('ReportsController', [
    'EventEmitter',
    'ReportingServices',
    'AllFilterService',
    ReportsController]);