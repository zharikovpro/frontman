'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var nib = require('nib');
var rupture = require('rupture');
var poststylus = require('poststylus');

var config = {
  context: path.join(__dirname, 'src'),

  entry: ['./scripts/app.js'],

  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: '/',
    filename: (NODE_ENV == 'development') ? "bundle.js" : "bundle-[hash].js"
  },

  devtool: (NODE_ENV == 'development') ? 'inline-source-map' : null,

  watch: (NODE_ENV == 'development'),

  resolveLoader: {
    modulesDirectories: ["loaders", "node_modules"],
    extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
    packageMains: ["webpackLoader", "webLoader", "loader", "main"]
  },

  module: {
    loaders: [{
        test: /\.js$/,
        exclude: [__dirname + '/node_modules'],
        loader: 'babel!eslint'
      }, {
        test: /\.styl$/,
        loader: 'style!css!stylus'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.(jpg|png|gif|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=./static/[name].[ext]'
      }, {
        test: /\.(slim|slm)$/,
        loader: 'html!slm'
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      NODE_EMV: JSON.stringify(NODE_ENV)
    }),

    new HtmlWebpackPlugin({
      template: 'templates/dice.slm',
      filename: 'index.html'
    }),

    new HtmlWebpackPlugin({
      template: 'templates/booster.slm',
      filename: 'booster.html'
    }),

    new HtmlWebpackPlugin({
      template: 'templates/affiliates.slm',
      filename: 'affiliates.html'
    }),

    new HtmlWebpackPlugin({
      template: 'templates/deposit.slm',
      filename: 'deposit.html'
    }),

    new HtmlWebpackPlugin({
      template: 'templates/error_404.slm',
      filename: 'error_404.html'
    }),

    new HtmlWebpackPlugin({
      template: 'templates/ui_kit.slm',
      filename: 'ui_kit.html'
    }),

    new HtmlWebpackPlugin({
      template: 'templates/under_maintenance.slm',
      filename: 'under_maintenance.html'
    }),

    new HtmlWebpackPlugin({
      template: 'templates/withdraw.slm',
      filename: 'withdraw.html'
    })
  ],

  eslint: {
    configFile: '.eslintrc.json'
  },

  stylus: {
    use: [
      nib(), rupture(),
      poststylus([
        require('lost'),
        require('autoprefixer')({ browser: ['last 2 version'] })
      ])
    ]
  }
};

// auto enable webpack-dev-server inline mode
// https://webpack.github.io/docs/webpack-dev-server.html#inline-mode-with-node-js-api
if (NODE_ENV == 'development') {
  config.entry.unshift('webpack-dev-server/client?http://localhost:8080/');
} else if (NODE_ENV == 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  );
}

module.exports = config;