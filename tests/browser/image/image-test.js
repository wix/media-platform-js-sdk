var expect = require('expect.js');
var Image = require('../../../src/image/image');
var Metadata = require('../../../src/image/metadata');
var Rectangle = require('../../../src/image/geometry/rectangle');
var Dimension = require('../../../src/image/geometry/dimension');

describe('image url construction', function () {

    var imageUrl = '//test.com/1111/images/324234/v1/crop/w_709,h_400,x_1,y_2,scl_1,q_75,usm_0.5_0.2_0.0/file.png#w_1000,h_2000,mt_image%2Fpng';

    describe('handles input errors', function () {
        it('collects errors into a single Error instance', function () {
            var result = new Image(imageUrl).crop(10, 10, 0, 0, 1)
                .jpeg(200, true)
                .unsharpMask(-1, 10, 10)
                .blur(10)
                .saturation(500)
                .hue(60)
                .contrast(12)
                .brightness(99)
                .toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('saturation: 500 is not a number between -100 to 100,sharpen radius: -10 is not a number between 0 to 1,unsharp mask radius: -1 is not a number between 0.1 to 500,jpeg compression quality: 200 is not a number between 0 to 100,align: some crap is not a valid alignment value - see alignments.js for valid values')
            });
        })
    });

    describe('geometry', function () {

        var image = new Image(imageUrl);

        it('rounds w values down', function () {
            var result = image.crop(100.4, 200, 0, 0, 1).toUrl();

            expect(result).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_100,h_200,x_0,y_0,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('rounds w values up', function () {
            var result = image.crop(99.5, 200).toUrl();

            expect(result).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_100,h_200,x_0,y_0,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('rounds h values down', function () {
            var result = image.crop(100, 200.4).toUrl();

            expect(result).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_100,h_200,x_0,y_0,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('rounds h values up', function () {
            var result = image.crop(100, 199.5).toUrl();

            expect(result).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_100,h_200,x_0,y_0,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('reject w values smaller than 1', function () {
            var result = image.crop(0.4, 100).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('width is mandatory')
            });
        });

        it('reject h values smaller than 1', function () {
            var result = image.crop(100, -1).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error()
            });
        });

        it('requires h to be set', function () {
            var result = image.crop(100).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('height is mandatory')
            });
        });
    });

    describe('fills a container with region of interest', function () {

        var image = new Image('//fish.com/1234/5678/file.png/v1/crop/w_709,h_400/file.png#w_1926,h_1086,mt_image/png');

        it('scale to width - without ROI', function () {
            var result = image.scaleToWidth(1000).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_1000,h_564,x_0,y_0,scl_0.5192107995846313/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('scale to width - with ROI', function () {
            var roi = new Rectangle()
                .setX(1100)
                .setWidth(600)
                .setY(225)
                .setHeight(250);
            var result = image.scaleToWidth(1000, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_1000,h_417,x_1833,y_375,scl_1.6666666666666667/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('scale to width - illegal width argument', function () {
            var result = image.scaleToWidth(-1).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('crop scale factor: -0.0009208103130755065 is not a number between 0 to 100')
            });
        });

        it('scale to height - without ROI', function () {
            var result = image.scaleToHeight(500).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_887,h_500,x_0,y_0,scl_0.4604051565377532/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('scale to height - with ROI', function () {
            var roi = new Rectangle()
                .setX(415)
                .setWidth(250)
                .setY(350)
                .setHeight(600);

            var result = image.scaleToHeight(500, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_208,h_500,x_345,y_291,scl_0.8333333333333334/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('scale to height - illegal height argument', function () {
            var result = image.scaleToHeight(-300).toUrl();

            expect(result).to.eql({
                url: null,
                error: new Error('crop scale factor: -0.27624309392265195 is not a number between 0 to 100')
            });
        });

        it('roi - landscape -> portrait', function () {
            var roi = new Rectangle()
                .setX(1100)
                .setWidth(600)
                .setY(225)
                .setHeight(250);
            var container = new Dimension()
                .setWidth(200)
                .setHeight(300);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_200,h_300,x_1580,y_270,scl_1.2/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - landscape -> landscape', function () {
            var roi = new Rectangle()
                .setX(1100)
                .setWidth(600)
                .setY(225)
                .setHeight(250);
            var container = new Dimension()
                .setWidth(300)
                .setHeight(200);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_300,h_200,x_550,y_75,scl_0.5/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - portrait -> landscape', function () {
            var roi = new Rectangle()
                .setX(415)
                .setWidth(250)
                .setY(350)
                .setHeight(600);
            var container = new Dimension()
                .setWidth(300)
                .setHeight(200);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_300,h_200,x_498,y_680,scl_1.2/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - portrait -> portrait', function () {
            var roi = new Rectangle()
                .setX(415)
                .setWidth(250)
                .setY(350)
                .setHeight(600);
            var container = new Dimension()
                .setWidth(400)
                .setHeight(500);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_400,h_500,x_249,y_291,scl_0.8333333333333334/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - square -> portrait', function () {
            var roi = new Rectangle()
                .setX(1240)
                .setWidth(400)
                .setY(590)
                .setHeight(400);
            var container = new Dimension()
                .setWidth(900)
                .setHeight(1000);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_900,h_1000,x_3150,y_1475,scl_2.5/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - square -> landscape', function () {
            var roi = new Rectangle()
                .setX(1240)
                .setWidth(400)
                .setY(590)
                .setHeight(400);
            var container = new Dimension()
                .setWidth(1000)
                .setHeight(600);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_1000,h_600,x_3100,y_1675,scl_2.5/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - square -> square', function () {
            var roi = new Rectangle()
                .setX(1240)
                .setWidth(400)
                .setY(590)
                .setHeight(400);
            var container = new Dimension()
                .setWidth(250)
                .setHeight(250);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_250,h_250,x_775,y_368,scl_0.625/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - full image -> square', function () {
            var roi = new Rectangle()
                .setX(0)
                .setWidth(1926)
                .setY(0)
                .setHeight(1086);
            var container = new Dimension()
                .setWidth(250)
                .setHeight(250);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_250,h_250,x_97,y_0,scl_0.2302025782688766/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - handles bleeding bottom, left', function () {
            var roi = new Rectangle()
                .setX(0)
                .setWidth(100)
                .setY(986)
                .setHeight(100);
            var container = new Dimension()
                .setWidth(200)
                .setHeight(300);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_200,h_300,x_50,y_2958,scl_3/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });

        it('roi - handles bleeding top, right', function () {
            var roi = new Rectangle()
                .setX(1826)
                .setWidth(100)
                .setY(0)
                .setHeight(100);
            var container = new Dimension()
                .setWidth(200)
                .setHeight(200);

            var result = image.fillContainer(container, roi).toUrl();

            expect(result).to.eql({
                url: '//fish.com/1234/5678/file.png/v1/crop/w_200,h_200,x_3652,y_0,scl_2/file.png#w_1926,h_1086,mt_image%2Fpng',
                error: null
            });
        });
    });

    describe('crop geometry', function () {

        var image = new Image(imageUrl);

        it('scale is optional', function () {

            var crop = image.crop(90, 91, 100, 101);

            expect(crop.toUrl()).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('scale default (1) is omitted', function () {
            var crop = image.crop(90, 91, 100, 101, 1);

            expect(crop.toUrl()).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('rounds x values down', function () {
            var crop = image.crop(90, 91, 100.4, 101);

            expect(crop.toUrl()).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('rounds x values up', function () {
            var crop = image.crop(90, 91, 99.5, 101);

            expect(crop.toUrl()).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('rounds y values down', function () {
            var crop = image.crop(90, 91, 100, 101.4);

            expect(crop.toUrl()).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('rounds y values up', function () {
            var crop = image.crop(90, 91, 100, 100.5);

            expect(crop.toUrl()).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.5_0.2_0.0/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });

        it('reject x values smaller than 0', function () {
            var crop = image.crop(90, 91, -0.6, 101);

            expect(crop.toUrl()).to.eql({
                url: null,
                error: new Error('crop x: -1 is not a number greater than 0')
            });
        });

        it('reject y values smaller than 0', function () {
            var crop = image.crop(90, 91, 100, -1);

            expect(crop.toUrl()).to.eql({
                url: null,
                error: new Error('crop y: -1 is not a number greater than 0')
            });
        });

        it('all options', function () {
            var result = image.crop(101, 102, 81, 82, 1.2)
                .jpeg(100, true)
                .unsharpMask(10, 8, 9)
                .blur(10)
                .saturation(-70)
                .hue(60)
                .contrast(12)
                .brightness(99)
                .toUrl();

            expect(result).to.eql({
                url: '//test.com/1111/images/324234/v1/crop/w_101,h_102,x_81,y_82,scl_1.2,usm_10_8_9,blur_10,br_99,con_12,hue_60,sat_-70,q_100,bl/324234#w_1000,h_2000,mt_image%2Fpng',
                error: null
            });
        });
    });

    describe('url normalization', function () {

        var image = new Image(imageUrl);

        it('preserves parameter order', function () {
            var result1 = image.crop(100, 200)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .blur(10)
                .saturation(-70)
                .hue(60)
                .contrast(90)
                .brightness(99)
                .toUrl();

            var result2 = image.crop(100, 200)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .contrast(90)
                .blur(10)
                .saturation(-70)
                .brightness(99)
                .hue(60)
                .toUrl();

            expect(result1.url).to.be(result2.url);
        });
    });
});
