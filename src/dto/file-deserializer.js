var ImageDTO = require('./image/image-dto');
var AudioDTO = require('./audio/audio-dto');
var VideoDTO = require('./video/video-dto');
var DocumentDTO = require('./document/document-dto');
var MediaType = require('./media-type');

/**
 * @param {{}} data
 * @returns {BaseDTO}
 */
function toDTO(data) {
    switch (data.media_type) {
        case MediaType.IMAGE:
            return new ImageDTO(data);
            break;
        case MediaType.AUDIO:
            return new AudioDTO(data);
            break;
        case MediaType.VIDEO:
            return new VideoDTO(data);
            break;
        case MediaType.DOCUMENT:
            return new DocumentDTO(data);
            break;
    }
}

module.exports = {
    toDTO: toDTO
};