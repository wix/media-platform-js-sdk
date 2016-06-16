var UnsharpMask = require('../../../../src/image/operation/effect/unsharp-mask');
var expect = require('expect.js');

describe('unsharp mask', function () {

    it('serializes', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(500, 10, 255);

        expect(unsharpMask.serialize()).to.eql({ params: 'usm_500_10_255', error: null });
    });

    it('reject radius values smaller than 0.1', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(0.09, 10, 255);

        expect(unsharpMask.serialize()).to.eql({ params: '',
            error: 'unsharp mask radius: 0.09 is not a number between 0.1 to 500' });
    });

    it('reject radius values greater than 500', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(501, 10, 255);

        expect(unsharpMask.serialize()).to.eql({ params: '',
            error: 'unsharp mask radius: 501 is not a number between 0.1 to 500' });
    });

    it('reject amount values smaller than 0', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(200, -1, 255);

        expect(unsharpMask.serialize()).to.eql({ params: '',
            error: 'unsharp mask amount: -1 is not a number between 0 to 10' });
    });

    it('reject amount values greater than 10', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(200, 11, 255);

        expect(unsharpMask.serialize()).to.eql({ params: '',
            error: 'unsharp mask amount: 11 is not a number between 0 to 10' });
    });

    it('reject threshold values smaller than 0', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(200, 5, -1);

        expect(unsharpMask.serialize()).to.eql({ params: '',
            error: 'unsharp mask threshold: -1 is not a number between 0 to 255' });
    });

    it('reject threshold values greater than 255', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(200, 9, 256);

        expect(unsharpMask.serialize()).to.eql({ params: '',
            error: 'unsharp mask threshold: 256 is not a number between 0 to 255' });
    });

    it('resets for undefined', function () {
        var unsharpMask = new UnsharpMask({});
        unsharpMask.configuration(500, 10, -1);
        unsharpMask.configuration();

        expect(unsharpMask.serialize()).to.eql({ params: '', error: null });
    });
});