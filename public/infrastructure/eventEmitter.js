'use strict';

var eventing = angular.module('core.eventing', []);

class EventEmitter {
  constructor($rootScope) {
    this.root = $rootScope;
  }

  fire(name, payload) {
    payload = payload || {};
    this.root.$broadcast(name, payload);
  }

  on(name, callback) {
    this.root.$on(name, function (e, data) {
      callback(e, data);
    });
  }
}


eventing.service('EventEmitter', ['$rootScope', EventEmitter]);

export default eventing;