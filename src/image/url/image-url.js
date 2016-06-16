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
};