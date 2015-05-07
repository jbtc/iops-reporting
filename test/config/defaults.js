'use strict';

var config = require('../../config');

describe('Configuration', function () {

  describe('Connection Strings', function () {

    it('should be secret by default', function () {
      expect(config.connectionStrings.reporting).to.be.eql('secret');
    });

  });

  describe('Settings', function () {

    it('should have port 3000 by default', function () {
      expect(config.settings.port).to.be.eql(3000);
    });

  });


});