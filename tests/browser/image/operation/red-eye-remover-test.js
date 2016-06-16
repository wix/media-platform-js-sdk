var RedEyeRemover = require('../../../../src/image/operation/effect/red-eye-remover');
var expect = require('expect.js');

describe('red eye remover', function () {

    it('serializes', function () {
        var redEyeRemover = new RedEyeRemover({});
        redEyeRemover.activate();

        expect(redEyeRemover.serialize()).to.eql({ params: 'eye', error: null });
    });

    it('can be reset by false', function () {
        var redEyeRemover = new RedEyeRemover({});
        redEyeRemover.activate();
        redEyeRemover.activate(false);

        expect(redEyeRemover.serialize()).to.eql({ params: '', error: null });
    });
});