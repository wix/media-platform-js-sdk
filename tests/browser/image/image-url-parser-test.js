var fromUrl = require('../../../src/image/image-request-deserializer').fromUrl;
var fromUrlToImageRequest = require('../../../src/image/image-request-deserializer').fromUrlToImageRequest;
var expect = require('expect.js');

describe('image url parsing', function () {

    describe('by operations', function () {
        it('fit', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,lg/fish.jpeg#w_100,h_200,mt_video/mp4');

            expect(operation.toUrl()).to.eql({
                url: 'http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,lg/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
                error: null
            });
        });

        it('canvas', function () {
            var operation = fromUrl('https://test.wix.com/user/bucket/imageId/v1/canvas/w_100,h_100,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,al_b,c_aabbcc/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

            expect(operation.toUrl()).to.eql({
                url: 'https://test.wix.com/user/bucket/imageId/v1/canvas/w_100,h_100,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,al_b,c_aabbcc/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
                error: null
            });
        });

        it('crop', function () {
            var operation = fromUrl('//test.wix.com/user/bucket/imageId/v1/crop/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_20,h_20,x_80,y_80/fish.jpeg#w_100,h_200,mt_video/mp4');

            expect(operation.toUrl()).to.eql({
                url: '//test.wix.com/user/bucket/imageId/v1/crop/w_20,h_20,x_80,y_80,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
                error: null
            });
        });

        it('fill', function () {
            var operation = fromUrl('//test.wix.com/user/bucket/imageId/v1/fill/w_100,h_100,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,al_l,lg/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

            expect(operation.toUrl()).to.eql({
                url: '//test.wix.com/user/bucket/imageId/v1/fill/w_100,h_100,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,al_l,lg/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
                error: null
            });
        });
    });

    describe('correctly handles schemes', function () {
        it('http', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

            expect(operation.toUrl()).to.eql({
                url: 'http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
                error: null
            });
        });

        it('https', function () {
            var operation = fromUrl('https://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

            expect(operation.toUrl()).to.eql({
                url: 'https://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
                error: null
            });
        });

        it('without', function () {
            var operation = fromUrl('//test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

            expect(operation.toUrl()).to.eql({
                url: '//test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
                error: null
            });
        });
    });

    describe('extract original file data', function () {

        it('handles mimeType that were not encoded', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video/mp4');

            expect(operation.toUrl()).to.eql({
                url: 'http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
                error: null
            });
        });

        it('decodes mimeType', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

            expect(operation.toUrl()).to.eql({
                url: 'http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
                error: null
            });
        });

        it('original image data fragment is mandatory', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#');

            expect(operation.toUrl()).to.eql({
                url: null,
                error: new Error('original image data is mandatory')
            });
        });

        it('ignores malformed fragment - without separator', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w,h_200,mt_video%2Fmp4');

            expect(operation.toUrl()).to.eql({
                url: null,
                error: new Error('original image data is mandatory')
            });
        });

        it('ignores malformed fragment - with separator', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_,h_200,mt_video%2Fmp4');

            expect(operation.toUrl()).to.eql({
                url: null,
                error: new Error('original image data is mandatory')
            });
        });

        it('ignores malformed fragment - missing param', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#h_200,mt_video%2Fmp4');

            expect(operation.toUrl()).to.eql({
                url: null,
                error: new Error('original image data is mandatory')
            });
        });
    });

    describe('correctly handles ports', function () {
        it('http', function () {
            var operation = fromUrl('http://test.wix.com:8080/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_10,h_10,mt_image%2Fjpeg');

            expect(operation.toUrl()).to.eql({
                url: 'http://test.wix.com:8080/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_10,h_10,mt_image%2Fjpeg',
                error: null
            });
        });
    });

    describe('can escape back to a new ImageRequest', function () {
        it('escapes', function () {
            var imageRequest = fromUrlToImageRequest('http://test.wix.com:8080/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_10,h_10,mt_image%2Fjpeg');

            expect(imageRequest.fit(100, 100).toUrl()).to.eql({
                url: 'http://test.wix.com:8080/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_10,h_10,mt_image%2Fjpeg',
                error: null
            });
        });
    });
});
