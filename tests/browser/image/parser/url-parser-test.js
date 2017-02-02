var expect = require('expect.js');

var Image = require('../../../../src/image/image');
var parse = require('../../../../src/image/parser/url-parser');

describe('image url parsing', function () {

    var imageUrl = 'http://media.wixapps.net/1234/images/file.png/v1/crop/w_50,h_50,q_75,usm_0.5_0.2_0.0/file.png#w_100,h_200,mt_image%2Fpng';

    it('parses crop geometry', function () {
        var image = new Image(imageUrl);

        expect(image.toUrl()).to.eql({
            url: 'http://media.wixapps.net/1234/images/file.png/v1/crop/w_50,h_50,x_0,y_0,usm_0.5_0.2_0.0/file.png#w_100,h_200,mt_image%2Fpng',
            error: null
        });
    });

    it('correctly handles schemes - http', function () {
        var operation = parse('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

        expect(operation.toUrl()).to.eql({
            url: 'http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
            error: null
        });
    });

    it('correctly handles schemes - https', function () {
        var operation = parse('https://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

        expect(operation.toUrl()).to.eql({
            url: 'https://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
            error: null
        });
    });

    it('correctly handles schemes - without', function () {
        var operation = parse('//test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

        expect(operation.toUrl()).to.eql({
            url: '//test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
            error: null
        });
    });

    it('metadata - handles mimeType that were not encoded', function () {
        var operation = parse('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video/mp4');

        expect(operation.toUrl()).to.eql({
            url: 'http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
            error: null
        });
    });

    it('metadata - decodes mimeType', function () {
        var operation = parse('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

        expect(operation.toUrl()).to.eql({
            url: 'http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4',
            error: null
        });
    });

    it('metadata - original image data fragment is mandatory', function () {
        var operation = parse('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#');

        expect(operation.toUrl()).to.eql({
            url: null,
            error: new Error('original image data is mandatory')
        });
    });

    it('metadata - ignores malformed fragment - without separator', function () {
        var operation = parse('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w,h_200,mt_video%2Fmp4');

        expect(operation.toUrl()).to.eql({
            url: null,
            error: new Error('original image data is mandatory')
        });
    });

    it('metadata - ignores malformed fragment - with separator', function () {
        var operation = parse('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_,h_200,mt_video%2Fmp4');

        expect(operation.toUrl()).to.eql({
            url: null,
            error: new Error('original image data is mandatory')
        });
    });

    it('metadata - ignores malformed fragment - missing param', function () {
        var operation = parse('http://test.wix.com/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#h_200,mt_video%2Fmp4');

        expect(operation.toUrl()).to.eql({
            url: null,
            error: new Error('original image data is mandatory')
        });
    });

    it('correctly handles ports', function () {
        var operation = parse('http://test.wix.com:8080/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_10,h_10,mt_image%2Fjpeg');

        expect(operation.toUrl()).to.eql({
            url: 'http://test.wix.com:8080/user/bucket/imageId/v1/fit/w_100,h_100/fish.jpeg#w_10,h_10,mt_image%2Fjpeg',
            error: null
        });
    });

});
