"use strict";
var webpack = require('webpack');

module.exports = {
  entry: __dirname + "/src/ts/index.ts",
  output: {
    filename: "atomic-package.js",
    path: __dirname + "/public/js/"
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
};
