var FileDescriptor = require('../../../../src/platform/management/metadata/file-descriptor');
var Image = require('../../../../src/image/image');
var expect = require('expect.js');

describe('image file descriptor parsing', function () {

    it('creates a new Image from a File Descriptor', function () {

        var fileDescriptor = new FileDescriptor({
            id: 'id',
            hash: 'hash',
            path: '/images/1234/image.png',
            mimeType: 'image/png',
            type: '-',
            size: 1000,
            dateCreated: 'dateCreated',
            dateUpdated: 'dateUpdated'
        });

        var image = new Image(fileDescriptor);

        expect(image.crop(500, 500).toUrl('//www.domain.com').url)
            .to.eql('//www.domain.com/images/1234/image.png/v1/crop/w_500,h_500,x_0,y_0/image.png');
    });
});
