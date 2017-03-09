var Metadata = require('../metadata');

/**
 * @param {Image} image
 * @param {FileMetadata} fileMetadata
 * @returns Image
 */
function parse(image, fileMetadata) {
    var type = fileMetadata.fileDescriptor.mimeType.split('/')[0].toLowerCase();
    if (type !== 'image') {
        throw new Error('file is not an image');
    }

    image.path = fileDescriptor.path;
    image.metadata = new Metadata(
        fileDescriptor.mimeType
    );
    var pathParts = image.path.split('/');
    image.fileName = pathParts[pathParts.length - 1];
}


/**
 * @type {parse}
 */
module.exports = parse;