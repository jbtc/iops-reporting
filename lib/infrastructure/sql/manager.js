'use strict';

var Promise = require('bluebird')
  , Sql = require('mssql')
  , _ = require('lodash')
  , config = require('../../../config');

Promise.promisifyAll(Sql);


/**
 * Sql Manager
 *
 * @param {object} [configuration]
 * @constructor
 */
function Manager(configuration) {
  configuration = _.defaults(config.connections.reporting, configuration || {});

  Object.defineProperties(this, {
    configuration: { enumerable: true, configurable: false, value: configuration },
    connection: {
      enumerable: false,
      get: function () {
        return new Sql.Connection(this.configuration);
      }
    }
  });
}

/**
 * Executes a naked sql command or a parametrized query
 *
 * @param {string} command
 * @param {Array<InputParameter>} [params]
 * @returns {Promise<U>}
 */
Manager.prototype.execute = function (command, params) {
  var connection = this.connection;
  params = params || [];
  return Promise.resolve(connection.connect())
    .then(function () {
      var request = new Sql.Request(connection);
      _.forEach(params, function (param) {
        request.input(param.name, param.sqlType, param.value);
      });
      return request.queryAsync(command).then(function (rs) {
        connection.close();
        return Promise.resolve(rs);
      });
    });
};


module.exports = Manager;
module.exports.InputParameter = require('./params/input');
