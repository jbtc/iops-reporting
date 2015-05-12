'use strict';

var Path = require('path');



var nconf = require('nconf').argv().env();
nconf.file(Path.resolve(__dirname, '../.dev.json'));


module.exports = {
  settings: {
    port: parseInt(process.env.PORT) || 3000
  },
  connections: {
    reporting: {
      user: nconf.get('SQL_USERNAME'),
      password: nconf.get('SQL_PASSWORD'),
      server: nconf.get('SQL_SERVER'),
      database: 'Airport_CID_Term1_Zone1',
      options: {
        instanceName: nconf.get('SQL_INSTANCE'),
        appName: 'iops-reporting'
      }
    }
  }
};

