var path = require('path');

module.exports = {
  // Define entrypoints
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js')
  },

  // Define where bundled files go 
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  // Define module rules
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'my-loader',
            options: {
              name: '[name].[ext]?ver=[hash:8]',
              outputPath: './assets',
              publicPath: '/assets'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'my-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  // Define resolveLoader to resolve paths to custom loaders
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  }
};