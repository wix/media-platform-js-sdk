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
            return new ImageDTO(data);
            break;
        case 'audio':
            return new AudioDTO(data);
            break;
        case 'video':
            return new VideoDTO(data);
            break;
        case 'document':
            return new DocumentDTO(data);
            break;
    }
}

module.exports = {
    toDTO: toDTO
};