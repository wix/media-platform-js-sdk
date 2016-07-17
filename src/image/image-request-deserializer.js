var ImageRequest = require('./image-request');
var urlParser = require('./image-url-parser');

/**
 * @param {string} host
 * @param {ImageDTO} imageDto
 * @returns ImageRequest
 */
function fromDto (host, imageDto) {
    var parts = imageDto.fileUrl.split('/');
    var bucket = parts[0] + '/' + parts[1];
    var baseUrl = host + bucket;
    var imageId = imageDto.fileName;
    var imageName = imageDto.originalFileName;

    return new ImageRequest(baseUrl, imageId, imageName);
}

/**
 * @param {string} url
 * @returns ImageRequest
 */
function fromUrl (url) {
    return urlParser.toImageRequest(url);
}

//TODO: add fromUploadResponse

/**
 * @type {{fromDTO: fromDTO, fromURL: fromUrl}}
 */
module.exports = {
    fromDto: fromDto,
    fromUrl: fromUrl
};