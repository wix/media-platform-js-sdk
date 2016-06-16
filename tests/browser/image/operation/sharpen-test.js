var Sharpen = require('../../../../src/image/operation/effect/sharpen');
var expect = require('expect.js');

describe('sharpen', function () {

    it('serializes', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(1);

        expect(sharpen.serialize()).to.eql({ params: 'shrp_1', error: null });
    });

    it('reject values greater than 1', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(1.1);

        expect(sharpen.serialize()).to.eql({ params: '',
            error: 'sharpen radius: 1.1 is not a number between 0 to 1' });
    });

    it('reject values smaller than 0', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(-1);

        expect(sharpen.serialize()).to.eql({ params: '',
            error: 'sharpen radius: -1 is not a number between 0 to 1' });
    });

    it('resets for null', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(-1);
        sharpen.sharpen(null);

        expect(sharpen.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for undefined', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(70);
        sharpen.sharpen();

        expect(sharpen.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for 0', function () {
        var sharpen = new Sharpen({});
        sharpen.sharpen(70);
        sharpen.sharpen(0);

        expect(sharpen.serialize()).to.eql({ params: '', error: null });
    });
});