var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './frontend/scripts/entry.js',
  output: {
    path: path.resolve(__dirname, '../.tmp/scripts'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};
