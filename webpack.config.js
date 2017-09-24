const path = require('path')
const webpack = require('webpack')

const isProduction = process.env.npm_lifecycle_event === 'build'
const libraryName = require('./package').name

const config = {
  entry: './src/index.ts',
  output: {
    filename: `${libraryName}.js`,
    path: path.join(__dirname, 'lib'),
    library: 'seq',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.json'
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      }
    ]
  }
}

module.exports = config
