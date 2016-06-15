/**
 * @param operation
 * @returns {string}
 */
function toUrl(operation) {
    var prefix = '';
    var baseUrl = operation.baseUrl;
    if (baseUrl !== null) {
        if (baseUrl.length > 4 && baseUrl.substring(0, 4) !== "http") {
            if (baseUrl.substring(0, 2) !== '//') {
                prefix = '//';
            }
        }

        if (baseUrl.slice(-1) === '/') {
            baseUrl = baseUrl.slice(0, -1);
        }
    }

    var out = prefix + baseUrl + "/" + operation.imageId + "/" + operation.version + '/';

    var params = operation.serialize();

    return out + params + "/" + operation.imageName;
}
//
// function fromUrl(url) {
//     var data = imageUrlParser.parse(url);
//     var image = null, filter = null, adjust = null;
//     if (data.api) {
//         if (data.api.hasOwnProperty('fit')) {
//             image = new Fit(data.baseUrl, data.imageId, data.version, data.api.fit, data.api.filter, data.api.adjust).name(data.imageName);
//         } else if (data.api.hasOwnProperty('canvas')) {
//             image = new Canvas(data.baseUrl, data.imageId, data.version, data.api.canvas, data.api.filter, data.api.adjust).name(data.imageName);
//         } else if (data.api.hasOwnProperty('fill')) {
//             image = new Fill(data.baseUrl, data.imageId, data.version, data.api.fill, data.api.filter, data.api.adjust).name(data.imageName);
//         } else if (data.api.hasOwnProperty('crop')) {
//             image = new Crop(data.baseUrl, data.imageId, data.version, data.api.crop, data.api.filter, data.api.adjust).name(data.imageName);
//         }
//         if (image === null) {
//             return filter !== null ? filter : adjust;
//         }
//     }
//     return image;
// }

module.exports = {
    toUrl: toUrl
};