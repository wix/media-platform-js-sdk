var MediaPlatform = require('../../../src/index').MediaPlatform;

function init(config) {
    if (!exports.mediaPlatform) {
        exports.mediaPlatform = new MediaPlatform(config);
    }

    return exports;
}

/**
 * @type {init}
 */
exports.init = init;