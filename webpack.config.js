const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: path.join(__dirname, 'src'),

  entry: {
    app: ['./js/app.js'],
  },

  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: '/',
    filename: '[name]-[hash].js',
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
      test: /\.css$/,
      include: [`${__dirname}/src/css`],
      loader: ExtractTextPlugin.extract('style', 'css!postcss'),
    }, {
      test: /\.(jpg|png|svg|gif)$/,
      loader: 'file?name=./media/images/[name].[ext]',
    }, {
      test: /\.(ttf|eot|woff|woff2)$/,
      loader: 'file?name=./media/fonts/[fonts].[ext]',
    }],
  },

  plugins: [
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),

    new ExtractTextPlugin('[name]-[hash].css', {
      allChunks: true,
    }),
  ],

  eslint: {
    configFile: '.eslintrc.json',
  },
};

// auto enable webpack-dev-server inline mode
// https://webpack.github.io/docs/webpack-dev-server.html#inline-mode-with-node-js-api
if (NODE_ENV === 'development') {
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
