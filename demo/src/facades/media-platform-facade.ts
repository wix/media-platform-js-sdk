import {MediaPlatform} from '../../../src/main';

let mediaPlatform;

export function init(config) {
    if (!mediaPlatform) {
        mediaPlatform = new MediaPlatform(config);
    }

    return mediaPlatform;
}

export {mediaPlatform};
