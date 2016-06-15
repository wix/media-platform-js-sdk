var Image = require('../../src/image/image');
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

    describe('by operation', function () {

        var image = new Image('//test.wix.com', '12345', 'fish.jpeg');

        it('canvas operation', function () {

            var Alignments = require('../../src/image/operation/align/alignments');

            var url = image.canvas()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(10)
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

            expect(url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_10,usm_10_10_10,q_100,bl,w_100,h_100,al_b,c_aabbcc/fish.jpeg');
        });
        it('crop operation', function () {
            var url = image.crop()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(10)
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

            expect(url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_10,usm_10_10_10,q_100,bl,w_100,h_100,x_100,y_100,scl_0.7/fish.jpeg');
        });
        it('fill operation', function () {
            var url = image.fill()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(10)
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

            expect(url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_10,usm_10_10_10,q_100,bl,w_100,h_100,al_l,lg/fish.jpeg');
        });
        it('fit operation', function () {
            var url = image.fit()
                .size(100, 100)
                .jpeg(100, true)
                .unsharpMask(10, 10, 10)
                .sharpen(10)
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

            expect(url).to.be('//test.wix.com/12345/v1/br_99,con_12,hue_60,sat_-70,blur_10,neg,oil,pix_3,pixfs_3,eye,shrp_10,usm_10_10_10,q_100,bl,w_100,h_100,lg/fish.jpeg');
        });
    });
    
    // it('Test fill construction, w, h, al', function () {
    // var i = new WixImage("https://test.wix.com", "12345");
    // var url = i.fill().size(100, 300).alignment(wms.Defaults.Alignment.LEFT).name("cat.jpg").toUrl();
    // expect(url).to.be("https://test.wix.com/12345/v1/fill/w_100,h_300,al_l/cat.jpg");
    // });
    //
    // it('Test fill construction, w, h, al', function () {
    // var i = new WixImage("test.wix.com", "12345");
    // var url = i.fill().size(100, 300).alignment(wms.Defaults.Alignment.LEFT).name("cat.jpg").toUrl();
    // expect(url).to.be("//test.wix.com/12345/v1/fill/w_100,h_300,al_l/cat.jpg");
    // });
    // it('Test fill construction, w, h, al', function () {
    // var i = new WixImage("//test.wix.com", "12345");
    // var url = i.fill().size(100, 300).alignment(wms.Defaults.Alignment.LEFT).name("cat.jpg").toUrl();
    // expect(url).to.be("//test.wix.com/12345/v1/fill/w_100,h_300,al_l/cat.jpg");
    // });
    // it('Test fill construction, w, h, al shorthand', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fill().w(100).h(300).alignment(wms.Defaults.Alignment.LEFT).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fill/w_100,h_300,al_l/cat.jpg");
    // });
    // it('Test fill construction, w, h, al shorthand', function () {
    // var i = new WixImage("http://test.wix.com", "12345", "cat.jpg");
    // var url = i.fill().w(100).h(300).alignment(wms.Defaults.Alignment.LEFT).toUrl();
    // expect(url).to.be("http://test.wix.com/12345/v1/fill/w_100,h_300,al_l/cat.jpg");
    // });
    // it('Test fill construction, (w, h), q', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fill().size(100, 300).quality(80).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fill/w_100,h_300,q_80/cat.jpg");
    // });
    // it('Test fill construction, (w, h, q)', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fill().size(100, 300, 80).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fill/w_100,h_300,q_80/cat.jpg");
    // });
    // it('Test fill construction, (w, h, q), us_auto', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fill().size(100, 300, 80).unsharpMask(wms.Defaults.AUTO).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fill/w_100,h_300,q_80,us_auto/cat.jpg");
    // });
    // it('Test fill construction, (w, h, q), us_auto shorthand', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fill().size(100, 300, 80).us(wms.Defaults.AUTO).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fill/w_100,h_300,q_80,us_auto/cat.jpg");
    // });
    // it('Test fill construction, (w, h, q_auto)', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fill().size(100, 300, wms.Defaults.AUTO).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fill/w_100,h_300,q_auto/cat.jpg");
    // });
    // it('Test fill construction, (w, h, q), (r,a,t)', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fill().size(100, 300, 80).unsharpMask(.3,.1,.5).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fill/w_100,h_300,q_80,us_0.3_0.1_0.5/cat.jpg");
    // });
    // it('Test fit construction, (w,h,q)', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fit().size(100, 300).quality(80).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/w_100,h_300,q_80/cat.jpg");
    // });
    // it('Test fit construction, (w,h,q) shorthand', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fit().size(100, 300).q(80).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/w_100,h_300,q_80/cat.jpg");
    // });
    // it('Test canvas construction, (w,h), al', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.canvas().size(100, 300).al(wms.Defaults.Alignment.LEFT).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/canvas/w_100,h_300,al_l/cat.jpg");
    // });
    // it('Test fill construction, (w,h)', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fill().size(100, 300).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fill/w_100,h_300/cat.jpg");
    // });
    // it('Test crop construction, (w,h),x,y', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.crop().size(100, 300).x(20).y(30).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/crop/w_100,h_300,x_20,y_30/cat.jpg");
    // });
    // it('Test crop construction, (w,h),(x,y)', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.crop().size(100, 300).coords(20, 30).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/crop/w_100,h_300,x_20,y_30/cat.jpg");
    // });
    // it('Test adjust construction, br', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fit().brightness(100).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/br_100/cat.jpg");
    // });
    // it('Test adjust construction, br auto', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fit().brightness().name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/br_auto/cat.jpg");
    //     url = i.fit().brightness(wms.Defaults.AUTO).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/br_auto/cat.jpg");
    // });
    // it('Test adjust construction, all', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fit().brightness(100).contrast(100).saturation(100).hue(100).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/br_100,con_100,sat_100,hue_100/cat.jpg");
    // });
    // it('Test fit construction, all shorthand', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fit().br(100).con(100).sat(100).hue(100).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/br_100,con_100,sat_100,hue_100/cat.jpg");
    // });
    // it('Test filter construction, all', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fit().oil().negative().pixelate(100).blur(100).sharpen(.1).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/oil,neg,pix_100,blur_100,shrp_0.1/cat.jpg");
    // });
    // it('Test filter construction, shorthand', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fit().oil().neg().pix(100).blur(100).sharpen(.1).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/oil,neg,pix_100,blur_100,shrp_0.1/cat.jpg");
    // });
    //
    // it('Test fit + filter construction, shorthand', function () {
    //     var i = new WixImage("http://test.wix.com", "12345");
    //     var url = i.fit().w(50).h(100).oil().neg().pix(100).blur(100).sharpen(.1).q(90).name("cat.jpg").toUrl();
    //     expect(url).to.be("http://test.wix.com/12345/v1/fit/w_50,h_100,q_90,oil,neg,pix_100,blur_100,shrp_0.1/cat.jpg");
    // });
    //
    // it('Test parsing, fit', function () {
    //     var url = "http://test.wix.com/12345/v1/fit/w_100,h_300/cat.jpg";
    //     expect(wms.fromUrl(url).toUrl()).to.be(url);
    // });
    //
    // it('Test parsing, adjustments', function () {
    //     var url = "http://test.wix.com/12345/v1/fit/br_100,con_100,sat_100,hue_100/cat.jpg";
    //     expect(wms.fromUrl(url).toUrl()).to.be(url);
    // });
    //
    // it('Test parsing, filters', function () {
    //     var url = "http://test.wix.com/12345/v1/canvas/oil,neg,pix_100,blur_100,shrp_0.1/cat.jpg";
    //     expect(wms.fromUrl(url).toUrl()).to.be(url);
    // });
    // it('Test parsing, filters', function () {
    // var url = "http://test.wix.com/12345/v1/canvas/oil,neg,pix_100,blur_100,shrp_0.1,usm_0.1_0.1_0.1/cat.jpg";
    // expect(wms.fromUrl(url).toUrl()).to.be(url);
    // });
    // it('Test parsing, fit + adj', function () {
    //     var url = "http://test.wix.com/12345/v1/fit/w_50,h_100,q_90,oil,neg,pix_100,blur_100,shrp_0.1/cat.jpg";
    //     var i = wms.fromUrl(url);
    //     expect(i.toUrl()).to.be(url);
    //     i.w(100);
    //     expect(i.toUrl()).to.be("http://test.wix.com/12345/v1/fit/w_100,h_100,q_90,oil,neg,pix_100,blur_100,shrp_0.1/cat.jpg");
    // });
});
