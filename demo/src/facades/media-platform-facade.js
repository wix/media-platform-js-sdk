var MediaPlatform = require('../../../src/index').MediaPlatform;

function init(domain, appId, sharedSecret) {
    if (!exports.mediaPlatform) {
        exports.mediaPlatform = new MediaPlatform({
            domain: domain,
            appId: appId,
            sharedSecret: sharedSecret
        });
    }

    return exports;
}

/**
 * @type {init}
 */
exports.init = init;