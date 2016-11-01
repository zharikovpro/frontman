const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const nib = require('nib');
const rupture = require('rupture');
const poststylus = require('poststylus');
const lost = require('lost');
const autoprefixer = require('autoprefixer');

const config = {
  context: path.join(__dirname, 'src'),

  entry: {
    app: ['./js/app.js'],
    // mocha bundle will be attached to mocha.html to check test results in browser
    // TODO: user Karma runner instead
    //mocha: fs.readdirSync(`${__dirname}/test`).map(file => `mocha!../test/${file}`),
  },

  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: './',
    hashFunction: 'md5',
    hashDigestLength: 32,
    filename: (NODE_ENV === 'development') ? '[name].js' : '[name]-[hash].js',
  },

  devtool: (NODE_ENV === 'development') ? 'inline-source-map' : null,

  watch: (NODE_ENV === 'development'),

  resolveLoader: {
    modulesDirectories: ['loaders', 'node_modules'],
    extensions: ['', '.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
    packageMains: ['webpackLoader', 'webLoader', 'loader', 'main'],
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [`${__dirname}/node_modules`],
      loader: 'babel!eslint',
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract('style', 'css!stylus'),
    }, {
			test: /\.css$/,
			include: [`${__dirname}/src/css`],
			loader: ExtractTextPlugin.extract('style', 'css!postcss'),
		}, {
      test: /\.css$/,
      exclude: [`${__dirname}/src/css`],
			loader: ExtractTextPlugin.extract('style', 'css'),
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
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),

    new ExtractTextPlugin('[name]-[hash].css', {
      allChunks: true,
      disable: (NODE_ENV === 'development'),
    }),

    // to check test results in browser
    // TODO: user Karma runner instead
    // new HtmlWebpackPlugin({
    //   template: 'templates/_mocha.slm',
    //   filename: 'mocha.html',
    //   chunks: ['mocha'],
    // }),
  ],

  // TODO: Add option to run at will
  eslint: {
    configFile: '.eslintrc.json',
  },

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

// auto enable webpack-dev-server inline mode
// https://webpack.github.io/docs/webpack-dev-server.html#inline-mode-with-node-js-api
if (NODE_ENV === 'development') {
  config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/');
  config.output.library = 'bundle';
} else if (NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    })
  );
}

module.exports = config;
