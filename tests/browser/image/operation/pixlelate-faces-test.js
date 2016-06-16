var PixelateFaces = require('../../../../src/image/operation/effect/pixelate-faces');
var expect = require('expect.js');

describe('pixelate faces', function () {

    it('serializes', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(100);

        expect(pixelateFaces.serialize()).to.eql({ params: 'pixfs_100', error: null });
    });

    it('rounds values', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(100.2);

        expect(pixelateFaces.serialize()).to.eql({ params: 'pixfs_100', error: null });
    });

    it('reject values smaller than 0', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(-1);

        expect(pixelateFaces.serialize()).to.eql({ params: '',
            error: 'pixelate: -1 is not a number greater than 0' });
    });

    it('resets for null', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(70);
        pixelateFaces.pixels(null);

        expect(pixelateFaces.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for undefined', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(-1);
        pixelateFaces.pixels();

        expect(pixelateFaces.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for 0', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(70);
        pixelateFaces.pixels(0);

        expect(pixelateFaces.serialize()).to.eql({ params: '', error: null });
    });
});