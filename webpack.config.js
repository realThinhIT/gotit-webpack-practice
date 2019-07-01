const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'hash-content-loader',
            options: {
              hashLength: 8 // default is 8 already
            }
          },
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
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'public', to: '.' },
      { from: 'src/index.html', to: '.' }
    ])
  ]
};