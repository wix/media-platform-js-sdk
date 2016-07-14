var toImageRequest = require('../../../src/image/image-url-parser').toImageRequest;
var expect = require('expect.js');

describe('image url parsing', function () {

    it('fit', function () {
        toImageRequest('http://media.wixapps.net/wixmedia-samples/images/000c45e21f8a433cb3b2483dfbb659d8/v1/fit/sat_-90,neg,w_500,h_500/file.jpg');
    });

    it('crop', function () {
        toImageRequest('//media.wixapps.net/ggl-109789773458215503884/images/b2f5526bf6f3404d85d56f3b53697004/v1/crop/w_115,h_35,x_0,y_0,scl_1.2,q_75/file.jpg');
    });
});
