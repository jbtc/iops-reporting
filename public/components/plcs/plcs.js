'use strict';

var moment = require('moment')
  , _ = require('lodash');

var EventingModule = require('../../infrastructure/eventEmitter')
  , DateFilterModule = require('../shared/dateFilter/filter')
  , ReportingServiceModule = require('../../infrastructure/services/reporting');

class PlcsController {

  constructor($routeParams, EventEmitter, ReportingServices, DateFilterService) {
    this.gate = ($routeParams.name || '').toUpperCase();
    this.plc = ($routeParams.plc || '').toUpperCase();
    this.filter = DateFilterService;
    this.emitter = EventEmitter;
    this.reporting = ReportingServices;


    var startsAt = moment(moment().format('YYYY-MM-DD')).toDate()
      , endsAt = moment().toDate();

    var self = this;
    this.performSearch(this.gate, this.plc, startsAt, endsAt);
    this.emitter.on('data:plc:byDate', function (e, data) {
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
      self.performSearch(self.gate, self.plc, data.filter.start, data.filter.end);
    });
  }

  toggleFilter() {
    this.filter.show();
  }

  performSearch(gate, plc, startsAt, endsAt) {
    this.reporting.plcByNameAndDate(gate, plc, startsAt, endsAt);
  }
}


export default angular
  .module('app.plcs', [
    EventingModule.name,
    ReportingServiceModule.name,
    DateFilterModule.name
  ])
  .controller('PlcsController', [
    '$routeParams',
    'EventEmitter',
    'ReportingServices',
    'DateFilterService',
    PlcsController]);