'use strict';


var app = angular.module('app', [
  'ngNewRouter',
  'mgcrea.ngStrap',
  require('./components/main/main.js').name,
  require('./components/gates/gates').name
]);





class AppController {
  constructor($router) {

  }
}

AppController.$routeConfig = [
  { path: '/', component: 'main' },
  { path: '/gates/:name', component: 'gates' }
];

app.controller('AppController', ['$router', AppController]);

export default app;