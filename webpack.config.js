module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    path: `${__dirname}/public/`,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}