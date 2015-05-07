'use strict';

/**
 * Sql InputParameter
 * @param name
 * @param sqlType
 * @param value
 * @constructor
 */
function Parameter(name, sqlType, value) {
  this.name = name;
  this.sqlType = sqlType;
  this.value = value;
}

module.exports = Parameter;