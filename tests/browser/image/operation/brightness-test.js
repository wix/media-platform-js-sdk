var Brightness = require('../../../../src/image/operation/chromaticity/brightness');
var expect = require('expect.js');

describe('brightness', function () {

    it('serializes', function () {
        var brightness = new Brightness({});
        brightness.brightness(-100);

        expect(brightness.serialize()).to.eql({ params: 'br_-100', error: null });
    });

    it('reject values greater than 100', function () {
        var brightness = new Brightness({});
        brightness.brightness(101);

        expect(brightness.serialize()).to.eql({ params: '',
            error: 'brightness: 101 is not a number between -100 to 100' });
    });

    it('reject values smaller than -100', function () {
        var brightness = new Brightness({});
        brightness.brightness(-101);

        expect(brightness.serialize()).to.eql({ params: '',
            error: 'brightness: -101 is not a number between -100 to 100' });
    });

    it('resets for null', function () {
        var brightness = new Brightness({});
        brightness.brightness(70);
        brightness.brightness(null);

        expect(brightness.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for undefined', function () {
        var brightness = new Brightness({});
        brightness.brightness(-9970);
        brightness.brightness();

        expect(brightness.serialize()).to.eql({ params: '', error: null });
    });

    it('resets for 0', function () {
        var brightness = new Brightness({});
        brightness.brightness(-1);
        brightness.brightness(0);

        expect(brightness.serialize()).to.eql({ params: '', error: null });
    });
});