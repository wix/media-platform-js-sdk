var ImageRequest = require('./image-request');
var urlParser = require('./image-url-parser');
var OriginalImageData = require('./operation/original-image-data');

/**
 * @param {string} host
 * @param {ImageDTO} imageDto
 * @returns ImageRequest
 */
function fromDto(host, imageDto) {
    var baseUrl = host + (imageDto.baseUrl ? "/" + imageDto.baseUrl : '');
    var imageId = imageDto.fileName;
    var imageName = imageDto.originalFileName;
    var originalImageData = new OriginalImageData(imageDto.width, imageDto.height, imageDto.mimeType);

    return new ImageRequest(baseUrl, imageId, imageName, originalImageData);
}

/**
 * @param {string} url
 * @returns BaseOperation
 */
function fromUrl(url) {
    return urlParser.toImageRequest(url);
}

/**
 * @param {string} url
 * @returns ImageRequest
 */
function fromUrlToImageRequest(url) {
    var operation = fromUrl(url);

    return new ImageRequest(operation.baseUrl, operation.imageId, operation.imageName, operation.originalImageData);
}

//TODO: add fromUploadResponse

/**
 * @type {{fromDto: fromDto, fromUrl: fromUrl, fromUrlToImageRequest: fromUrlToImageRequest}}
 */
module.exports = {
    fromDto: fromDto,
    fromUrl: fromUrl,
    fromUrlToImageRequest: fromUrlToImageRequest
};