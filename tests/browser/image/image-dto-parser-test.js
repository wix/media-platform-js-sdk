var ImageDTO = require('../../../src/dto/image/image-dto');
var fromDto = require('../../../src/image/image-request-deserializer').fromDto;
var expect = require('expect.js');

describe('image dto parsing', function () {

        it('creates a new ImageRequest from a DTO', function () {
            var imageRequest = fromDto("www.domain.com", new ImageDTO({
                "width": 115,
                "height": 35,
                "parent_folder_id": "d23b196fa41a47043ae3908ca467cbe9",
                "file_name": "dbb3e157ff7041c9ad3e13ce263146a9",
                "media_type": "picture",
                "tags": ["cat", "fish"],
                "labels": ["hunting knife", "Wix.com"],
                "hash": "9eea21221c9abe895eac99a54f058d2a",
                "original_file_name": "image.jpg",
                "file_size": 12958,
                "component_type": "",
                "icon_url": "ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9/file.jpg",
                "file_url": "ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9/file.jpg",
                "mime_type": "image/jpeg",
                "created_ts": 1467294551,
                "modified_ts": 1467294551
            }));

            expect(imageRequest.baseUrl).to.eql("www.domain.com/ggl-109789773458215503884/images/dbb3e157ff7041c9ad3e13ce263146a9");
    });
});
