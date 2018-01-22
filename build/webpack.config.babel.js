// import CleanWebpackPlugin from 'clean-webpack-plugin'
import CordovaWebpackPlugin from 'cordova-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import WebpackShellPlugin from 'webpack-shell-plugin'
import path from 'path'
import webpack from 'webpack'
module.exports = env => {
  let cordova = !!(env && env.cordova)

  let shellScripts = {onBuildEnd: []}
  if (cordova) {
    shellScripts.onBuildEnd.push('build/cordova-build.sh')
  }

  return {
    entry: './src/site/site.js',
    // context: path.resolve(__dirname, '../'),
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
      // new CleanWebpackPlugin(['dist'], {
      //   root: process.cwd()
      // }),
      new CordovaWebpackPlugin({
        output: 'dist/cordova',
        config: 'build/cordova-config.xml',
        index: 'src/site/index.html',
        disabled: !cordova
      }),
      new webpack.ProvidePlugin({
        moment: 'moment'
      }),
      new HtmlWebpackPlugin({
        template: './src/site/index.html'
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
