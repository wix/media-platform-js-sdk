//TODO: move to dto folder (or domain?)

/**
 * @type {{AUDIO: string, VIDEO: string, IMAGE: string, DOCUMENT: string}}
 */
var MediaType = {
    AUDIO: 'music',
    VIDEO: 'video',
    IMAGE: 'picture',
    DOCUMENT: 'document'
};

/**
 * @type {{AUDIO: string, VIDEO: string, IMAGE: string, DOCUMENT: string}}
 */
module.exports = MediaType;