var Brightness = require('../../../../src/image/operation/chromaticity/brightness');
var expect = require('expect.js');

describe('brightness', function () {

    it('serializes', function () {
        var brightness = new Brightness({});
        brightness.brightness(-100);

        expect(brightness.serialize()).to.be('br_-100');
    });

    it('reject values greater than 100', function () {
        var brightness = new Brightness({});
        brightness.brightness(101);

        expect(brightness.serialize()).to.be('');
    });

    it('reject values smaller than -100', function () {
        var brightness = new Brightness({});
        brightness.brightness(-101);

        expect(brightness.serialize()).to.be('');
    });

    it('resets for null', function () {
        var brightness = new Brightness({});
        brightness.brightness(70);
        brightness.brightness(null);

        expect(brightness.serialize()).to.be('');
    });

    it('resets for undefined', function () {
        var brightness = new Brightness({});
        brightness.brightness(70);
        brightness.brightness();

        expect(brightness.serialize()).to.be('');
    });

    it('resets for 0', function () {
        var brightness = new Brightness({});
        brightness.brightness(-1);
        brightness.brightness(0);

        expect(brightness.serialize()).to.be('');
    });
});