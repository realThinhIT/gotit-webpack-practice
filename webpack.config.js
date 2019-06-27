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


  // Define resolveLoader to resolve paths to custom loaders
  resolveLoader: {
    modules: [
      
    ]
  }
};