'use strict';

var Moment = require('moment')
  , Promise = require('bluebird')
  , Sql = require('mssql')
  , SqlManager = require('../infrastructure/sql/manager')
  , SqlParam = SqlManager.InputParameter;

function ReportingService() {
  this.pageSize = 100;
  this.manager = new SqlManager();
}

ReportingService.prototype.find = function (pageIndex, pageSize) {
  var params = [
    new SqlParam('pageIndex', Sql.Int, pageIndex || 0),
    new SqlParam('pageSize', Sql.Int, pageSize || this.pageSize)
  ];
  return this.manager.execute('SELECT * FROM ALARM ORDER BY DateAndTime DESC OFFSET @pageIndex ROWS FETCH NEXT @pageSize ROWS ONLY', params);
};

/**
 * Find alarms between certain dates
 *
 * @param startDate
 * @param endDate
 * @param pageIndex
 * @param pageSize
 * @returns {Promise.<U>}
 */
ReportingService.prototype.findBetweenDates = function (startDate, endDate, pageIndex, pageSize) {

  endDate = endDate || Moment();
  startDate = startDate || Moment(endDate).add(1, 'day');

  var params = [
    new SqlParam('startDate', Sql.DateTime2, startDate),
    new SqlParam('endDate', Sql.DateTime2, endDate),
    new SqlParam('pageIndex', Sql.Int, pageIndex || 0),
    new SqlParam('pageSize', Sql.Int, pageSize || this.pageSize)
  ];
  return this.manager.execute('SELECT * FROM ALARM WHERE DateAndTime BETWEEN @startDate AND @endDate ORDER BY DateAndTime DESC OFFSET @pageIndex ROWS FETCH NEXT @pageSize ROWS ONLY', params);
};

ReportingService.prototype.findByGate = function (name, pageIndex, pageSize) {

  var params = [
    new SqlParam('pageIndex', Sql.Int, pageIndex || 0),
    new SqlParam('pageSize', Sql.Int, pageSize || this.pageSize)
  ];

  return this.manager.execute('SELECT * FROM view_gate_' + name + ' ORDER BY DateAndTime DESC OFFSET @pageIndex ROWS FETCH NEXT @pageSize ROWS ONLY', params);
};

module.exports = ReportingService;