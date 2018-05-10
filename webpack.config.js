const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: { app: './src/js/app.js' },
  output: {
    filename: 'js/[name].[chunkhash].min.js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('public/assets', {allowExternal: true}),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].min.css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/template.html',
      filename: '../template.html'
    }),
    new WebpackMd5Hash()
  ]
};
