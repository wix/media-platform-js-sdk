var Hue = require('../../../../src/image/operation/chromaticity/hue');
var expect = require('expect.js');

describe('hue', function () {

    it('serializes', function () {
        var hue = new Hue({});
        hue.hue(100);

        expect(hue.serialize()).to.eql({ params: 'hue_100', error: null });
    });

    it('reject values greater than 100', function () {
        var hue = new Hue({});
        hue.hue(101);

        expect(hue.serialize()).to.eql({ params: '',
            error: 'hue: 101 is not a number between -100 to 100' });
    });

    it('reject values smaller than -100', function () {
        var hue = new Hue({});
        hue.hue(-101);

        expect(hue.serialize()).to.eql({ params: '',
            error: 'hue: -101 is not a number between -100 to 100' });
    });

    it('resets for null', function () {
        var hue = new Hue({});
        hue.hue(-101);
        hue.hue(null);

        expect(hue.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for undefined', function () {
        var hue = new Hue({});
        hue.hue(70);
        hue.hue();

        expect(hue.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for 0', function () {
        var hue = new Hue({});
        hue.hue(-1);
        hue.hue(0);

        expect(hue.serialize()).to.eql({ params: '', error: null });
    });
});