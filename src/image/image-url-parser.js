var ImageRequest = require('./image-request');
var OriginalImageData = require('./operation/original-image-data');

//maps the URL transformation name to the operation function name. Replace with handler registrar?
//TODO: add support for JPEG settings
var handlers = {
    br: 'brightness',
    al: 'alignment',
    c: 'background',
    con: 'contrast',
    hue: 'hue',
    sat: 'saturation',
    blur: 'blur',
    neg: 'negative',
    oil: 'oil',
    pix: 'pixelate',
    pixfs: 'pixelateFaces',
    eye: 'removeRedEye',
    shrp : 'sharpen',
    usm: 'unsharpMask',
    lg: 'enableUpscale'
};

/**
 * @param {string} url
 * @returns {BaseOperation}
 */
function toImageRequest(url) {

    var explodedUrl = explodeUrl(url);
    var explodedTransformations = explodeTransformations(explodedUrl.transformations);
    var originalFileData = extractOriginalFileData(explodedUrl.fragment);
    var imageRequest = new ImageRequest(toBaseUrl(explodedUrl), explodedUrl.imageId, decodeURIComponent(explodedUrl.fileName), originalFileData);
    var operation = applyOperation(imageRequest, explodedUrl.operation, explodedTransformations);
    applyTransformations(operation, explodedTransformations);

    return operation;
}

/**
 * @param url
 * @returns {{scheme: *, host: *, port: *, bucket: *, folder: *, imageId: *, version: *, operation: *, transformations: *, fileName: *, query: *, fragment: *}}
 * @private
 */
function explodeUrl(url) {

    var scheme;
    var host;
    var port;
    var bucket;
    var folder;
    var imageId;
    var version;
    var operation;
    var transformations;
    var fileName;
    var query;
    var fragment;

    var parts;

    parts = url.split('#');
    if (parts.length > 1) {
        fragment = parts[parts.length - 1];
    }

    parts = parts[0].split('?');
    if (parts.length > 1) {
        query = parts[parts.length - 1];
    }

    parts = parts[0].split('//');
    if (parts.length > 1) {
        scheme = parts[0].replace(':', '');
        parts = parts[1].split('/')
    } else {
        parts = parts[0].split('/')
    }

    var loc = parts[0].split(':');
    if (loc.length > 1) {
        port = loc[1];
    }
    host = loc[0];

    bucket = parts[1];
    folder = parts[2];
    imageId = parts[3];
    version = parts[4];
    operation = parts[5];
    transformations = parts[6];
    fileName = parts[7];

    return {
        scheme: scheme,
        host: host,
        port: port,
        bucket: bucket,
        folder: folder,
        imageId: imageId,
        version: version,
        operation: operation,
        transformations: transformations,
        fileName: fileName,
        query: query,
        fragment: fragment
    }
}

/**
 * @param transformations
 * @returns {{h: number, w: number, x: number|null, y: number|null, scl: number|null}}
 * @private
 */
function explodeTransformations(transformations) {
    var parts = transformations.split(',');
    var exploded  = {};
    parts.forEach(function (transformation) {
        var params = transformation.split('_');
        exploded[params[0]] = params.slice(1);
    });

    return exploded;
}

/**
 * @param {string} fragment
 * @returns {OriginalImageData|null}
 * @private
 */
function extractOriginalFileData(fragment) {
    if (!fragment) {
        return null;
    }

    var parts = fragment.split(',');
    var exploded  = {};
    parts.forEach(function (part) {
        var params = part.split('_');
        if (params.length >= 2 && params[1] != '') {
            exploded[params[0]] = params.slice(1)[0];
        }
    });

    if (!exploded.w || !exploded.h || !exploded.mt) {
        return null;
    }

    return new OriginalImageData(parseInt(exploded.w), parseInt(exploded.h), decodeURIComponent(exploded.mt));
}

/**
 * @param imageRequest
 * @param operation
 * @param {{h: number, w: number, x: number|null, y: number|null, scl: number|null}} explodedTransformations
 * @returns {*}
 * @private
 */
function applyOperation(imageRequest, operation, explodedTransformations) {

    //mandatory params for all operations
    var h = explodedTransformations.h;
    var w = explodedTransformations.w;

    //mandatory params for crop
    var x = explodedTransformations.x;
    var y = explodedTransformations.y;
    var scl = explodedTransformations.scl;

    return imageRequest[operation](h[0], w[0], x ? x[0] : undefined, y ? y[0] : undefined, scl ? scl[0] : undefined);
}

/**
 * @param {BaseOperation} operation
 * @param {{h: number, w: number, x: number|null, y: number|null, scl: number|null}} explodedTransformations
 * @private
 */
function applyTransformations(operation, explodedTransformations) {

    for (var key in explodedTransformations) {
        if (explodedTransformations.hasOwnProperty(key)) {
            var handler = handlers[key];
            if (handler) {
                operation[handler].apply(this, explodedTransformations[key]);
            }
        }
    }
}

/**
 * @param {{scheme: *, host: *, port: *, bucket: *, folder: *, imageId: *, version: *, operation: *, transformations: *, fileName: *, query: *, fragment: *}} explodedUrl
 * @returns {string}
 * @private
 */
function toBaseUrl(explodedUrl) {
    return (explodedUrl.scheme ? explodedUrl.scheme + '://' : '//') +
        explodedUrl.host + (explodedUrl.port ? ':' + explodedUrl.port : '') + '/' +
        explodedUrl.bucket + '/' +
        explodedUrl.folder + '/'
}

/**
 * @type {{toImageRequest: toImageRequest}}
 */
module.exports = {
    toImageRequest: toImageRequest
};