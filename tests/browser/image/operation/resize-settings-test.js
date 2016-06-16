var ResizeSettings = require('../../../../src/image/operation/resize/resize-settings');
var expect = require('expect.js');

describe('resize settings', function () {

    it('serializes', function () {
        var resizeSettings = new ResizeSettings({});
        resizeSettings.enableUpscale();

        expect(resizeSettings.serialize()).to.be('lg');
    });

    it('can be reset by false', function () {
        var resizeSettings = new ResizeSettings({});
        resizeSettings.enableUpscale();
        resizeSettings.enableUpscale(false);

        expect(resizeSettings.serialize()).to.be('');
    });
});