'use strict';

var Moment = require('moment')
  , Sql = require('mssql')
  , SqlManager = require('../../lib/infrastructure/sql/manager')
  , SqlParam = SqlManager.InputParameter;

describe('Sql Manager', function () {

  describe('With Defaults', function () {

    var manager;
    before(function () {
      manager = new SqlManager();
      expect(manager).to.be.ok;
    });

    describe('#query', function () {

      it('should be able to get the top row from DB', function (done) {

        manager.execute('SELECT TOP 1 * FROM ALARM')
          .then(function (recordset) {
            expect(recordset).to.be.ok;
            expect(recordset.length).to.be.eql(1);

            done();
          }).catch(function (err) {
            done(err);
          });
      });

      it('should be able to find data between dates with params', function (done) {

        var params = [
          new SqlParam('startDate', Sql.DateTime2, Moment('2015-04-19').toDate()),
          new SqlParam('endDate', Sql.DateTime2, Moment('2015-05-04').toDate())
        ];

        manager.execute('SELECT * FROM ALARM WHERE DateAndTime BETWEEN @startDate AND @endDate', params)
          .then(function (results) {
            expect(results.length).to.be.eql(54);
            done();
          }).catch(function (err) {
            done(err);
          });
      });

    });

  });


});