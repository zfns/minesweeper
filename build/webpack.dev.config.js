var path = require('path');

module.exports = {
  entry: './frontend/scripts/entry.js',
  output: {
    path: path.resolve(__dirname, '../.tmp/scripts'),
    filename: 'bundle.js'
  }
};
