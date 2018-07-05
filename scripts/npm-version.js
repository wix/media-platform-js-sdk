const util = require('util');
const path = require('path');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const packageJSONPath = path.resolve(__dirname, '..', 'package.json');
const packageJSON = require(packageJSONPath);

// NOTE: pattern for string like 'https://static.parastorage.com/unpkg/media-platform-js-sdk@6.0.0-alpha.25/dist/statics/media-platform.bundle.min.js'
const UNPKG_URL_REPLACE_PATTERN = /(https:\/\/static\.parastorage\.com\/unpkg)\/([\w-]+)@(\d+\.\d+\.\d+(?:-\w+(?:\.\d+)?)?)\/(.+)/gi;

function replaceUnpkgVersion(markdownString, version) {
  return markdownString.replace(
    UNPKG_URL_REPLACE_PATTERN,
    `$1/$2@${version}/$4`,
  );
}

function updateVersionInMarkdown(filePath) {
  return readFile(filePath).then(content =>
    writeFile(
      filePath,
      replaceUnpkgVersion(content.toString(), packageJSON.version),
    ),
  );
}

const FILES_TO_UPDATE = [
  path.resolve(__dirname, '../README.md'),
  path.resolve(__dirname, '../docs/index.md'),
];

Promise.all(
  FILES_TO_UPDATE.map(filePath => updateVersionInMarkdown(filePath)),
).catch(error => {
  console.error('ERROR: Unable to update version in `md` files', error);
  process.exit(1);
});
