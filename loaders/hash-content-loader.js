const loaderUtils = require('loader-utils');
const schemaUtils = require('schema-utils');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

module.exports = function (content) {
  // Get options from webpack config
  const options = loaderUtils.getOptions(this);
  let result = content;

  // Pattern to search for <tag..src=".."..>
  const pattern = options.pattern 
    ? options.pattern
    : /(?=\S{1,3}.*?)src=\{?("|')(.*?)("|')\}?(?=.*?(\/>|<\/\S{1,3}))/misug;

  // Perform replacement on matches
  let match;
  while (match = pattern.exec(result)) {
    result = result.replace(match[0], hashPath(match, options))
  }

  return result;
};

const hashPath = function (match, options) {
  // Retrieve content from matches
  const srcAttribute = match[0];
  const srcContent = match[2];
  let filePath = srcContent;

  // Remove splash from the begining of file path
  if (filePath.startsWith('/')) {
    filePath = filePath.substring(1);
  }

  // Build file path
  if (options.publicPath) {
    // In case public folder is specified, then use it
    filePath = `${options.publicPath}/${filePath}`;
  } else {
    // In case public folder is not specified, use 'public' as its source of images 
    filePath = `${path.resolve(__dirname, '../public')}/${filePath}`;
  }

  // Generate hash from file
  const file = fs.readFileSync(filePath);

  if (file) {
    // Generate hash and trim it
    let hash = crypto.createHash('sha1').update(file).digest('hex');
    hash = hash.slice(0, options.hashLength ? options.hashLength : 8);

    // Replace src with a new hash
    const hashedSrcContent = `${srcContent}?v=${hash}`;
    const hashedSrcAttribute = srcAttribute.replace(srcContent, hashedSrcContent);

    return hashedSrcAttribute;
  } else {
    return srcAttribute;
  }
}

module.exports.raw = false;