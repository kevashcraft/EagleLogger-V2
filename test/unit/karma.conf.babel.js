// import webpack from '../../build/webpack.config.babel.js'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

let chrome = process.env.TRAVIS ? 'Chrome_travis_ci' : 'Chrome'

export default (config) => {
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

    webpack: {
      entry: './src/site/site.js',
      output: {
        publicPath: '/',
        filename: '[name]-[hash].js'
      },
      module: {
        rules: [
          {
            test: /\.vue$/i,
            use: 'vue-loader'
          }, {
            test: /\.css$/i,
            use: [
              'style-loader',
              'css-loader'
            ]
          }, {
            test: /\.scss$/i,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader'
            ]
          }, {
            test: /\.(jpe?g|gif|ttf|woff|woff2|eot)$/i,
            use: 'file-loader?name=[path][name].[ext]'
          }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|semantic)/
          }, {
            test: /\.(png|svg)$/i,
            use: 'url-loader?name=[path][name].[ext]'
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: 'src/site/index.html'
        })
      ],
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, '..', '..', 'src')
        }
      }
    },
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
