var expect = require('expect.js');
var JPEG = require('../../../../src/image/encoder/jpeg');

describe('jpeg settings', function () {

    it('serializes', function () {
        var jpegSettings = new JPEG({});
        jpegSettings.compression(99, true);

        expect(jpegSettings.serialize()).to.eql({ params: 'q_99,bl', error: null });
    });

    it('baseline is optional', function () {
        var jpegSettings = new JPEG({});
        jpegSettings.compression(99);

        expect(jpegSettings.serialize()).to.eql({ params: 'q_99', error: null });
    });

    it('progressive default is omitted', function () {
        var jpegSettings = new JPEG({});
        jpegSettings.compression(100, false);

        expect(jpegSettings.serialize()).to.eql({ params: 'q_100', error: null });
    });

    it('quality default (75) is omitted', function () {
        var jpegSettings = new JPEG({});
        jpegSettings.compression(75);

        expect(jpegSettings.serialize()).to.eql({ params: '', error: null });
    });

    it('reject quality values greater than 100', function () {
        var jpegSettings = new JPEG({});
        jpegSettings.compression(101);

        expect(jpegSettings.serialize()).to.eql({ params: '',
            error: 'jpeg compression quality: 101 is not a number between 0 to 100' });
    });

    it('reject quality values smaller than 0', function () {
        var jpegSettings = new JPEG({});
        jpegSettings.compression(-1);

        expect(jpegSettings.serialize()).to.eql({
            params: '',
            error: 'jpeg compression quality: -1 is not a number between 0 to 100'
        });
    });

    it('rounds quality values', function () {
        var jpegSettings = new JPEG({});
        jpegSettings.compression(40.67);

        expect(jpegSettings.serialize()).to.eql({
            params: 'q_41',
            error: null
        });
    });

    it('resets for undefined', function () {
        var jpegSettings = new JPEG({});
        jpegSettings.compression(-1, true);
        jpegSettings.compression();

        expect(jpegSettings.serialize()).to.eql({
            params: '',
            error: null
        });
    });
});