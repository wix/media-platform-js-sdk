var Background = require('../../../../src/image/operation/background/background');
var expect = require('expect.js');

describe('background', function () {

    it('serializes', function () {
        var background = new Background({});
        background.color('0099ff');

        var result = background.serialize();
        expect(result.params).to.be('c_0099ff');
    });

    it('can be reset by null', function () {
        var background = new Background({});
        background.color('0099ff');
        background.color(null);

        var result = background.serialize();
        expect(result.params).to.be('');
    });

    it('can be reset by undefined', function () {
        var background = new Background({});
        background.color('0099ff');
        background.color();

        var result = background.serialize();
        expect(result.params).to.be('');
    });

    it('accepts "000000"', function () {
        var background = new Background({});
        background.color('000000');

        var result = background.serialize();
        expect(result.params).to.be('c_000000');
    });

    it('reject invalid values', function () {
        var background = new Background({});
        background.color('cccc');

        var result = background.serialize();
        expect(result.error).to.be('background: cccc is not a valid 6 digit hex color');
    });
});