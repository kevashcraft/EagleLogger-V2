import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

module.exports = {
  entry: './src/site/site.js',
  output: {
    path: path.resolve(__dirname, '../dist/site'),
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
    new webpack.ProvidePlugin({
      moment: 'moment'
    }),
    new HtmlWebpackPlugin({
      template: './src/site/index.html'
    }),
    new CopyWebpackPlugin([
      {from: './src/site/static', flatten: true}
    ]),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}
