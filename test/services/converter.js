'use strict';

var Formatter = require('../../lib/services/formatter');

describe('JSON -> CSV', function () {

  it('can translate JSON to CSV', function (done) {
    var example = [{ test: 'testing 1', test2: 'testing 2' }, { test: 'testing 3', test2: 'testing 4' }];
    Formatter.toCSV(example)
      .then(function (csv) {
        expect(csv).to.be.eql('test,test2\ntesting 1,testing 2\ntesting 3,testing 4\n');
        done();
      })
      .error(function (err) {
        done(err);
      });
  });

});

describe('JSON -> PDF', function () {

  it('can generate a blank html file', function (done) {
    Formatter.generatePdf({})
      .then(function (pdf) {
        expect(pdf.filename).to.not.be.empty;
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

});