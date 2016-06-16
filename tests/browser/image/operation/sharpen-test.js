var Sharpen = require('../../../../src/image/operation/effect/sharpen');
var expect = require('expect.js');

describe('sharpen', function () {

    it('serializes', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(1);

        expect(sharpen.serialize()).to.be('shrp_1');
    });

    it('reject values greater than 1', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(1.1);

        expect(sharpen.serialize()).to.be('');
    });

    it('reject values smaller than 0', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(-1);

        expect(sharpen.serialize()).to.be('');
    });

    it('resets for null', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(70);
        sharpen.sharpen(null);

        expect(sharpen.serialize()).to.be('');
    });

    it('resets for undefined', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(70);
        sharpen.sharpen();

        expect(sharpen.serialize()).to.be('');
    });

    it('resets for 0', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(70);
        sharpen.sharpen(0);

        expect(sharpen.serialize()).to.be('');
    });
});