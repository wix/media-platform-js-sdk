var Blur = require('../../../../src/image/operation/effect/blur');
var expect = require('expect.js');

describe('blur', function () {

    it('serializes', function () {
        var blur = new Blur({});
        blur.percentage(100);

        expect(blur.serialize()).to.be('blur_100');
    });

    it('reject values greater than 100 and calls back with error', function () {
        var calledBack = false;
        var blur = new Blur({
            callback: function (error) {
                calledBack = true;
                expect(error).to.be.an(Error);
            }
        });
        blur.percentage(101);

        expect(calledBack).to.be.ok();
        expect(blur.serialize()).to.be('');
    });

    it('reject values smaller than 0', function () {
        var blur = new Blur({});
        blur.percentage(-1);

        expect(blur.serialize()).to.be('');
    });

    it('resets for null', function () {
        var blur = new Blur({});
        blur.percentage(70);
        blur.percentage(null);

        expect(blur.serialize()).to.be('');
    });

    it('resets for undefined', function () {
        var blur = new Blur({});
        blur.percentage(70);
        blur.percentage();

        expect(blur.serialize()).to.be('');
    });

    it('resets for 0', function () {
        var blur = new Blur({});
        blur.percentage(70);
        blur.percentage(0);

        expect(blur.serialize()).to.be('');
    });
});