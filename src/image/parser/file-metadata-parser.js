var Metadata = require('../metadata');
var parseFileDescriptor = require('./file-descriptor-parser');

/**
 * @param {Image} image
 * @param {FileMetadata} fileMetadata
 * @returns Image
 */
function parse(image, fileMetadata) {
    parseFileDescriptor(image, fileMetadata.fileDescriptor);

    if (fileMetadata.basic) {
        image.metadata = new Metadata(
            fileMetadata.basic.width,
            fileMetadata.basic.height,
            fileMetadata.fileDescriptor.mimeType);
    }
}

/**
 * @type {parse}
 */
module.exports = parse;