var expect = require('expect.js');
var Contrast = require('../../../../src/image/filter/contrast');

describe('contrast', function () {

    it('serializes', function () {
        var contrast = new Contrast({});
        contrast.contrast(100);

        expect(contrast.serialize()).to.eql({ params: 'con_100', error: null });
    });

    it('reject values greater than 100', function () {
        var contrast = new Contrast({});
        contrast.contrast(101);

        expect(contrast.serialize()).to.eql({ params: '',
            error: 'contrast: 101 is not a number between -100 to 100' });
    });

    it('reject values smaller than -100', function () {
        var contrast = new Contrast({});
        contrast.contrast(-101);

        expect(contrast.serialize()).to.eql({ params: '',
            error: 'contrast: -101 is not a number between -100 to 100' });
    });

    it('resets for null', function () {
        var contrast = new Contrast({});
        contrast.contrast(70);
        contrast.contrast(null);

        expect(contrast.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for undefined', function () {
        var contrast = new Contrast({});
        contrast.contrast('aaa');
        contrast.contrast();

        expect(contrast.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for 0', function () {
        var contrast = new Contrast({});
        contrast.contrast(-1);
        contrast.contrast(0);

        expect(contrast.serialize()).to.eql({ params: '', error: null });
    });
});