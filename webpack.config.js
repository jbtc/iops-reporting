'use strict';
var webpack = require('webpack'),
  path = require('path');

// PATHS
var PATHS = {
  app: __dirname + '/public/app',
  bower: __dirname + '/public/components'
};

module.exports = {
  context: PATHS.app,
  entry: {
    app: ['webpack/hot/dev-server', './core/bootstrap.js']
  },
  output: {
    path: PATHS.app,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel!jshint',
        exclude: /node_modules|bower_components/
      }
    ]
  }
};