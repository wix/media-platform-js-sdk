// export default function(config) {
//     config.set({
//         frameworks: ['mocha'],
//         files: [
//             'build/tests.js'
//         ],
//         browsers: ['Chrome'],
//         singleRun: true,
//         browserNoActivityTimeout: 10000
//     });
// };
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = {
  browsers: ['ChromeHeadless']
};
