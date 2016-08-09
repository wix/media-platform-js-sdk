var fromUrl = require('../../../src/image/image-request-deserializer').fromUrl;
var expect = require('expect.js');

describe('image url parsing', function () {

    describe('by operations', function () {
        it('fit', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,lg/fish.jpeg');

            expect(operation.toUrl()).to.eql({
                url: 'http://test.wix.com/user/bucket/imageId/v1/fit/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,w_100,h_100,lg/fish.jpeg',
                error: null
            });
        });

        it('canvas', function () {
            var operation = fromUrl('https://test.wix.com/user/bucket/imageId/v1/canvas/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,al_b,c_aabbcc/fish.jpeg');

            expect(operation.toUrl()).to.eql({
                url: 'https://test.wix.com/user/bucket/imageId/v1/canvas/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,w_100,h_100,al_b,c_aabbcc/fish.jpeg',
                error: null
            });
        });

        it('crop', function () {
            var operation = fromUrl('//test.wix.com/user/bucket/imageId/v1/crop/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,x_80,y_80/fish.jpeg');

            expect(operation.toUrl()).to.eql({
                url: '//test.wix.com/user/bucket/imageId/v1/crop/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,w_100,h_100,x_80,y_80/fish.jpeg',
                error: null
            });
        });

        it('fill', function () {
            var operation = fromUrl('//test.wix.com/user/bucket/imageId/v1/fill/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,al_l,lg/fish.jpeg');

            expect(operation.toUrl()).to.eql({
                url: '//test.wix.com/user/bucket/imageId/v1/fill/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,w_100,h_100,al_l,lg/fish.jpeg',
                error: null
            });
        });
    });

    describe('correctly handles schemes', function () {
        it('http', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg');

            expect(operation.toUrl()).to.eql({
                url: 'http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg',
                error: null
            });
        });

        it('https', function () {
            var operation = fromUrl('https://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg');

            expect(operation.toUrl()).to.eql({
                url: 'https://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg',
                error: null
            });
        });

        it('without', function () {
            var operation = fromUrl('//test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg');

            expect(operation.toUrl()).to.eql({
                url: '//test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg',
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

        it('ignores empty fragment', function () {
            var operation = fromUrl('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#');

            expect(operation.toUrl()).to.eql({
                url: 'http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg',
                error: null
            });
        });
    });

    describe('correctly handles ports', function () {
        it('http', function () {
            var operation = fromUrl('http://test.wix.com:8080/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg');

            expect(operation.toUrl()).to.eql({
                url: 'http://test.wix.com:8080/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg',
                error: null
            });
        });
    });
});
