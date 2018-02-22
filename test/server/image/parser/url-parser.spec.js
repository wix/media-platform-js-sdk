import {expect} from 'chai';

import {Image} from '../../../../src/image/image';


describe('image url parsing', function () {

  it('parses crop geometry', function () {
    var image = new Image('http://media.wixapps.net/1234/images/file.png/v1/crop/w_50,h_50,q_75,usm_0.5_0.2_0.0/file.png#w_100,h_200,mt_image%2Fpng');

    expect(image.toUrl()).to.deep.equal({
      url: 'http://media.wixapps.net/1234/images/file.png/v1/crop/w_50,h_50,x_0,y_0,usm_0.50_0.20_0.00/file.png#w_100,h_200,mt_image%2Fpng',
      error: null
    });
  });

  it('correctly handles schemes - http', function () {
    var image = new Image('http://test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

    expect(image.toUrl()).to.deep.equal({
      url: 'http://test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100,x_0,y_0/imageId#w_100,h_200,mt_video%2Fmp4',
      error: null
    });
  });

  it('correctly handles schemes - https', function () {
    var image = new Image('https://test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

    expect(image.toUrl()).to.deep.equal({
      url: 'https://test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100,x_0,y_0/imageId#w_100,h_200,mt_video%2Fmp4',
      error: null
    });
  });

  it('correctly handles schemes - without', function () {
    var image = new Image('//test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

    expect(image.toUrl()).to.deep.equal({
      url: '//test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100,x_0,y_0/imageId#w_100,h_200,mt_video%2Fmp4',
      error: null
    });
  });

  it('metadata - handles mimeType that were not encoded', function () {
    var image = new Image('http://test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100/fish.jpeg#w_100,h_200,mt_video/mp4');

    expect(image.toUrl()).to.deep.equal({
      url: 'http://test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100,x_0,y_0/imageId#w_100,h_200,mt_video%2Fmp4',
      error: null
    });
  });

  it('metadata - decodes mimeType', function () {
    var image = new Image('http://test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100/fish.jpeg#w_100,h_200,mt_video%2Fmp4');

    expect(image.toUrl()).to.deep.equal({
      url: 'http://test.wix.com/user/bucket/imageId/v1/crop/w_100,h_100,x_0,y_0/imageId#w_100,h_200,mt_video%2Fmp4',
      error: null
    });
  });

  it('metadata - ignores malformed fragment - without separator', function () {
    var image = new Image('http://test.wix.com/user/bucket/fish.jpeg/v1/crop/w_100,h_100/fish.jpeg#w,h_200,mt_video%2Fmp4');

    expect(image.toUrl()).to.deep.equal({
      url: 'http://test.wix.com/user/bucket/fish.jpeg/v1/crop/w_100,h_100,x_0,y_0/fish.jpeg',
      error: null
    });
  });

  it('metadata - ignores malformed fragment - with separator', function () {
    var image = new Image('http://test.wix.com/user/bucket/fish.jpeg/v1/crop/w_100,h_100/fish.jpeg#w_,h_200,mt_video%2Fmp4');

    expect(image.toUrl()).to.deep.equal({
      url: 'http://test.wix.com/user/bucket/fish.jpeg/v1/crop/w_100,h_100,x_0,y_0/fish.jpeg',
      error: null
    });
  });

  it('metadata - ignores malformed fragment - missing param', function () {
    var image = new Image('http://test.wix.com/user/bucket/fish.jpeg/v1/crop/w_100,h_100/fish.jpeg#h_200,mt_video%2Fmp4');

    expect(image.toUrl()).to.deep.equal({
      url: 'http://test.wix.com/user/bucket/fish.jpeg/v1/crop/w_100,h_100,x_0,y_0/fish.jpeg',
      error: null
    });
  });

  it('correctly handles ports', function () {
    var image = new Image('http://test.wix.com:8080/user/bucket/imageId/v1/crop/w_100,h_100/fish.jpeg#w_10,h_10,mt_image%2Fjpeg');

    expect(image.toUrl()).to.deep.equal({
      url: 'http://test.wix.com:8080/user/bucket/imageId/v1/crop/w_100,h_100,x_0,y_0/imageId#w_10,h_10,mt_image%2Fjpeg',
      error: null
    });
  });

});
