var Saturation = require('../../../../src/image/operation/chromaticity/saturation');
var expect = require('expect.js');

describe('saturation', function () {

    it('serializes', function () {
        var saturation = new Saturation({});
        saturation.saturation(-100);

        expect(saturation.serialize()).to.eql({ params: 'sat_-100', error: null });
    });

    it('reject values greater than 100', function () {
        var saturation = new Saturation({});
        saturation.saturation(101);

        expect(saturation.serialize()).to.eql({ params: '',
            error: 'saturation: 101 is not a number between -100 to 100' });
    });

    it('reject values smaller than -100', function () {
        var saturation = new Saturation({});
        saturation.saturation(-101);

        expect(saturation.serialize()).to.eql({ params: '',
            error: 'saturation: -101 is not a number between -100 to 100' });
    });

    it('resets for null', function () {
        var saturation = new Saturation({});
        saturation.saturation(70);
        saturation.saturation(null);

        expect(saturation.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for undefined', function () {
        var saturation = new Saturation({});
        saturation.saturation(-9970);
        saturation.saturation();

        expect(saturation.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for 0', function () {
        var saturation = new Saturation({});
        saturation.saturation(-1);
        saturation.saturation(0);

        expect(saturation.serialize()).to.eql({ params: '', error: null });
    });
});