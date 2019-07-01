var path = require('path');

var loaderUtils = require('loader-utils');
var validateOptions = require('schema-utils');

var schema = require('./options.json');

module.exports = function (content) {
  const options = loaderUtils.getOptions(this) || {};

  validateOptions(schema, options, 'My Loader');

  const context = options.context || this.rootContext;

  const url = loaderUtils.interpolateName(this, options.name, {
    context,
    content
  });

  let outputPath = url;

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url, this.resourcePath, context);
    } else {
      outputPath = path.posix.join(options.outputPath, url);
    }
  }

  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(url, this.resourcePath, context);
    } else {
      publicPath = `${
        options.publicPath.endsWith('/')
          ? options.publicPath
          : `${options.publicPath}/`
      }${url}`;
    }

    publicPath = JSON.stringify(publicPath);
  }

  // Copy file to dist folder
  this.emitFile(outputPath, content);

  // Export as a module
  return `module.exports = ${publicPath};`;
}

// Export as Buffer
module.exports.raw = true;
