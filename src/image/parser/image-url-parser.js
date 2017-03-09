var Metadata = require('../metadata');

var handlers = {
    br: 'brightness',
    con: 'contrast',
    hue: 'hue',
    sat: 'saturation',
    blur: 'blur',
    usm: 'unsharpMask'
    // TODO: add support for JPEG
};

/**
 * @param {Image} image
 * @param {string} url
 */
function parse(image, url) {
    var explodedUrl = explodeUrl(url);
    var explodedTransformations = explodeTransformations(explodedUrl.transformations);

    image.host = explodedUrl.host;
    image.path = explodedUrl.path;
    image.metadata = parseFragment(explodedUrl.fragment);
    var pathParts = image.path.split('/');
    image.fileName = pathParts[pathParts.length - 1];

    applyGeometry(image, explodedUrl.geometry, explodedTransformations);
    applyFilters(image, explodedTransformations);
}

/**
 * @param url
 * @returns {{host: string, path: (string|*), version: *, geometry: *, transformations: *, fileName: *, query: *, fragment: *}}
 * @private
 */
function explodeUrl(url) {

    var scheme;
    var host;
    var port;
    var path;
    var version;
    var geometry;
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

    fileName = parts[parts.length - 1];
    transformations = parts[parts.length - 2];
    geometry = parts[parts.length - 3];
    version = parts[parts.length - 4];
    path = parts.splice(1, parts.length - 5).join('/');

    return {
        host: (scheme ? scheme + '://' : '//') + host + (port ? ':' + port : '') + '/',
        path: path,
        version: version,
        geometry: geometry,
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
 * @returns {Metadata|null}
 * @private
 */
function parseFragment(fragment) {
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

    return new Metadata(parseInt(exploded.w), parseInt(exploded.h), decodeURIComponent(exploded.mt));
}

/**
 * @param image
 * @param geometry
 * @param {{h: number, w: number, x: number|null, y: number|null, scl: number|null}} explodedTransformations
 * @returns {*}
 * @private
 */
function applyGeometry(image, geometry, explodedTransformations) {
    //mandatory params for all operations
    var h = explodedTransformations.h;
    var w = explodedTransformations.w;

    //mandatory params for crop
    var x = explodedTransformations.x;
    var y = explodedTransformations.y;
    var scl = explodedTransformations.scl;

    image[geometry](h[0], w[0], x ? x[0] : undefined, y ? y[0] : undefined, scl ? scl[0] : undefined);
}

/**
 * @param {Image} image
 * @param {{h: number, w: number, x: number|null, y: number|null, scl: number|null}} explodedTransformations
 * @private
 */
function applyFilters(image, explodedTransformations) {
    for (var key in explodedTransformations) {
        if (explodedTransformations.hasOwnProperty(key)) {
            var handler = handlers[key];
            if (handler) {
                image[handler].apply(this, explodedTransformations[key]);
            }
        }
    }
}


/**
 * @type {parse}
 */
module.exports = parse;