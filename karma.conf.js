const webpackConfig = require('./karma.webpack.config');

module.exports = config => {
  config.set({

    basePath: __dirname,

    coverageReporter: {
      dir: 'tmp/coverage/',
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },

    frameworks: [
      'chai',
      'jasmine'
    ],

    files: [
      'src/**/*.spec.js',
    ],

    exclude: [],

    preprocessors: {
      'src/**/*.spec.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha', 'coverage'],
    // reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity,

    webpack: webpackConfig,

    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-webpack',
      'karma-jasmine',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',

      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ],

    webpackMiddleware: {
      stats: 'errors-only',
      noInfo: true
    },
  });
};
