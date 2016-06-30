var ImageDTO = require('./image/image-dto');
var AudioDTO = require('./audio/audio-dto');
var VideoDTO = require('./video/video-dto');
var DocumentDTO = require('./document/document-dto');

/**
 * @param {{}} data
 * @returns {BaseDTO}
 */
function toDTO(data) {
    switch (data.media_type) {
        case 'picture':
            return new ImageDTO(item);
            break;
        case 'audio':
            return new AudioDTO(item);
            break;
        case 'video':
            return new VideoDTO(item);
            break;
        case 'document':
            return new DocumentDTO(item);
            break;
    }
}

module.exports = {
    toDTO: toDTO
};