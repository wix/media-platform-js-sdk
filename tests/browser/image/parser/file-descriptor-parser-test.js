var FileDescriptor = require('../../../../src/platform/management/file-descriptor');
var Image = require('../../../../src/image/image');
var expect = require('expect.js');

describe('image file descriptor parsing', function () {

    it('creates a new Image from a File Descriptor', function () {

        var fileDescriptor = new FileDescriptor({
            id: 'id',
            hash: 'hash',
            path: '/images/1234/image.png',
            mimeType: 'image/png',
            mediaType: 'mediaType',
            type: 'type',
            size: 1000,
            metadata: {
                width: 1000,
                height: 2000
            },
            tags: ['tags'],
            dateCreated: 'dateCreated',
            dateUpdated: 'dateUpdated'
        });

        var image = new Image(fileDescriptor);

        expect(image.crop(500, 500).toUrl('//www.domain.com').url)
            .to.eql('//www.domain.com/images/1234/image.png/v1/crop/w_500,h_500,x_0,y_0/image.png#w_1000,h_2000,mt_image%2Fpng');
    });

    it('ignores empty fileUrl', function () {

        var dto = new FileDescriptor({
            width: 115,
            height: 35,
            parent_folder_id: 'd23b196fa41a47043ae3908ca467cbe9',
            file_name: 'dbb3e157ff7041c9ad3e13ce263146a9',
            media_type: 'picture',
            tags: ['cat', 'fish'],
            labels: ['hunting knife', 'Wix.com'],
            hash: '9eea21221c9abe895eac99a54f058d2a',
            original_file_name: 'image.jpg',
            file_size: 12958,
            component_type: '',
            icon_url: 'ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9/file.jpg',
            file_url: '',
            mime_type: 'image/jpeg',
            created_ts: 1467294551,
            modified_ts: 1467294551
        });

        var imageRequest = parse('www.domain.com', dto);

        expect(imageRequest.host)
            .to.eql('www.domain.com');
    });

    it('ignores null fileUrl', function () {

        var dto = new FileDescriptor({
            width: 115,
            height: 35,
            parent_folder_id: 'd23b196fa41a47043ae3908ca467cbe9',
            file_name: 'dbb3e157ff7041c9ad3e13ce263146a9',
            media_type: 'picture',
            tags: ['cat', 'fish'],
            labels: ['hunting knife', 'Wix.com'],
            hash: '9eea21221c9abe895eac99a54f058d2a',
            original_file_name: 'image.jpg',
            file_size: 12958,
            component_type: '',
            icon_url: 'ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9/file.jpg',
            file_url: null,
            mime_type: 'image/jpeg',
            created_ts: 1467294551,
            modified_ts: 1467294551
        });

        var imageRequest = parse('www.domain.com', dto);

        expect(imageRequest.host)
            .to.eql('www.domain.com');
    });

    it('ignores undefined fileUrl', function () {

        var dto = new FileDescriptor({
            width: 115,
            height: 35,
            parent_folder_id: 'd23b196fa41a47043ae3908ca467cbe9',
            file_name: 'dbb3e157ff7041c9ad3e13ce263146a9',
            media_type: 'picture',
            tags: ['cat', 'fish'],
            labels: ['hunting knife', 'Wix.com'],
            hash: '9eea21221c9abe895eac99a54f058d2a',
            original_file_name: 'image.jpg',
            file_size: 12958,
            component_type: '',
            icon_url: 'ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9/file.jpg',
            mime_type: 'image/jpeg',
            created_ts: 1467294551,
            modified_ts: 1467294551
        });

        var imageRequest = parse('www.domain.com', dto);

        expect(imageRequest.host)
            .to.eql('www.domain.com');
    });
});
