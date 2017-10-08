module.exports = {
  devtool: '#source-map',
  entry: './public/app.jsx',
  output: {
    path: './public/bin',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /(\.jsx$)|(\.js$)/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
}

