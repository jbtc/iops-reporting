'use strict';

var EventEmitter = require('../eventEmitter')
  , Moment = require('moment');


class ReportingServices {


  constructor($http, EventEmitter) {
    this.http = $http;
    this.emitter = EventEmitter;
  }

  allBetweenDates(startsAt, endsAt) {

  }

  gateByNameAndDates(name, startsAt, endsAt) {
    var self = this;
    return this.http.get('/v1/gates/' + name.toLowerCase() + this.buildDateQueryString(startsAt, endsAt))
      .success(function (data) {
        self.emitter.fire('data:gates:byDate', data);
      });
  }

  plcByNameAndDate(gate, plc, startsAt, endsAt) {
    var self = this;
    this.http.get('/v1/gates/' + gate.toLowerCase() + '/' + plc.toLowerCase() + this.buildDateQueryString(startsAt, endsAt))
      .success(function (data) {
        self.emitter.fire('data:plc:byDate', data);
      });
  }

  buildDateQueryString(startsAt, endsAt) {
    return '?starts=' + Moment(startsAt).toISOString() + '&ends=' + Moment(endsAt).toISOString();
  }
}


export default angular.module('core.services.reporting', [EventEmitter.name])
  .service('ReportingServices', ['$http', 'EventEmitter', ReportingServices]);

