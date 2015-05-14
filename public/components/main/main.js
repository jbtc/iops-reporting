'use strict';

var main = angular.module('app.main', []);

class MainController {
  constructor() {
    this.name = 'Hello World';
  }
}

main.controller('MainController', [MainController]);

export default main;