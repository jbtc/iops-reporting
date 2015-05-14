'use strict';

var Path = require('path')
  , FS = require('fs')
  , NConf = require('nconf').argv().env();

var devEnvSettings = Path.resolve(__dirname, '../', '.dev.json');
if (FS.existsSync(devEnvSettings)) {
  NConf.file(devEnvSettings);
}

module.exports = {
  settings: {
    port: parseInt(process.env.PORT) || 3000
  },
  connections: {
    reporting: {
      user: NConf.get('SQL_USERNAME'),
      password: NConf.get('SQL_PASSWORD'),
      server: NConf.get('SQL_SERVER'),
      database: 'Airport_CID_Term1_Zone1',
      options: {
        instanceName: NConf.get('SQL_INSTANCE'),
        appName: 'iops-reporting'
      }
    }
  }
};