var Size = require('../../../../src/image/operation/size/size');
var expect = require('expect.js');

describe('size', function () {

    it('serializes', function () {
        var size = new Size({});
        size.size(100, 100);

        expect(size.serialize()).to.eql({ params: 'w_100,h_100', error: null });
    });

    it('rounds w values down', function () {
        var size = new Size({});
        size.size(100.4, 100);

        expect(size.serialize()).to.eql({ params: 'w_100,h_100', error: null });
    });

    it('rounds w values up', function () {
        var size = new Size({});
        size.size(99.5, 100);

        expect(size.serialize()).to.eql({ params: 'w_100,h_100', error: null });
    });

    it('rounds h values down', function () {
        var size = new Size({});
        size.size(100, 100.4);

        expect(size.serialize()).to.eql({ params: 'w_100,h_100', error: null });
    });

    it('rounds h values up', function () {
        var size = new Size({});
        size.size(100, 99.5);

        expect(size.serialize()).to.eql({ params: 'w_100,h_100', error: null });
    });

    it('reject w values smaller than 1', function () {
        var size = new Size({});
        size.size(0.4, 100);

        expect(size.serialize()).to.eql({ params: null,
            error: 'width: 0 is not a number greater than 1' });
    });

    it('reject h values smaller than 1', function () {
        var size = new Size({});
        size.size(100, -1);

        expect(size.serialize()).to.eql({ params: null,
            error: 'height: -1 is not a number greater than 1' });
    });

    it('requires h to be set', function () {
        var size = new Size({});
        size.size(100);

        expect(size.serialize()).to.eql({ params: null,
            error: 'size: width and height are mandatory' });
    });

    it('requires w and h to be set', function () {
        var size = new Size({});
        size.size();

        expect(size.serialize()).to.eql({ params: null,
            error: 'size: width and height are mandatory' });
    });
});