import CleanWebpackPlugin from 'clean-webpack-plugin'
import CordovaWebpackPlugin from 'cordova-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import WebpackShellPlugin from 'webpack-shell-plugin'
import { execSync } from 'child_process'
import path from 'path'
import webpack from 'webpack'
module.exports = env => {
  // most recent version of the program
  let appVersion = execSync('git describe').toString().replace(/\r?\n|\r/g
, '')
  // api server
  let apiServer = execSync('printf "$API_SERVER"').toString()
  if (!apiServer.length) {
    if (env && env.production) {
      apiServer = 'http://eaglelogger.com:40801'
    } else {
      apiServer = 'http://localhost:40801'
    }
  }
  console.log('apiServer', '--' + apiServer + '--')

  let cordova = !!(env && env.cordova)

  let cordovaSuffix = cordova ? '-cordova' : ''

  let shellScripts = {onBuildEnd: []}
  if (cordova) {
    let CORD_ENV = env.production ? 'production' : 'devel'
    shellScripts.onBuildEnd.push(`build/cordova-build.sh ${CORD_ENV}`)
  }

  return {
    entry: './src/site/site.js',
    output: {
      path: path.resolve(__dirname, '../dist/site'),
      publicPath: cordova ? '' : '/',
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
      new CleanWebpackPlugin(['dist/cordova'], {
        root: process.cwd()
      }),
      new CordovaWebpackPlugin({
        output: 'dist/cordova',
        config: 'build/cordova-config.xml',
        index: 'src/site/index-cordova.html',
        disabled: !cordova
      }),
      new webpack.DefinePlugin({
        'API_SERVER': `"${apiServer}"`,
        'APP_VERSION': `"${appVersion}"`
      }),
      new webpack.ProvidePlugin({
        moment: 'moment'
      }),
      new HtmlWebpackPlugin({
        template: `./src/site/index${cordovaSuffix}.html`
      }),
      new CopyWebpackPlugin([
        {from: './src/site/static', flatten: true}
      ]),
      new webpack.NamedModulesPlugin(),
      new WebpackShellPlugin(shellScripts)
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, '../src')
      }
    }
  }
}
