var Background = require('../../../../src/image/operation/background/background');
var expect = require('expect.js');

describe('background', function () {

    it('serializes', function () {
        var background = new Background({});
        background.color('0099ff');

        expect(background.serialize()).to.be('c_0099ff');
    });

    it('can be reset by null', function () {
        var background = new Background({});
        background.color('0099ff');
        background.color(null);

        expect(background.serialize()).to.be('');
    });

    it('can be reset by undefined', function () {
        var background = new Background({});
        background.color('0099ff');
        background.color();

        expect(background.serialize()).to.be('');
    });

    it('accepts "000000"', function () {
        var background = new Background({});
        background.color('000000');

        expect(background.serialize()).to.be('c_000000');
    });

    it('reject invalid values', function () {
        var background = new Background({});
        background.color('cccc');

        expect(background.serialize()).to.be('');
    });
});