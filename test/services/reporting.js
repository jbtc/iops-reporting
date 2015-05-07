'use strict';

var ReportingServices = require('../../lib/services/reporting')
  , Moment = require('moment');

describe('Reporting Services', function () {

  var reportingServices;
  before(function () {
    reportingServices = new ReportingServices();
    expect(reportingServices).to.be.ok;
  });

  describe('#findBetweenDates()', function () {

    it('should be able to find data with default query', function (done) {
      reportingServices.findBetweenDates()
        .then(function (results) {
          expect(results).to.be.ok;
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('should be able to find data when dates are provided', function (done) {

      var startDate = Moment('2015-04-19').toDate();
      var endDate = Moment('2015-05-04').toDate();

      reportingServices.findBetweenDates(startDate, endDate)
        .then(function (results) {
          expect(results).to.be.ok;
          expect(results.length).to.be.eql(54);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('should be able to restrict data based on pageSize', function (done) {
      var startDate = Moment('2015-04-19').toDate();
      var endDate = Moment('2015-05-04').toDate();

      reportingServices.findBetweenDates(startDate, endDate, 0, 10)
        .then(function (results) {
          expect(results).to.be.ok;
          expect(results.length).to.be.eql(10);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('should be able to restrict data based on pageIndex', function (done) {
      var startDate = Moment('2015-04-19').toDate();
      var endDate = Moment('2015-05-04').toDate();

      reportingServices.findBetweenDates(startDate, endDate, 0, 10)
        .then(function (results) {
          expect(results).to.be.ok;
          expect(results.length).to.be.eql(10);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });


  });

});