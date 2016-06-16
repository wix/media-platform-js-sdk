var Image = require('../../../src/image/image');
var expect = require('expect.js');

describe('image url construction', function () {

    describe('protocol prefixing', function () {

        it('prefixes "//" if scheme is not defined', function () {
            var url = new Image('test.wix.com', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(url).to.be('//test.wix.com/12345/v1/w_100,h_100/fish.jpeg');
        });

        it('accepts "https"', function () {
            var url = new Image('https://test.wix.com', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(url).to.be('https://test.wix.com/12345/v1/w_100,h_100/fish.jpeg');
        });

        it('accepts "http"', function () {
            var url = new Image('http://test.wix.com', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(url).to.be('http://test.wix.com/12345/v1/w_100,h_100/fish.jpeg');
        });

        it('accepts "//"', function () {
            var url = new Image('//test.wix.com', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(url).to.be('//test.wix.com/12345/v1/w_100,h_100/fish.jpeg');
        });

        it('strips trailing "/"s from base url', function () {
            var url = new Image('http://test.wix.com/', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(url).to.be('http://test.wix.com/12345/v1/w_100,h_100/fish.jpeg');
        });

        it('ignores base URL if omitted', function () {
            var url = new Image('', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(url).to.be('/12345/v1/w_100,h_100/fish.jpeg');
        });
    });

    describe('by operation, including image instance reuse', function () {

        var image = new Image('//test.wix.com', '12345', 'fish.jpeg');

        it('canvas operation', function () {

            var Alignments = require('../../../src/image/operation/align/alignments');

            var url = image.canvas()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(0.7)
                .removeRedEye()
                .pixelateFaces(3)
                .pixelate(3)
                .oil()
                .negative()
                .blur(10)
                .saturation(-70)
                .hue(60)
                .contrast(12)
                .brightness(99)
                .alignment(Alignments.BOTTOM)
                .background('aabbcc')
                .toUrl();

            expect(url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,al_b,c_aabbcc/fish.jpeg');
        });
        it('crop operation', function () {
            var url = image.crop()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(0.7)
                .removeRedEye()
                .pixelateFaces(3)
                .pixelate(3)
                .oil()
                .negative()
                .blur(10)
                .saturation(-70)
                .hue(60)
                .contrast(12)
                .brightness(99)
                .dimensions(100, 100, 0.7)
                .toUrl();

            expect(url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,x_100,y_100,scl_0.7/fish.jpeg');
        });
        it('fill operation', function () {
            var url = image.fill()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(0.7)
                .removeRedEye()
                .pixelateFaces(3)
                .pixelate(3)
                .oil()
                .negative()
                .blur(10)
                .saturation(-70)
                .hue(60)
                .contrast(12)
                .brightness(99)
                .alignment('l')
                .configuration(true)
                .toUrl();

            expect(url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,al_l,lg/fish.jpeg');
        });
        it('fit operation', function () {
            var url = image.fit()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(0.7)
                .removeRedEye()
                .pixelateFaces(3)
                .pixelate(3)
                .oil()
                .negative()
                .blur(10)
                .saturation(-70)
                .hue(60)
                .contrast(12)
                .brightness(99)
                .configuration(true)
                .toUrl();

            expect(url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,lg/fish.jpeg');
        });

        it('preserves parameter order', function () {
            var url1 = image.fit()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(0.7)
                .removeRedEye()
                .pixelateFaces(3)
                .pixelate(3)
                .oil()
                .negative()
                .blur(10)
                .saturation(-70)
                .hue(60)
                .contrast(12)
                .brightness(99)
                .configuration(true)
                .toUrl();

            var url2 = image.fit()
                .negative()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(0.7)
                .removeRedEye()
                .configuration(true)
                .pixelateFaces(3)
                .pixelate(3)
                .contrast(12)
                .oil()
                .blur(10)
                .saturation(-70)
                .hue(60)
                .brightness(99)
                .toUrl();

            expect(url1).to.be(url2);
        });
    });
});
