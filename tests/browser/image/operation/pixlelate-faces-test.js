var PixelateFaces = require('../../../../src/image/operation/effect/pixelate-faces');
var expect = require('expect.js');

describe('pixelate faces', function () {

    it('serializes', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(100);

        expect(pixelateFaces.serialize()).to.be('pixfs_100');
    });

    it('rounds values', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(100.2);

        expect(pixelateFaces.serialize()).to.be('pixfs_100');
    });

    it('reject values smaller than 0', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(-1);

        expect(pixelateFaces.serialize()).to.be('');
    });

    it('resets for null', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(70);
        pixelateFaces.pixels(null);

        expect(pixelateFaces.serialize()).to.be('');
    });

    it('resets for undefined', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(70);
        pixelateFaces.pixels();

        expect(pixelateFaces.serialize()).to.be('');
    });

    it('resets for 0', function () {
        var pixelateFaces = new PixelateFaces({});
        pixelateFaces.pixels(70);
        pixelateFaces.pixels(0);

        expect(pixelateFaces.serialize()).to.be('');
    });
});