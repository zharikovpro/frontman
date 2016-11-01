const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const ignore = require('metalsmith-ignore');

const webpack = require('ms-webpack');
const webpackConfig = require('./webpack.config.js');

// TODO: const assets = require('metalsmith-assets');

// TODO: .clean if NODE_ENV=='production'

// TODO: build scripts bundle with WebPack

// TODO: build styles bundle with PostCSS

metalsmith(__dirname)
  .metadata({
    title: 'FrontMan',
    description: 'Rapid front-end development',
    generator: 'Metalsmith',
  })
  .use(webpack(webpackConfig))
  .source('./src/html')
  .destination('./build')
  .use(ignore(['layouts/*', 'partials/*']))
  .use(layouts({
    engine: 'handlebars',
    directory: './src/html/layouts',
    partials: './src/html/partials',
    default: 'default.hbs',
    pattern: '*.hbs',
    rename: true,
  }))
  .build((err) => {
    if (err) { throw err; }
  });
