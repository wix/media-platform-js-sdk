var Contrast = require('../../../../src/image/operation/chromaticity/contrast');
var expect = require('expect.js');

describe('contrast', function () {

    it('serializes', function () {
        var contrast = new Contrast({});
        contrast.contrast(100);

        expect(contrast.serialize()).to.be('con_100');
    });

    it('reject values greater than 100', function () {
        var contrast = new Contrast({});
        contrast.contrast(101);

        expect(contrast.serialize()).to.be('');
    });

    it('reject values smaller than -100', function () {
        var contrast = new Contrast({});
        contrast.contrast(-101);

        expect(contrast.serialize()).to.be('');
    });

    it('resets for null', function () {
        var contrast = new Contrast({});
        contrast.contrast(70);
        contrast.contrast(null);

        expect(contrast.serialize()).to.be('');
    });

    it('resets for undefined', function () {
        var contrast = new Contrast({});
        contrast.contrast(70);
        contrast.contrast();

        expect(contrast.serialize()).to.be('');
    });

    it('resets for 0', function () {
        var contrast = new Contrast({});
        contrast.contrast(-1);
        contrast.contrast(0);

        expect(contrast.serialize()).to.be('');
    });
});