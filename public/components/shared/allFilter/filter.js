'use strict';

//AllFilterController


var EventingModule = require('../../../infrastructure/eventEmitter')
  , moment = require('moment')
  , _ = require('lodash');

class AllFilterService {
  constructor($aside) {
    this.aside = $aside;
    this.filter = $aside({
      title: 'Filter',
      template: 'components/shared/dateFilter/filter.html',
      show: false
    });
  }

  show() {
    var self = this;
    this.filter.$promise
      .then(function () {
        self.filter.show();
      });
  }

  hide() {
    var self = this;
    this.filter.$promise
      .then(function () {
        self.filter.hide();
      });
  }

  toggle() {
    var self = this;
    this.filter.$promise
      .then(function () {
        self.filter.toggle();
      });
  }
}

class AllFilterController {
  constructor(EventEmitter, DateFilterService) {
    this.emitter = EventEmitter;
    this.dateFilters = [
      {
        name: 'Today',
        start: moment(moment().format('YYYY-MM-DD')).toDate(),
        end: moment().toDate()
      },
      {
        name: 'Yesterday',
        start: moment(moment().format('YYYY-MM-DD')).subtract(1, 'day').toDate(),
        end: moment(moment().format('YYYY-MM-DD')).subtract(1, 'day').add(23, 'hours').add('59', 'minutes').toDate()
      },
      {
        name: 'Last Week',
        start: moment().subtract(7, 'days').toDate(),
        end: moment().toDate()
      },
      {
        name: 'Last Month',
        start: moment().subtract(1, 'month').toDate(),
        end: moment().toDate()
      },
      {
        name: 'Last Year',
        start: moment().subtract(1, 'year').toDate(),
        end: moment().toDate()
      },
      {
        name: 'Year to Date',
        start: moment(moment().format('YYYY-01-01')).toDate(),
        end: moment().toDate()
      },
      {
        name: 'All',
        start: moment().subtract(10, 'years').toDate(),
        end: moment().toDate()
      }
    ];
    this.filter = DateFilterService;
    this.selectedDateFilter = _.first(this.dateFilters);
  }

  apply() {
    this.emitter.fire('filter:byDate', { filter: this.selectedDateFilter });
    this.filter.hide();
  }
}


export default angular.module('app.shared.allFilter', [EventingModule.name])
  .controller('AllFilterController', ['EventEmitter', 'AllFilterService', AllFilterController])
  .service('AllFilterService', ['$aside', AllFilterService]);
