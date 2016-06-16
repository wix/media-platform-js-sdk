var Cropping = require('../../../../src/image/operation/crop/cropping');
var expect = require('expect.js');

describe('cropping', function () {

    it('serializes', function () {
        var cropping = new Cropping({});
        cropping.dimensions(100, 100, 1.2);

        expect(cropping.serialize()).to.be('x_100,y_100,scl_1.2');
    });

    it('scale is optional', function () {
        var cropping = new Cropping({});
        cropping.dimensions(100, 100);

        expect(cropping.serialize()).to.be('x_100,y_100');
    });

    it('scale default (1) is ommitted', function () {
        var cropping = new Cropping({});
        cropping.dimensions(100, 100, 1);

        expect(cropping.serialize()).to.be('x_100,y_100');
    });

    it('rounds x values down', function () {
        var cropping = new Cropping({});
        cropping.dimensions(100.4, 100);

        expect(cropping.serialize()).to.be('x_100,y_100');
    });

    it('rounds x values up', function () {
        var cropping = new Cropping({});
        cropping.dimensions(99.5, 100);

        expect(cropping.serialize()).to.be('x_100,y_100');
    });

    it('rounds y values down', function () {
        var cropping = new Cropping({});
        cropping.dimensions(100, 100.4);

        expect(cropping.serialize()).to.be('x_100,y_100');
    });

    it('rounds y values up', function () {
        var cropping = new Cropping({});
        cropping.dimensions(100, 99.5);

        expect(cropping.serialize()).to.be('x_100,y_100');
    });

    it('reject x values smaller than 1', function () {
        var cropping = new Cropping({});
        cropping.dimensions(0.4, 100);

        expect(cropping.serialize()).to.be('');
    });

    it('reject y values smaller than 1', function () {
        var cropping = new Cropping({});
        cropping.dimensions(100, -1);

        expect(cropping.serialize()).to.be('');
    });

    it('resets for undefined', function () {
        var cropping = new Cropping({});
        cropping.dimensions(70, 70);
        cropping.dimensions();

        expect(cropping.serialize()).to.be('');
    });
});