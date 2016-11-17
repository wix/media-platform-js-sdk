var ImageRequest = require('../../../src/image/image-request');
var OriginalFileData = require('../../../src/image/operation/technical/original-file-data');
var expect = require('expect.js');

describe('image url construction', function () {

    describe('protocol prefixing', function () {

        it('prefixes "//" if scheme is not defined', function () {
            var result = new ImageRequest('test.wix.com', '12345', 'fish.jpeg').canvas(100, 100)
                .toUrl();

            expect(result).to.eql({ url: '//test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg',
                error: null });
        });

        it('accepts "https"', function () {
            var result = new ImageRequest('https://test.wix.com', '12345', 'fish.jpeg').canvas(100, 100)
                .toUrl();

            expect(result.url).to.be('https://test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg');
        });

        it('accepts "http"', function () {
            var result = new ImageRequest('http://test.wix.com', '12345', 'fish.jpeg').canvas(100, 100)
                .toUrl();

            expect(result.url).to.be('http://test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg');
        });

        it('accepts "//"', function () {
            var result = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(result.url).to.be('//test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg');
        });

        it('strips trailing "/"s from base url', function () {
            var result = new ImageRequest('http://test.wix.com/', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(result.url).to.be('http://test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg');
        });

        it('ignores base URL if omitted', function () {
            var result = new ImageRequest('', '12345', 'fish.jpeg').canvas()
                .size(100, 100)
                .toUrl();

            expect(result.url).to.be('/12345/v1/canvas/w_100,h_100/fish.jpeg');
        });
    });

    describe('supports user input', function () {

        it('encodes file name', function () {
            var result = new ImageRequest('test.wix.com', '12345', 'fish/דג.jpeg').canvas(100, 100)
                .toUrl();

            expect(result).to.eql({ url: '//test.wix.com/12345/v1/canvas/w_100,h_100/fish%2F%D7%93%D7%92.jpeg',
                error: null });
        });
    });

    describe('attaches original file data', function () {

        it('adds original file data fragment to URL', function () {
            var fileData = new OriginalFileData(2048, 4096, 'image/jpeg');
            var result = new ImageRequest('test.wix.com', '12345', 'fish.jpeg', fileData).canvas(100, 100)
                .toUrl();

            expect(result).to.eql({ url: '//test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg#w_2048,h_4096,mt_image%2Fjpeg',
                error: null });
        });
    });

    describe('handles input errors', function () {
        it('collects errors into a single Error instance', function () {
            var result = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg').canvas()
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

    describe('crop operation', function () {

        var image = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg');

        it('all options', function () {
            var result = image.crop(101, 102, 81, 82, 1.2)
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
                .toUrl();

            expect(result).to.eql({ url: '//test.wix.com/12345/v1/crop/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_101,h_102,x_81,y_82,scl_1.2/fish.jpeg',
                error: null });
        });

        it('optional options', function () {
            var result = image.crop(100, 100, 80, 80)
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
                .toUrl();

            expect(result).to.eql({ url: '//test.wix.com/12345/v1/crop/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,x_80,y_80/fish.jpeg',
                error: null });
        });

    });

    describe('canvas operation', function () {

        var image = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg');

        it('all options', function () {

            var Alignments = require('../../../src/image/operation/align/alignments');

            var result = image.canvas(100, 100)
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

            expect(result.url).to.be('//test.wix.com/12345/v1/canvas/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,al_b,c_aabbcc/fish.jpeg');
            expect(result.error).to.be(null);
        });

    });

    describe('fill operation', function () {

        var image = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg');

        it('all options', function () {
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

            expect(result.url).to.be('//test.wix.com/12345/v1/fill/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,al_l,lg/fish.jpeg');
            expect(result.error).to.be(null);
        });

    });

    describe('fit operation', function () {

        var image = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg');

        it('all options', function () {
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

            expect(result.url).to.be('//test.wix.com/12345/v1/fit/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,w_100,h_100,lg/fish.jpeg');
            expect(result.error).to.be(null);
        });

    });

    describe('url normalization', function () {

        var image = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg');

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
