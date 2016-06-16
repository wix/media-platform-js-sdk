var Pixelate = require('../../../../src/image/operation/effect/pixelate');
var expect = require('expect.js');

describe('pixelate', function () {

    it('serializes', function () {
        var pixelate = new Pixelate({});
        pixelate.pixels(100);

        expect(pixelate.serialize()).to.be('pix_100');
    });

    it('rounds values', function () {
        var pixelate = new Pixelate({});
        pixelate.pixels(100.2);

        expect(pixelate.serialize()).to.be('pix_100');
    });

    it('reject values smaller than 0', function () {
        var pixelate = new Pixelate({});
        pixelate.pixels(-1);

        expect(pixelate.serialize()).to.be('');
    });

    it('resets for null', function () {
        var pixelate = new Pixelate({});
        pixelate.pixels(70);
        pixelate.pixels(null);

        expect(pixelate.serialize()).to.be('');
    });

    it('resets for undefined', function () {
        var pixelate = new Pixelate({});
        pixelate.pixels(70);
        pixelate.pixels();

        expect(pixelate.serialize()).to.be('');
    });

    it('resets for 0', function () {
        var pixelate = new Pixelate({});
        pixelate.pixels(70);
        pixelate.pixels(0);

        expect(pixelate.serialize()).to.be('');
    });
});