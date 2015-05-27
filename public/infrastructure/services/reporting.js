'use strict';

var EventEmitter = require('../eventEmitter')
  , Moment = require('moment');


class ReportingServices {


  constructor($http, EventEmitter) {
    this.http = $http;
    this.emitter = EventEmitter;
  }

  allBetweenDates(gate, plc, startsAt, endsAt) {
    startsAt = new Moment().subtract(1, 'day').toISOString();
    endsAt = new Moment().toISOString();

    var uri = '/v1/reports' + ReportingServices.buildDateQueryString(startsAt, endsAt);
    if (gate) {
      uri += '&gate=' + gate;
    }
    if (plc) {
      uri += '&plc=' + plc;
    }
    return this.http.get(uri);
  }

  gateByNameAndDates(name, startsAt, endsAt) {
    var self = this;
    return this.http.get('/v1/gates/' + name.toLowerCase() + ReportingServices.buildDateQueryString(startsAt, endsAt))
      .success(function (data) {
        self.emitter.fire('data:gates:byDate', data);
      });
  }

  plcByNameAndDate(gate, plc, startsAt, endsAt) {
    var self = this;
    var uri = '/v1/gates/' + gate.toLowerCase() + '/' + plc.toLowerCase() + ReportingServices.buildDateQueryString(startsAt, endsAt);
    this.http.get(uri)
      .success(function (data) {
        self.emitter.fire('data:plc:byDate', data);
      });
  }

  static buildDateQueryString(startsAt, endsAt) {
    return '?starts=' + new Moment(startsAt).toISOString() + '&ends=' + new Moment(endsAt).toISOString();
  }
}


export default angular
  .module('core.services.reporting', [EventEmitter.name])
  .service('ReportingServices', ['$http', 'EventEmitter', ReportingServices]);

