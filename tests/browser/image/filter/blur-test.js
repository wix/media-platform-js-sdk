var expect = require('expect.js');
var Blur = require('../../../../src/image/filter/blur');

describe('blur', function () {

    it('serializes', function () {
        var blur = new Blur({});
        blur.percentage(100);

        expect(blur.serialize()).to.eql({ params: 'blur_100', error: null });
    });

    it('reject values greater than 100', function () {
        var blur = new Blur({});
        blur.percentage(101);

        expect(blur.serialize()).to.eql({ params: '', error: 'blur: 101 is not a number between 0 to 100' });
    });

    it('reject values smaller than 0', function () {
        var blur = new Blur({});
        blur.percentage(-1);

        expect(blur.serialize()).to.eql({ params: '', error: 'blur: -1 is not a number between 0 to 100' });
    });

    it('resets for null', function () {
        var blur = new Blur({});
        blur.percentage(70);
        blur.percentage(null);

        expect(blur.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for undefined', function () {
        var blur = new Blur({});
        blur.percentage(70);
        blur.percentage();

        expect(blur.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for 0', function () {
        var blur = new Blur({});
        blur.percentage(-99);
        blur.percentage(0);

        expect(blur.serialize()).to.eql({ params: '', error: null });
    });
});