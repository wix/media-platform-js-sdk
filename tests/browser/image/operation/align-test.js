var Align = require('../../../../src/image/operation/align/align');
var expect = require('expect.js');

describe('align', function () {

    it('serializes', function () {
        var align = new Align({});
        align.alignment('l');

        var result = align.serialize();
        expect(result.params).to.be('al_l');
    });

    it('accepts value from alignments enum', function () {
        var align = new Align({});
        var Alignments = require('../../../../src/image/operation/align/alignments');
        align.alignment(Alignments.ALL_FACES);

        var result = align.serialize();
        expect(result.params).to.be('al_fs');
    });

    it('can be reset by null value', function () {
        var align = new Align({});
        align.alignment('l');
        align.alignment(null);

        var result = align.serialize();
        expect(result.params).to.be('');
    });

    it('can be reset by undefined value', function () {
        var align = new Align({});
        align.alignment('l');
        align.alignment();

        var result = align.serialize();
        expect(result.params).to.be('');
    });

    it('reject invalid values', function () {
        var align = new Align({});
        align.alignment('cccc');

        var result = align.serialize();
        expect(result.error).to.be('align: cccc is not a valid alignment value - see alignments.js for valid values');
    });

});