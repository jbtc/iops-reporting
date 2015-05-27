'use strict';
var webpack = require('webpack')
  , path = require('path');

// PATHS
var PATHS = {
  app: __dirname + '/public',
  bower: __dirname + '/public/bower_components'
};

module.exports = {
  context: PATHS.app,
  entry: {
    //app: ['webpack/hot/dev-server','./index.js']
    app: ['./index.js']
  },
  output: {
    path: PATHS.app,
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', PATHS.bower],
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'ng-annotate!babel!jshint', exclude: /node_modules|bower_components/ },
      { test: /\.woff$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/, loader: "file-loader" },
      { test: /\.eot$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" },
      { test: /\.html/, loader: 'raw' }
    ]
  }
};