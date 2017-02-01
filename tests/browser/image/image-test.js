var expect = require('expect.js');
var ImageRequest = require('../../../src/image/image-request');
var OriginalImageData = require('../../../src/image/operation/original-image-data');
var fromUrlToImageRequest = require('../../../src/image/image-request-deserializer').fromUrlToImageRequest;
var ROI = require('../../../src/image/region-of-interest');
var Container = require('../../../src/image/container');
var Alignments = require('../../../src/image/operation/align/alignments');

describe('image url construction', function () {

    describe('protocol prefixing', function () {

        it('prefixes "//" if scheme is not defined', function () {
            var result = new ImageRequest('test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg')).canvas(100, 100)
                .toUrl();

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

        it('accepts "https"', function () {
            var result = new ImageRequest('https://test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg')).canvas(100, 100)
                .toUrl();

            expect(result).to.eql({
                url: 'https://test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

        it('accepts "http"', function () {
            var result = new ImageRequest('http://test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg')).canvas(100, 100)
                .toUrl();

            expect(result).to.eql({
                url: 'http://test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

        it('accepts "//"', function () {
            var result = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg')).canvas()
                .size(100, 100)
                .toUrl();

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

        it('strips trailing "/"s from base url', function () {
            var result = new ImageRequest('http://test.wix.com/', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg')).canvas()
                .size(100, 100)
                .toUrl();

            expect(result).to.eql({
                url: 'http://test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

        it('ignores base URL if omitted', function () {
            var result = new ImageRequest('', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg')).canvas()
                .size(100, 100)
                .toUrl();

            expect(result).to.eql({
                url: '/12345/v1/canvas/w_100,h_100/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });
    });

    describe('supports user input', function () {

        it('encodes file name', function () {
            var result = new ImageRequest('test.wix.com', '12345', 'fish/דג.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg')).canvas(100, 100)
                .toUrl();

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/canvas/w_100,h_100/fish%2F%D7%93%D7%92.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });
    });

    describe('attaches original file data', function () {

        it('adds original file data fragment to URL', function () {
            var result = new ImageRequest('test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(2048, 4096, 'image/jpeg')).canvas(100, 100)
                .toUrl();

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/canvas/w_100,h_100/fish.jpeg#w_2048,h_4096,mt_image%2Fjpeg',
                error: null
            });
        });
    });

    describe('handles input errors', function () {
        it('collects errors into a single Error instance', function () {
            var result = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(2048, 4096, 'image/jpeg')).canvas()
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

            expect(result).to.eql({
                url: null,
                error: new Error('saturation: 500 is not a number between -100 to 100,sharpen radius: -10 is not a number between 0 to 1,unsharp mask radius: -1 is not a number between 0.1 to 500,jpeg compression quality: 200 is not a number between 0 to 100,align: some crap is not a valid alignment value - see alignments.js for valid values')
            });
        })
    });

    describe('size', function () {

        var imageRequest = new ImageRequest('test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg'));

        it('rounds w values down', function () {
            var result = imageRequest.fit(100.4, 200).toUrl();

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/fit/w_100,h_200/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

        it('rounds w values up', function () {
            var result = imageRequest.fit(99.5, 200).toUrl();

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/fit/w_100,h_200/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

        it('rounds h values down', function () {
            var result = imageRequest.fit(100, 200.4).toUrl();

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/fit/w_100,h_200/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

        it('rounds h values up', function () {
            var result = imageRequest.fit(100, 199.5).toUrl();

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/fit/w_100,h_200/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

        it('reject w values smaller than 1', function () {
            var result = imageRequest.fit(0.4, 100).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('width is mandatory')
            });
        });

        it('reject h values smaller than 1', function () {
            var result = imageRequest.fit(100, -1).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error()
            });
        });

        it('requires h to be set', function () {
            var result = imageRequest.fit(100).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('height is mandatory')
            });
        });
    });

    describe('fills a container with region of interest', function () {
        var imageRequest = fromUrlToImageRequest(
            'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/fit/w_709,h_400/file.png#w_1926,h_1086,mt_image/png'
        );

        it('scale to width - without ROI', function () {
            var result = imageRequest.scaleToWidth(1000).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_1000,h_564,x_0,y_0,scl_0.5192107995846313/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('scale to width - with ROI', function () {
            var roi = new ROI()
                .setX(1100)
                .setWidth(600)
                .setY(225)
                .setHeight(250);
            var result = imageRequest.scaleToWidth(1000, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_1000,h_417,x_1833,y_375,scl_1.6666666666666667/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('scale to width - illegal width argument', function () {
            var result = imageRequest.scaleToWidth(-1).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('crop scale factor: -0.0009208103130755065 is not a number between 0 to 100')
            });
        });

        it('scale to height - without ROI', function () {
            var result = imageRequest.scaleToHeight(500).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_887,h_500,x_0,y_0,scl_0.4604051565377532/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('scale to height - with ROI', function () {
            var roi = new ROI()
                .setX(415)
                .setWidth(250)
                .setY(350)
                .setHeight(600);

            var result = imageRequest.scaleToHeight(500, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_208,h_500,x_345,y_291,scl_0.8333333333333334/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('scale to height - illegal height argument', function () {
            var result = imageRequest.scaleToHeight(-300).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('crop scale factor: -0.27624309392265195 is not a number between 0 to 100')
            });
        });

        it('roi - landscape -> portrait', function () {
            var roi = new ROI()
                .setX(1100)
                .setWidth(600)
                .setY(225)
                .setHeight(250);
            var container = new Container()
                .setWidth(200)
                .setHeight(300);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_200,h_300,x_1580,y_270,scl_1.2/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - landscape -> landscape', function () {
            var roi = new ROI()
                .setX(1100)
                .setWidth(600)
                .setY(225)
                .setHeight(250);
            var container = new Container()
                .setWidth(300)
                .setHeight(200);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_300,h_200,x_550,y_75,scl_0.5/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - portrait -> landscape', function () {
            var roi = new ROI()
                .setX(415)
                .setWidth(250)
                .setY(350)
                .setHeight(600);
            var container = new Container()
                .setWidth(300)
                .setHeight(200);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_300,h_200,x_498,y_680,scl_1.2/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - portrait -> portrait', function () {
            var roi = new ROI()
                .setX(415)
                .setWidth(250)
                .setY(350)
                .setHeight(600);
            var container = new Container()
                .setWidth(400)
                .setHeight(500);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_400,h_500,x_249,y_291,scl_0.8333333333333334/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - square -> portrait', function () {
            var roi = new ROI()
                .setX(1240)
                .setWidth(400)
                .setY(590)
                .setHeight(400);
            var container = new Container()
                .setWidth(900)
                .setHeight(1000);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_900,h_1000,x_3150,y_1475,scl_2.5/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - square -> landscape', function () {
            var roi = new ROI()
                .setX(1240)
                .setWidth(400)
                .setY(590)
                .setHeight(400);
            var container = new Container()
                .setWidth(1000)
                .setHeight(600);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_1000,h_600,x_3100,y_1675,scl_2.5/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - square -> square', function () {
            var roi = new ROI()
                .setX(1240)
                .setWidth(400)
                .setY(590)
                .setHeight(400);
            var container = new Container()
                .setWidth(250)
                .setHeight(250);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_250,h_250,x_775,y_368,scl_0.625/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - full image -> square', function () {
            var roi = new ROI()
                .setX(0)
                .setWidth(1926)
                .setY(0)
                .setHeight(1086);
            var container = new Container()
                .setWidth(250)
                .setHeight(250);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_250,h_250,x_97,y_0,scl_0.2302025782688766/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - handles bleeding bottom, left', function () {
            var roi = new ROI()
                .setX(0)
                .setWidth(100)
                .setY(986)
                .setHeight(100);
            var container = new Container()
                .setWidth(200)
                .setHeight(300);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_200,h_300,x_50,y_2958,scl_3/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - handles bleeding top, right', function () {
            var roi = new ROI()
                .setX(1826)
                .setWidth(100)
                .setY(0)
                .setHeight(100);
            var container = new Container()
                .setWidth(200)
                .setHeight(200);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: 'http://media.wixapps.net/ggl-109789773458215503884/images/d4c8f529247e4f2a92740af2fd03791f~mv2/v1/crop/w_200,h_200,x_3652,y_0,scl_2/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - width out of bound', function () {
            var container = new Container()
                .setWidth(1926)
                .setHeight(1086);
            var roi = new ROI()
                .setX(0)
                .setWidth(1927)
                .setY(0)
                .setHeight(1086);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error()
            });
        });

        it('roi - height out of bound', function () {
            var container = new Container()
                .setWidth(1926)
                .setHeight(1086);
            var roi = new ROI()
                .setX(0)
                .setWidth(1926)
                .setY(0)
                .setHeight(1087);

            var result = imageRequest.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('crop out off height bound')
            });
        });
    });

    describe('crop operation', function () {

        var imageRequest = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(2048, 4096, 'image/jpeg'));

        it('scale is optional', function () {

            var crop = imageRequest.crop(90, 91, 100, 101);

            expect(crop.toUrl()).to.eql({
                url: '//test.wix.com/12345/v1/crop/w_90,h_91,x_100,y_101/fish.jpeg#w_2048,h_4096,mt_image%2Fjpeg',
                error: null
            });
        });

        it('scale default (1) is omitted', function () {
            var crop = imageRequest.crop(90, 91, 100, 101, 1);

            expect(crop.toUrl()).to.eql({
                url: '//test.wix.com/12345/v1/crop/w_90,h_91,x_100,y_101/fish.jpeg#w_2048,h_4096,mt_image%2Fjpeg',
                error: null
            });
        });

        it('rounds x values down', function () {
            var crop = imageRequest.crop(90, 91, 100.4, 101);

            expect(crop.toUrl()).to.eql({
                url: '//test.wix.com/12345/v1/crop/w_90,h_91,x_100,y_101/fish.jpeg#w_2048,h_4096,mt_image%2Fjpeg',
                error: null
            });
        });

        it('rounds x values up', function () {
            var crop = imageRequest.crop(90, 91, 99.5, 101);

            expect(crop.toUrl()).to.eql({
                url: '//test.wix.com/12345/v1/crop/w_90,h_91,x_100,y_101/fish.jpeg#w_2048,h_4096,mt_image%2Fjpeg',
                error: null
            });
        });

        it('rounds y values down', function () {
            var crop = imageRequest.crop(90, 91, 100, 101.4);

            expect(crop.toUrl()).to.eql({
                url: '//test.wix.com/12345/v1/crop/w_90,h_91,x_100,y_101/fish.jpeg#w_2048,h_4096,mt_image%2Fjpeg',
                error: null
            });
        });

        it('rounds y values up', function () {
            var crop = imageRequest.crop(90, 91, 100, 100.5);

            expect(crop.toUrl()).to.eql({
                url: '//test.wix.com/12345/v1/crop/w_90,h_91,x_100,y_101/fish.jpeg#w_2048,h_4096,mt_image%2Fjpeg',
                error: null
            });
        });

        it('reject x values smaller than 0', function () {
            var crop = imageRequest.crop(90, 91, -0.6, 101);

            expect(crop.toUrl()).to.eql({
                url: null,
                error: new Error('crop x: -1 is not a number greater than 0')
            });
        });

        it('reject y values smaller than 0', function () {
            var crop = imageRequest.crop(90, 91, 100, -1);

            expect(crop.toUrl()).to.eql({
                url: null,
                error: new Error('crop y: -1 is not a number greater than 0')
            });
        });

        it('all options', function () {
            var result = imageRequest.crop(101, 102, 81, 82, 1.2)
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

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/crop/w_101,h_102,x_81,y_82,scl_1.2,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl/fish.jpeg#w_2048,h_4096,mt_image%2Fjpeg',
                error: null
            });
        });
    });

    describe('canvas operation', function () {

        var image = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg'));

        it('all options', function () {
            var result = image.canvas(100, 101)
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

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/canvas/w_100,h_101,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,al_b,c_aabbcc/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });
    });

    describe('fill operation', function () {

        var image = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg'));

        it('all options', function () {
            var result = image.fill(100, 200)
                .size(50, 80)
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

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/fill/w_50,h_80,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,al_l,lg/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
        });

    });

    describe('fit operation', function () {

        var image = new ImageRequest('//test.wix.com', '12345', 'fish.jpeg', new OriginalImageData(1000, 2000, 'image/jpeg'));

        it('all options', function () {
            var result = image.fit()
                .size(100, 200)
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

            expect(result).to.eql({
                url: '//test.wix.com/12345/v1/fit/w_100,h_200,br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_0.7,usm_10_10_10,q_100,bl,lg/fish.jpeg#w_1000,h_2000,mt_image%2Fjpeg',
                error: null
            });
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
