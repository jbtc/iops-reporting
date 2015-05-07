'use strict';

var config = require('../../config');

describe('Configuration', function () {

  describe('Settings', function () {

    it('should have port 3000 by default', function () {
      expect(config.settings.port).to.be.eql(3000);
    });

  });

  describe('Connections', function () {

    describe('Reporting', function () {

      it('should have have valid connection configuration', function () {
        var reporting = {
          user: 'iopsadmin',
          password: 'i0ps2@15',
          server: '69.60.110.252',
          database: 'Airport_CID_Term1_Zone1',
          options: {
            instanceName: 'IOPSNOW',
            appName: 'iops-reporting'
          }
        };

        expect(config.connections.reporting).to.be.eql(reporting);
      })

    });

  });

});