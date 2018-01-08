const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./webpack.config.base');

config.entry = {
  index: [
    './examples/index.js'
  ]
};

if(config.output) {
  config.output.filename = '[name].[chunkhash:8].js';
}

if(config.plugins) {
  config.plugins.push(new ExtractTextPlugin('[name].[chunkhash:8].css'));
}

module.exports = config;
