'use strict';

var Moment = require('moment')
  , Promise = require('bluebird')
  , Sql = require('mssql')
  , _ = require('lodash')
  , Errors = require('common-errors')
  , SqlManager = require('../infrastructure/sql/manager')
  , SqlParam = SqlManager.InputParameter;

var GATES = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
var PLCS = ['GPU', 'PBB', 'PCA'];

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

ReportingService.prototype.findBy = function (gate, plc, startDate, endDate) {

  endDate = (endDate || Moment()).toDate();
  startDate = (startDate || Moment(endDate).add(1, 'day')).toDate();

  var params = [
    new SqlParam('startDate', Sql.DateTime2, startDate),
    new SqlParam('endDate', Sql.DateTime2, endDate)
  ];

  var query = 'SELECT * FROM ALARM WHERE DateAndTime BETWEEN @startDate AND @endDate ORDER BY DateAndTime DESC';
  if (gate) {
    query = ' SELECT * FROM view_gate_' + gate + ' WHERE DateAndTime BETWEEN @startDate AND @endDate ORDER BY DateAndTime DESC';
  }
  if (gate && plc) {
    query = 'SELECT * FROM view_gate_' + gate + '_' + plc + ' WHERE DateAndTime BETWEEN @startDate AND @endDate ORDER BY DateAndTime DESC';
  }

  return this.manager.execute(query, params);
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

  endDate = (endDate || Moment()).toDate();
  startDate = (startDate || Moment(endDate).add(1, 'day')).toDate();

  var params = [
    new SqlParam('startDate', Sql.DateTime2, startDate),
    new SqlParam('endDate', Sql.DateTime2, endDate),
    new SqlParam('pageIndex', Sql.Int, pageIndex || 0),
    new SqlParam('pageSize', Sql.Int, pageSize || this.pageSize)
  ];
  return this.manager.execute('SELECT * FROM ALARM WHERE DateAndTime BETWEEN @startDate AND @endDate ORDER BY DateAndTime DESC OFFSET @pageIndex ROWS FETCH NEXT @pageSize ROWS ONLY', params);
};

ReportingService.prototype.findByGate = function (name, pageIndex, pageSize) {
  name = (name || '').toUpperCase();

  if (!_.contains(GATES, name.toUpperCase())) {
    var validationError = new Errors.ValidationError();
    validationError.addError(new Errors.ValidationError('Gate was invalid.'));
    return Promise.reject(validationError);
  }

  var params = [
    new SqlParam('pageIndex', Sql.Int, pageIndex || 0),
    new SqlParam('pageSize', Sql.Int, pageSize || this.pageSize)
  ];

  return this.manager.execute('SELECT * FROM view_gate_' + name + ' ORDER BY DateAndTime DESC OFFSET @pageIndex ROWS FETCH NEXT @pageSize ROWS ONLY', params);
};

ReportingService.prototype.findByGateBetweenDates = function (name, startDate, endDate) {

  endDate = (endDate || Moment()).toDate();
  startDate = (startDate || Moment(endDate).add(1, 'day')).toDate();

  if (!_.contains(GATES, name.toUpperCase())) {
    var validationError = new Errors.ValidationError();
    validationError.addError(new Errors.ValidationError('Gate was invalid.'));
    return Promise.reject(validationError);
  }

  var params = [
    new SqlParam('startDate', Sql.DateTime2, startDate),
    new SqlParam('endDate', Sql.DateTime2, endDate)
  ];

  return this.manager.execute('SELECT * FROM view_gate_' + name + ' WHERE DateAndTime BETWEEN @startDate AND @endDate ORDER BY DateAndTime DESC', params);
};

ReportingService.prototype.findByGateAndPlcBetweenDates = function (name, plc, startDate, endDate) {

  endDate = (endDate || Moment()).toDate();
  startDate = (startDate || Moment(endDate).add(1, 'day')).toDate();

  var errors = [];
  if (!_.contains(GATES, name.toUpperCase())) {
    errors.push(new Errors.ValidationError('Gate was invalid.'));
  }

  if (!_.contains(PLCS, plc.toUpperCase())) {
    errors.push(new Errors.ValidationError('PLC was invalid.'));
  }
  if (errors.length > 0) {
    var validationError = new Errors.ValidationError();
    validationError.addErrors(errors);
    return Promise.reject(validationError);
  }

  var params = [
    new SqlParam('startDate', Sql.DateTime2, startDate),
    new SqlParam('endDate', Sql.DateTime2, endDate)
  ];

  return this.manager.execute('SELECT * FROM view_gate_' + name + '_' + plc + ' WHERE DateAndTime BETWEEN @startDate AND @endDate ORDER BY DateAndTime DESC', params);
};

module.exports = ReportingService;