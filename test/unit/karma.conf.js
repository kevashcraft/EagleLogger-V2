import webpack from '../../webpack.config.babel.js'

let chrome = process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'specs/*.spec.js'
    ],
    preprocessors: {
      'specs/*.spec.js': ['webpack', 'coverage']
    },
    plugins: [
      'karma-mocha',
      'karma-chai',

      'karma-coverage',

      'karma-webpack',
      'karma-sourcemap-loader',

      'karma-chrome-launcher',

      'karma-babel-preprocessor'
    ],

    webpack,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: [chrome],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: false,
    concurrency: Infinity,
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  })
}
