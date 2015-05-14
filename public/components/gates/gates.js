'use strict';

var moment = require('moment')
  , _ = require('lodash');

var EventingModule = require('../../infrastructure/eventEmitter')
  , DateFilterModule = require('../shared/dateFilter/filter')
  , ReportingServiceModule = require('../../infrastructure/services/reporting');

class GatesController {

  constructor($routeParams, EventEmitter, ReportingServices, DateFilterService) {
    this.name = ($routeParams.name || '').toUpperCase();
    this.filter = DateFilterService;
    this.emitter = EventEmitter;
    this.reporting = ReportingServices;


    var startsAt = moment(moment().format('YYYY-MM-DD')).toDate()
      , endsAt = moment().toDate();

    var self = this;
    this.performSearch(this.name, startsAt, endsAt);
    this.emitter.on('data:gates:byDate', function (e, data) {
      self.results = data;
      var keys = _.keys(_.first(data));
      keys.shift();
      self.keys = keys;
      self.tableHeaders = _.map(keys, function (key) {
        var index = key.indexOf('_Alarm_');
        return key.substring(index + 7).replace('_Alarm', '');
      });
    });

    this.emitter.on('filter:byDate', function (e, data) {
      self.performSearch(self.name, data.filter.start, data.filter.end);
    });
  }

  toggleFilter() {
    this.filter.show();
  }

  performSearch(name, startsAt, endsAt) {
    this.reporting.gateByNameAndDates(name, startsAt, endsAt);
  }
}


export default angular
  .module('app.gates', [
    EventingModule.name,
    ReportingServiceModule.name,
    DateFilterModule.name
  ])
  .controller('GatesController', [
    '$routeParams',
    'EventEmitter',
    'ReportingServices',
    'DateFilterService',
    GatesController]);