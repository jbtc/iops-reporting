'use strict';


class MainController {
  constructor() {
    this.name = 'Hello World 1';
  }
}


export default angular.module('app.main', [])
  .controller('MainController', [MainController]);