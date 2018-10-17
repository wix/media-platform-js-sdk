import {Metadata} from '../metadata';

const handlers = {
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
function parseUrl(image, url) {
  const explodedUrl = explodeUrl(url);
  const explodedTransformations = explodeTransformations(explodedUrl.transformations);

  image.host = explodedUrl.host;
  image.path = explodedUrl.path;
  image.metadata = parseFragment(explodedUrl.fragment);
  const pathParts = image.path.split('/');
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
  let scheme;
  let host;
  let port;
  let path;
  let version;
  let geometry;
  let transformations;
  let fileName;
  let query;
  let fragment;

  let parts;

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
    parts = parts[1].split('/');
  } else {
    parts = parts[0].split('/');
  }

  const loc = parts[0].split(':');
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
    path,
    version,
    geometry,
    transformations,
    fileName,
    query,
    fragment
  };
}

/**
 * @param transformations
 * @returns {{h: number, w: number, x: number|null, y: number|null, scl: number|null}}
 * @private
 */
function explodeTransformations(transformations) {
  const parts = transformations.split(',');
  const exploded = {};
  parts.forEach((transformation) => {
    const params = transformation.split('_');
    exploded[params[0]] = params.slice(1);
  });

  return exploded;
}

interface ExplodedFragment {
  w: string | null;
  h: string | null;
  mt: string | null;
}

/**
 * @param {string} fragment
 * @returns {Metadata|null}
 * @private
 */
function parseFragment(fragment: string): Metadata | null {
  if (!fragment) {
    return null;
  }

  const parts = fragment.split(',');
  const exploded: Partial<ExplodedFragment> = {};

  parts.forEach((part) => {
    const params = part.split('_');

    if (params.length >= 2 && params[1] !== '') {
      exploded[params[0]] = params.slice(1)[0];
    }
  });

  if (!exploded.w || !exploded.h || !exploded.mt) {
    return null;
  }

  return new Metadata(parseInt(exploded.w, 10), parseInt(exploded.h, 10), decodeURIComponent(exploded.mt));
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
  const h = explodedTransformations.h;
  const w = explodedTransformations.w;

  //mandatory params for crop
  const x = explodedTransformations.x;
  const y = explodedTransformations.y;
  const scl = explodedTransformations.scl;

  image[geometry](h[0], w[0], x ? x[0] : undefined, y ? y[0] : undefined, scl ? scl[0] : undefined);
}

/**
 * @param {Image} image
 * @param {{h: number, w: number, x: number|null, y: number|null, scl: number|null}} explodedTransformations
 * @private
 */
function applyFilters(image, explodedTransformations) {
  for (const key in explodedTransformations) {
    if (explodedTransformations.hasOwnProperty(key)) {
      const handler = handlers[key];

      if (handler) {
        // tslint:disable-next-line
        image[handler].apply(this, explodedTransformations[key]);
      }
    }
  }
}

/**
 * @type {parseUrl}
 */
export default parseUrl;
export {parseUrl};
