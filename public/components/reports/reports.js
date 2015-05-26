'use strict';


class ReportsController {
  constructor() {
    this.name = 'Hello World';
  }
}


export default angular.module('app.main', [])
  .controller('ReportsController', [ReportsController]);