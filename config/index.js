'use strict';

var nconf = require('nconf').env().argv();

module.exports = {
  settings: {
    port: parseInt(process.env.PORT) || 3000
  },
  connections: {
    reporting: {
      user: nconf.get('sql-username'),
      password: nconf.get('sql-password'),
      server: nconf.get('sql-server'),
      database: 'Airport_CID_Term1_Zone1',
      options: {
        instanceName: nconf.get('sql-instance-name'),
        appName: 'iops-reporting'
      }
    }
  }
};