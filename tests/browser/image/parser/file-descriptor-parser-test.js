var FileDescriptor = require('../../../../src/platform/management/file-descriptor');
var parse = require('../../../../src/image/parser/file-descriptor-parser');
var expect = require('expect.js');

describe('image dto parsing', function () {

        it('creates a new ImageRequest from a DTO', function () {

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
                file_url: 'ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9/file.jpg',
                mime_type: 'image/jpeg',
                created_ts: 1467294551,
                modified_ts: 1467294551
            });

            var imageRequest = parse('www.domain.com', dto);

            expect(imageRequest.host)
                .to.eql('www.domain.com/ggl-109789773458215503884/images');

            expect(imageRequest.fit(500, 500).toUrl().url)
                .to.eql('//www.domain.com/ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9/v1/fit/w_500,h_500/image.jpg#w_115,h_35,mt_image%2Fjpeg');
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
