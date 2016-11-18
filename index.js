require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV || 'development';

const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const ignore = require('metalsmith-ignore');
const inject = require('metalsmith-inject').default;
const postcss = require('metalsmith-postcss');
const fingerprint = require('metalsmith-fingerprint-ignore');
const browserSync = require('metalsmith-browser-sync');
const webpack = require('ms-webpack');
const assets = require('metalsmith-assets');
const prefixoid = require('metalsmith-prefixoid');

/*===========| Options:start |===========*/
const webpackConfig = require('./webpack.config.js');
const postcssConfig = require('./postcss.config.js');

let prefixoidOptions = [
  { tag: 'a', attr: 'href' },
  { tag: 'script', attr: 'src' },
  { tag: 'link', attr: 'href' },
  { tag: 'img', attr: 'src' },
];

prefixoidOptions = prefixoidOptions.map((value) => Object.assign({}, value, {
  convert_relatives: true,
  prefix: process.env.BASE_URL || './',
}));
/*============| Options:end |============*/

// TODO: .clean if NODE_ENV=='production'

const ms = metalsmith(__dirname);

ms.source('./src/html');
ms.destination('./build');
ms.metadata({
  title: 'FrontMan',
  description: 'Rapid front-end development',
  generator: 'Metalsmith',
});

ms.use(assets({
  source: './src/media/',
  destination: './media/',
}));

ms.use(webpack(webpackConfig));

ms.use(inject({
  paths: ['./src/css'],
}));
ms.use(postcss(postcssConfig));

ms.use(fingerprint({
  pattern: '*.css',
}));

ms.use(ignore(['layouts/*', 'partials/*']));
ms.use(layouts({
  engine: 'handlebars',
  directory: './src/html/layouts',
  partials: './src/html/partials',
  default: 'default.hbs',
  pattern: '*.hbs',
  rename: true,
}));

ms.use(prefixoid(prefixoidOptions));

if (NODE_ENV === 'development') {
  ms.use(browserSync({
    server: './build',
    files: ['./src/**/*.*'],
  }));
}

ms.build((err) => {
  if (err) { throw err; }
});
