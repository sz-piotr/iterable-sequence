module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'tswebpack.js',
    path: __dirname + '/lib',
    library: 'tswebpack',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.json'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
}
