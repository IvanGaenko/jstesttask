const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoPrefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Qualium Systems Javascript test task',
      template: './src/index.html',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                AutoPrefixer({
                  browsers: ['> 1%', 'last 4 versions'],
                }),
              ],
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: ['file-loader'],
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
};
