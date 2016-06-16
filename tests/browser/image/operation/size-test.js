var Size = require('../../../../src/image/operation/size/size');
var expect = require('expect.js');

describe('size', function () {

    it('serializes', function () {
        var size = new Size({});
        size.size(100, 100);

        expect(size.serialize()).to.be('w_100,h_100');
    });

    it('rounds w values down', function () {
        var size = new Size({});
        size.size(100.4, 100);

        expect(size.serialize()).to.be('w_100,h_100');
    });

    it('rounds w values up', function () {
        var size = new Size({});
        size.size(99.5, 100);

        expect(size.serialize()).to.be('w_100,h_100');
    });

    it('rounds h values down', function () {
        var size = new Size({});
        size.size(100, 100.4);

        expect(size.serialize()).to.be('w_100,h_100');
    });

    it('rounds h values up', function () {
        var size = new Size({});
        size.size(100, 99.5);

        expect(size.serialize()).to.be('w_100,h_100');
    });

    it('reject w values smaller than 1', function () {
        var size = new Size({});
        size.size(0.4, 100);

        expect(size.serialize()).to.be('');
    });

    it('reject h values smaller than 1', function () {
        var size = new Size({});
        size.size(100, -1);

        expect(size.serialize()).to.be('');
    });
});