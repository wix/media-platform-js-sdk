var Metadata = require('../metadata');

/**
 * @param {Image} image
 * @param {FileDescriptor} fileDescriptor
 * @returns Image
 */
function parse(image, fileDescriptor) {
    image.path = fileDescriptor.path;
    image.metadata = new Metadata(
        fileDescriptor.metadata.width,
        fileDescriptor.metadata.height,
        fileDescriptor.mimeType
    );
    var pathParts = image.path.split('/');
    image.fileName = pathParts[pathParts.length - 1];
}


/**
 * @type {parse}
 */
module.exports = parse;