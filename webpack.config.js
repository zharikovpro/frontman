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

  entry: {
    app: ['./scripts/app.js'],
    mocha: ['mocha!../test/path.js', 'mocha!../test/board.js']
  },

  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: '/',
    filename: (NODE_ENV == 'development') ? "[name].js" : "[name]-[hash].js"
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
        loader: 'babel'
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
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),

    // TODO: iterate through all top-level files inside templates
    new HtmlWebpackPlugin({
      template: 'templates/index.slm',
      filename: 'index.html',
      chunks: ['app']
    }),

    new HtmlWebpackPlugin({
      template: 'templates/mocha.slm',
      filename: 'mocha.html',
      chunks: ['mocha']
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
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/');
  config.output.library = 'bundle';
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