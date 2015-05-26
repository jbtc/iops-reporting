'use strict';


var app = angular.module('app', [
  'ngNewRouter',
  'mgcrea.ngStrap',
  'angular-chartist',
  'angular-loading-bar',
  require('./components/reports/reports').name,
  require('./components/gates/gates').name,
  require('./components/plcs/plcs').name
]);


class AppController {
  constructor($router) {

  }
}

AppController.$routeConfig = [
  { path: '/', component: 'reports' },
  { path: '/gates/:name', component: 'gates' },
  { path: '/gates/:name/:plc', component: 'plcs' }
];


app.controller('AppController', ['$router', AppController]);

export default app;