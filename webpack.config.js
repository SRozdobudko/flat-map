var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');


module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000/',
    'webpack/hot/dev-server',
    './src/index.js'
  ],
  devtool: 'cheap-source-map',
  output: {
    path: path.join(__dirname, 'static'),
    publicPath: '/static/',
    filename: 'index.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file?name=images/[name].[ext]'
      },
    ]
  },
  postcss: [
    autoprefixer,
  ]
};
