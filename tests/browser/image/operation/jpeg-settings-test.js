var JPEGSettings = require('../../../../src/image/operation/jpeg/jpeg-settings');
var expect = require('expect.js');

describe('jpeg settings', function () {

    it('serializes', function () {
        var jpegSettings = new JPEGSettings({});
        jpegSettings.compression(99, true);

        expect(jpegSettings.serialize()).to.be('q_99,bl');
    });

    it('baseline is optional', function () {
        var jpegSettings = new JPEGSettings({});
        jpegSettings.compression(99);

        expect(jpegSettings.serialize()).to.be('q_99');
    });

    it('progressive default is omitted', function () {
        var jpegSettings = new JPEGSettings({});
        jpegSettings.compression(100, false);

        expect(jpegSettings.serialize()).to.be('q_100');
    });

    it('quality default (75) is omitted', function () {
        var jpegSettings = new JPEGSettings({});
        jpegSettings.compression(75);

        expect(jpegSettings.serialize()).to.be('');
    });

    it('reject quality values greater than 100', function () {
        var jpegSettings = new JPEGSettings({});
        jpegSettings.compression(101);

        expect(jpegSettings.serialize()).to.be('');
    });

    it('reject quality values smaller than 0', function () {
        var jpegSettings = new JPEGSettings({});
        jpegSettings.compression(-1);

        expect(jpegSettings.serialize()).to.be('');
    });

    it('rounds quality values', function () {
        var jpegSettings = new JPEGSettings({});
        jpegSettings.compression(40.67);

        expect(jpegSettings.serialize()).to.be('q_41');
    });

    it('resets for undefined', function () {
        var jpegSettings = new JPEGSettings({});
        jpegSettings.compression(70, true);
        jpegSettings.compression();

        expect(jpegSettings.serialize()).to.be('');
    });
});