const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nib = require('nib');
const rupture = require('rupture');
const poststylus = require('poststylus');
const lost = require('lost');
const autoprefixer = require('autoprefixer');

module.exports = {

  devtool: 'inline-source-map',

  module: {
    preLoaders: [{
      test: /\.js$/,
      include: /src/,
      exclude: /(node_modules|__test__)/,
      loader: 'babel-istanbul',
      query: {
        cacheDirectory: true,
      },
    }],
    loaders: [{
      test: /\.js$/,
      exclude: [`${__dirname}/node_modules`],
      loader: 'babel',
    }, {
      test: /\.styl$/,
      loader: 'style!css!stylus',
    }, {
      test: /\.css$/,
      loader: 'style!css',
    }, {
      test: /\.(jpg|png|gif|svg|ttf|eot|woff|woff2)$/,
      loader: 'file?name=./static/[name].[ext]',
    }, {
      test: /\.(slim|slm)$/,
      loader: 'html!slm',
    }],
  },

  plugins: [
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      NODE_ENV: 'production',
    })
  ],

  stylus: {
    use: [
      nib(), rupture(),
      poststylus([
        lost,
        autoprefixer({
          browser: ['last 2 version'],
        }),
      ]),
    ],
  },
};
