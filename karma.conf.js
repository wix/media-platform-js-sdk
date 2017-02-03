module.exports = function(config) {
    config.set({
        frameworks: ['mocha'],
        files: [
            'build/tests.js'
        ],
        browsers: ['Chrome'],
        singleRun: true,
        browserNoActivityTimeout: 50000
    });
};