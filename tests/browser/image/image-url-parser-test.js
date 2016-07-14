var toImageRequest = require('../../../src/image/image-url-parser').toImageRequest;
var expect = require('expect.js');

describe('image url parsing', function () {

    it('fit', function () {
        toImageRequest('//test.wix.com/user/bucket/12345/v1/fit/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,lg/fish.jpeg');
    });

    it('crop', function () {
        toImageRequest('//media.wixapps.net/ggl-109789773458215503884/images/b2f5526bf6f3404d85d56f3b53697004/v1/crop/w_115,h_35,x_0,y_0,scl_1.2,q_75/file.jpg');
    });
});
