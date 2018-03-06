import {expect} from 'chai';
import {Image} from '../../../src/image/image';
import {Rectangle} from '../../../src/geometry/rectangle';
import {Dimension} from '../../../src/geometry/dimension';

describe('image url construction', function () {

  var imageUrl = '//test.com/1111/images/324234/v1/crop/w_709,h_400,x_1,y_2,scl_1,q_75,usm_0.5_0.2_0.0/file.png#w_1000,h_2000,mt_image%2Fpng';

  describe('handles input errors', function () {
    it('collects errors into a single Error instance', function () {
      var result = new Image(imageUrl)
        .saturation(500)
        .unsharpMask(-1, 10, 10)
        .jpeg(200, true)
        .crop(10, 10, 0, 0, 1)
        .blur(10)
        .hue(60)
        .contrast(12)
        .brightness(99)
        .toUrl();

      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('jpeg compression quality: 200 is not a number between 0 to 100,saturation: 500 is not a number between -100 to 100,unsharp mask radius: -1 is not a number between 0.1 to 128');
    });
  });

  describe('geometry', function () {

    var image = new Image(imageUrl);

    it('rounds w values down', function () {
      var result = image.crop(100.4, 200, 0, 0, 1).toUrl();

      expect(result).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_100,h_200,x_0,y_0,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds w values up', function () {
      var result = image.crop(99.5, 200).toUrl();

      expect(result).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_100,h_200,x_0,y_0,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds height values down', function () {
      var result = image.crop(100, 200.4).toUrl();

      expect(result).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_100,h_200,x_0,y_0,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds height values up', function () {
      var result = image.crop(100, 199.5).toUrl();

      expect(result).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_100,h_200,x_0,y_0,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('reject width values smaller than 1', function () {
      var result = image.crop(0.4, 100).toUrl();

      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: width: 0 is not a number greater than 1');
    });

    it('reject height values smaller than 1', function () {
      var result = image.crop(100, -1).toUrl();

      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: height: -1 is not a number greater than 1');
    });

    it('requires height to be set', function () {
      var result = image.crop(100).toUrl();

      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: height is mandatory');
    });
  });

  describe('fills a container with region of interest', function () {

    var image = new Image('//fish.com/1234/5678/file.png/v1/crop/w_709,h_400/file.png#w_1926,h_1086,mt_image/png');

    it('scale to width - without ROI', function () {
      var result = image.scaleToWidth(1000).toUrl();

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
        url: '//fish.com/1234/5678/file.png/v1/crop/w_1000,h_417,x_1833,y_375,scl_1.6666666666666667/file.png#w_1926,h_1086,mt_image%2Fpng',
        error: null
      });
    });

    it('scale to width - illegal width argument', function () {
      var result = image.scaleToWidth(-1).toUrl();

      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: crop scale factor: -0.0009208103130755065 is not a number between 0 to 100,width: -1 is not a number greater than 1,height: -1 is not a number greater than 1');
    });

    it('scale to height - without ROI', function () {
      var result = image.scaleToHeight(500).toUrl();

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
        url: '//fish.com/1234/5678/file.png/v1/crop/w_208,h_500,x_345,y_291,scl_0.8333333333333334/file.png#w_1926,h_1086,mt_image%2Fpng',
        error: null
      });
    });

    it('scale to height - illegal height argument', function () {
      var result = image.scaleToHeight(-300).toUrl();
      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: crop scale factor: -0.27624309392265195 is not a number between 0 to 100,width: -532 is not a number greater than 1,height: -300 is not a number greater than 1');
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

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
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

      expect(result).to.deep.equal({
        url: '//fish.com/1234/5678/file.png/v1/crop/w_200,h_300,x_50,y_2958,scl_3.0/file.png#w_1926,h_1086,mt_image%2Fpng',
        //    //fish.com/1234/5678/file.png/v1/crop/w_200,h_300,x_50,y_2958,scl_3.0/file.png#w_1926,h_1086,mt_image%2Fpng
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

      expect(result).to.deep.equal({
        url: '//fish.com/1234/5678/file.png/v1/crop/w_200,h_200,x_3652,y_0,scl_2.0/file.png#w_1926,h_1086,mt_image%2Fpng',
        //    //fish.com/1234/5678/file.png/v1/crop/w_200,h_200,x_3652,y_0,scl_2.0/file.png#w_1926,h_1086,mt_image%2Fpng
        error: null
      });
    });

    it('scale to width - missing image basic data', function () {
      var image = new Image('//fish.com/1234/5678/file.png/v1/crop/w_709,h_400/file.png');
      try {
        image.scaleToWidth(1000).toUrl();
      } catch (e) {
        expect(e.message).to.equal('client side manipulation requires image basic metadata')
      }
    });
  });

  describe('crop geometry', function () {

    var image = new Image(imageUrl);

    it('scale is optional', function () {

      var crop = image.crop(90, 91, 100, 101);

      expect(crop.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('scale default (1) is omitted', function () {
      var crop = image.crop(90, 91, 100, 101, 1);

      expect(crop.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds x values down', function () {
      var crop = image.crop(90, 91, 100.4, 101);

      expect(crop.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds x values up', function () {
      var crop = image.crop(90, 91, 99.5, 101);

      expect(crop.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds y values down', function () {
      var crop = image.crop(90, 91, 100, 101.4);

      expect(crop.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds y values up', function () {
      var crop = image.crop(90, 91, 100, 100.5);

      expect(crop.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_90,h_91,x_100,y_101,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('reject x values smaller than 0', function () {
      var crop = image.crop(90, 91, -0.6, 101);
      var result = crop.toUrl();
      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: crop x: -1 is not a number greater than 0');
    });

    it('reject y values smaller than 0', function () {
      var crop = image.crop(90, 91, 100, -1);
      var result = crop.toUrl();

      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: crop y: -1 is not a number greater than 0');
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

      expect(result).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/crop/w_101,h_102,x_81,y_82,scl_1.2,blur_10,br_99,con_12,hue_60,q_100,bl,sat_-70,usm_10.00_8.00_9.00/324234#w_1000,h_2000,mt_image%2Fpng',
        //    //test.com/1111/images/324234/v1/crop/w_101,h_102,x_81,y_82,scl_1.2,blur_10,br_99,con_12,hue_60,q_100,bl,sat_-70,usm_10.00_8.00_9.00/324234#w_1000,h_2000,mt_image%2Fpng
        error: null
      });
    });
  });

  describe('smart crop geometry', function () {

    var image = new Image(imageUrl);

    it('all options', function () {
      var result = image.smartCrop(101, 102)
        .jpeg(100, true)
        .unsharpMask(10, 8, 9)
        .blur(10)
        .saturation(-70)
        .hue(60)
        .contrast(12)
        .brightness(99)
        .toUrl();

      expect(result).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/scrop/w_101,h_102,blur_10,br_99,con_12,hue_60,q_100,bl,sat_-70,usm_10.00_8.00_9.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });
  });

  describe('fill geometry', function () {

    var image = new Image(imageUrl);

    it('fill', function () {

      var fill = image.fill(90, 91);

      expect(fill.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fill/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds w values down', function () {
      var fill = image.fill(90.2, 91);

      expect(fill.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fill/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds w values up', function () {
      var fill = image.fill(89.8, 91);

      expect(fill.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fill/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds h values down', function () {
      var fill = image.fill(90, 91.2);

      expect(fill.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fill/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds h values up', function () {
      var fill = image.fill(90, 90.9);

      expect(fill.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fill/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('reject w values smaller than 1', function () {
      var fill = image.fill(0, 91);
      var result = fill.toUrl();
      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: width: 0 is not a number greater than 1');

    });

    it('reject h values smaller than 1', function () {
      var fill = image.fill(90, 0);
      var result = fill.toUrl();
      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: height: 0 is not a number greater than 1');
    });
  });

  describe('fit geometry', function () {

    var image = new Image(imageUrl);

    it('fit', function () {

      var fit = image.fit(90, 91);

      expect(fit.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fit/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds w values down', function () {
      var fit = image.fit(90.2, 91);

      expect(fit.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fit/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds w values up', function () {
      var fit = image.fit(89.8, 91);

      expect(fit.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fit/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds h values down', function () {
      var fit = image.fit(90, 91.2);

      expect(fit.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fit/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('rounds h values up', function () {
      var fit = image.fit(90, 90.9);

      expect(fit.toUrl()).to.deep.equal({
        url: '//test.com/1111/images/324234/v1/fit/w_90,h_91,usm_0.50_0.20_0.00/324234#w_1000,h_2000,mt_image%2Fpng',
        error: null
      });
    });

    it('reject w values smaller than 1', function () {
      var fit = image.fit(0, 91);
      var result = fit.toUrl();
      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: width: 0 is not a number greater than 1');
    });

    it('reject h values smaller than 1', function () {
      var fit = image.fit(90, 0);
      var result = fit.toUrl();
      expect(result.url).to.equal(null);
      expect(result.error.message).to.equal('Error: height: 0 is not a number greater than 1');
    });
  });

  describe('url normalization', function () {

    var image = new Image(imageUrl);

    it('preserves parameter order', function () {
      var result1 = image.crop(100, 200, 1, 2, 3)
        .jpeg(10)
        .unsharpMask(1, 2, 3)
        .blur(10)
        .saturation(10)
        .hue(10)
        .contrast(10)
        .brightness(10)
        .toUrl();

      var result2 = image.crop(100, 200, 1, 2, 3)
        .contrast(10)
        .jpeg(10)
        .saturation(10)
        .blur(10)
        .unsharpMask(1, 2, 3)
        .brightness(10)
        .hue(10)
        .toUrl();

      expect(result1.url).to.equal('//test.com/1111/images/324234/v1/crop/w_100,h_200,x_1,y_2,scl_3.0,blur_10,br_10,con_10,hue_10,q_10,sat_10,usm_1.00_2.00_3.00/324234#w_1000,h_2000,mt_image%2Fpng');
      // //test.com/1111/images/324234/v1/crop/w_100,h_200,x_1,y_2,scl_3.0,blur_10,br_10,con_10,hue_10,q_10,sat_10,usm_10.00_10.00_10.00/file.png
      expect(result1.url).to.equal(result2.url);
    });
  });
});
