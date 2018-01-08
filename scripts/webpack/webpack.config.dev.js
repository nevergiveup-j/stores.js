const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./webpack.config.base');

var rootPath = path.resolve(__dirname, '../../');

config.entry = {
  index: [
    rootPath + '/examples/index.js'
  ]
}

if(config.plugins) {
  config.plugins.push(
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({
      filename: rootPath + '/index.html',
      template: rootPath + '/examples/index.html',
      chunks: ['index'],
      inject: 'body'
    })
  );
}

config.devServer = {
  publicPath: '/',
  historyApiFallback: true,
  quiet: true,
};

module.exports = config;
