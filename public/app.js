'use strict';


var app = angular.module('app', [
  'ngNewRouter',
  'mgcrea.ngStrap',
  'angular-chartist',
  'angular-loading-bar',
  require('./components/main/main').name,
  require('./components/gates/gates').name,
  require('./components/plcs/plcs').name
]);


class AppController {
  constructor($router) {

  }
}

AppController.$routeConfig = [
  { path: '/', component: 'main' },
  { path: '/gates/:name', component: 'gates' },
  { path: '/gates/:name/:plc', component: 'plcs' }
];


app.controller('AppController', ['$router', AppController]);

export default app;