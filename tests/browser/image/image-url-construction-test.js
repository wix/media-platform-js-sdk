var Image = require('../../../src/image/image');
var expect = require('expect.js');

describe('image url construction', function () {

    describe('protocol prefixing', function () {

        it('prefixes "//" if scheme is not defined', function () {
            var result = new Image('test.wix.com', '12345', 'fish.jpeg').canvas(100, 100)
                .toUrl();

            expect(result).to.eql({ url: '//test.wix.com/12345/v1/w_100,h_100/fish.jpeg',
                error: null });
        });

        it('accepts "https"', function () {
            var result = new Image('https://test.wix.com', '12345', 'fish.jpeg').canvas(100, 100)
                .toUrl();

            expect(result.url).to.be('https://test.wix.com/12345/v1/w_100,h_100/fish.jpeg');
        });

        it('accepts "http"', function () {
            var result = new Image('http://test.wix.com', '12345', 'fish.jpeg').canvas(100, 100)
                .toUrl();

            expect(result.url).to.be('http://test.wix.com/12345/v1/w_100,h_100/fish.jpeg');
        });

        it('accepts "//"', function () {
            var result = new Image('//test.wix.com', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(result.url).to.be('//test.wix.com/12345/v1/w_100,h_100/fish.jpeg');
        });

        it('strips trailing "/"s from base url', function () {
            var result = new Image('http://test.wix.com/', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(result.url).to.be('http://test.wix.com/12345/v1/w_100,h_100/fish.jpeg');
        });

        it('ignores base URL if omitted', function () {
            var result = new Image('', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(result.url).to.be('/12345/v1/w_100,h_100/fish.jpeg');
        });
    });

    describe('handles input errors', function () {
        it('collects errors into a single Error instance', function () {
            var result = new Image('//test.wix.com', '12345', 'fish.jpeg').canvas()
                .size(10, 10)
                .jpeg(200, true)
                .unsharpMask(-1, 10, 10)
                .sharpen(-10)
                .removeRedEye()
                .pixelateFaces(3)
                .pixelate(3)
                .oil()
                .negative()
                .blur(10)
                .saturation(500)
                .hue(60)
                .contrast(12)
                .brightness(99)
                .alignment('some crap')
                .background('aabbcc')
                .toUrl();

            expect(result.url).to.be(null);
            expect(result.error.message).to.be('saturation: 500 is not a number between -100 to 100,sharpen radius: -10 is not a number between 0 to 1,unsharp mask radius: -1 is not a number between 0.1 to 500,jpeg compression quality: 200 is not a number between 0 to 100,align: some crap is not a valid alignment value - see alignments.js for valid values');
        })
    });

    describe('by operation, including image instance reuse', function () {

        var image = new Image('//test.wix.com', '12345', 'fish.jpeg');

        it('canvas operation', function () {

            var Alignments = require('../../../src/image/operation/align/alignments');

            var result = image.canvas()
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

            expect(result.url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,al_b,c_aabbcc/fish.jpeg');
            expect(result.error).to.be(null);
        });
        it('crop operation', function () {
            var result = image.crop(100, 100)
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
                .coordinates(100, 100, 0.7)
                .toUrl();

            expect(result.url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,x_100,y_100,scl_0.7/fish.jpeg');
            expect(result.error).to.be(null);
        });
        it('fill operation', function () {
            var result = image.fill(50, 50)
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
                .enableUpscale()
                .toUrl();

            expect(result.url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,al_l,lg/fish.jpeg');
            expect(result.error).to.be(null);
        });
        it('fit operation', function () {
            var result = image.fit()
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
                .enableUpscale()
                .toUrl();

            expect(result.url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,lg/fish.jpeg');
            expect(result.error).to.be(null);
        });

        it('preserves parameter order', function () {
            var result1 = image.fit()
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
                .contrast(90)
                .brightness(99)
                .enableUpscale(true)
                .toUrl();

            var result2 = image.fit()
                .negative()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(0.7)
                .removeRedEye()
                .enableUpscale()
                .pixelateFaces(3)
                .pixelate(3)
                .contrast(90)
                .oil()
                .blur(10)
                .saturation(-70)
                .hue(60)
                .brightness(99)
                .toUrl();

            expect(result1.url).to.be(result2.url);
        });
    });
});
