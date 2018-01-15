const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/app.ts',
  output: {
    path: `${__dirname}/dist/`,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './dist/'),
    port: 3000
  }
}