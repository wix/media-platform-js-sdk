var Align = require('../../../../src/image/operation/align/align');
var expect = require('expect.js');

describe('align', function () {

    it('serializes', function () {
        var align = new Align({});
        align.alignment('l');

        expect(align.serialize()).to.be('al_l');
    });

    it('accepts value from alignments enum', function () {
        var align = new Align({});
        var Alignments = require('../../../../src/image/operation/align/alignments');
        align.alignment(Alignments.ALL_FACES);

        expect(align.serialize()).to.be('al_fs');
    });

    it('can be reset by null value', function () {
        var align = new Align({});
        align.alignment('l');

        align.alignment(null);

        expect(align.serialize()).to.be('');
    });

    it('can be reset by undefined value', function () {
        var align = new Align({});
        align.alignment('l');

        align.alignment();

        expect(align.serialize()).to.be('');
    });

    it('reject invalid values', function () {
        var align = new Align({});
        align.alignment('cccc');

        expect(align.serialize()).to.be('');
    });

    it('reject invalid values and calls callback with error', function () {
        var calledBack = false;
        var align = new Align({
            callback: function (error) {
                calledBack = true;
                expect(error).to.be.an(Error);
            }
        });
        align.alignment('cccc');

        expect(calledBack).to.be.ok();
        expect(align.serialize()).to.be('');
    });
});