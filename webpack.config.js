const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  target: 'web',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        parser: { amd: false }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    open: false,
    host: 'localhost',
    port: 8080,
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true
  }
}
