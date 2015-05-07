'use strict';

var nconf = require('nconf').env().argv();

nconf.defaults({
  reportingConnString: 'secret'
});


module.exports = {
  settings: {
    port: parseInt(process.env.PORT) || 3000
  },
  connectionStrings: {
    reporting: nconf.get('reportingConnString')
  }
};
