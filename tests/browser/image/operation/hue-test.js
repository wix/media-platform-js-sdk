var Hue = require('../../../../src/image/operation/chromaticity/hue');
var expect = require('expect.js');

describe('hue', function () {

    it('serializes', function () {
        var hue = new Hue({});
        hue.hue(100);

        expect(hue.serialize()).to.be('hue_100');
    });

    it('reject values greater than 100', function () {
        var hue = new Hue({});
        hue.hue(101);

        expect(hue.serialize()).to.be('');
    });

    it('reject values smaller than -100', function () {
        var hue = new Hue({});
        hue.hue(-101);

        expect(hue.serialize()).to.be('');
    });

    it('resets for null', function () {
        var hue = new Hue({});
        hue.hue(70);
        hue.hue(null);

        expect(hue.serialize()).to.be('');
    });

    it('resets for undefined', function () {
        var hue = new Hue({});
        hue.hue(70);
        hue.hue();

        expect(hue.serialize()).to.be('');
    });

    it('resets for 0', function () {
        var hue = new Hue({});
        hue.hue(-1);
        hue.hue(0);

        expect(hue.serialize()).to.be('');
    });
});