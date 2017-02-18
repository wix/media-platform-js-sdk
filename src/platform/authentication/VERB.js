var NS = require('./NS');

/**
 * @type {{
 *     FILE_UPLOAD: string,
 *     FILE_CREATE: string,
 *     FILE_GET: string,
 *     FILE_LIST: string,
 *     FILE_DOWNLOAD: string,
 *     FILE_DELETE: string
 * }}
 */
module.exports = {
    FILE_UPLOAD: NS.SERVICE + 'file.upload',
    FILE_CREATE: NS.SERVICE + 'file.create',
    FILE_GET: NS.SERVICE + 'file.get',
    FILE_LIST: NS.SERVICE + 'file.list',
    FILE_DOWNLOAD: NS.SERVICE + 'file.download',
    FILE_DELETE: NS.SERVICE + 'file.delete'
};