var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer-core');
var nested = require('postcss-nested');


module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'index_[hash].js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('index_[hash].css'),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: 'index.prod.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less')
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file?name=/images/[name].[ext]'
      },
      {
        test: /\.(ttf|eot|woff)$/,
        loader: 'file?name=/map/fonts/[name].[ext]'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, nested];
  }
};
