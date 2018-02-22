import {MediaPlatform} from '../../../src';

let mediaPlatform;

export function init(config) {
    if (!mediaPlatform) {
        mediaPlatform = new MediaPlatform(config);
    }

    return mediaPlatform;
}

export {mediaPlatform};
