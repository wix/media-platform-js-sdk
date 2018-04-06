process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = {
  browsers: ['ChromeHeadless']
};
