var Oil = require('../../../../src/image/operation/effect/oil');
var expect = require('expect.js');

describe('oil', function () {

    it('serializes', function () {
        var oil = new Oil({});
        oil.activate();

        expect(oil.serialize()).to.eql({ params: 'oil', error: null });
    });

    it('can be reset by false', function () {
        var oil = new Oil({});
        oil.activate();
        oil.activate(false);

        expect(oil.serialize()).to.eql({ params: '', error: null });
    });
});