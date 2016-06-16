var UnsharpMask = require('../../../../src/image/operation/effect/unsharp-mask');
var expect = require('expect.js');

describe('unsharp mask', function () {

    it('serializes', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(500, 10, 255);

        expect(unsharpMask.serialize()).to.be('usm_500_10_255');
    });

    it('reject radius values smaller than 0.1', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(0.09, 10, 255);

        expect(unsharpMask.serialize()).to.be('');
    });

    it('reject radius values greater than 500', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(501, 10, 255);

        expect(unsharpMask.serialize()).to.be('');
    });

    it('reject amount values smaller than 0', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(200, -1, 255);

        expect(unsharpMask.serialize()).to.be('');
    });

    it('reject amount values greater than 10', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(200, 11, 255);

        expect(unsharpMask.serialize()).to.be('');
    });

    it('reject threshold values smaller than 0', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(200, 5, -1);

        expect(unsharpMask.serialize()).to.be('');
    });

    it('reject threshold values greater than 255', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(200, 9, 256);

        expect(unsharpMask.serialize()).to.be('');
    });

    it('resets for undefined', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(500, 10, 255);
        unsharpMask.configuration();

        expect(unsharpMask.serialize()).to.be('');
    });
});