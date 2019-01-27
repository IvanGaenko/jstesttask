const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 8,
          compress: {
            inline: 1,
            keep_fnames: false,
          },
        },
      }),
    ],
  },
});
