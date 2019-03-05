import {expect} from 'chai';

import {Image} from '../../../../src/server';
import {FileDescriptor} from '../../../../src/platform/management/metadata/file-descriptor';


describe('image file descriptor parsing', () => {
  it('creates a new Image from FileDescriptor', () => {
    const fileDescriptor = new FileDescriptor({
      id: 'id',
      hash: 'hash',
      path: '/images/1234/image.png',
      mimeType: 'image/png',
      type: '-',
      size: 1000,
      dateCreated: 'dateCreated',
      dateUpdated: 'dateUpdated',
      bucket: null
    });

    const image = new Image(fileDescriptor);
    const imageUrl = image
      .crop(500, 500)
      .toUrl('//www.domain.com');

    expect(imageUrl).to.deep.equal({
      error: null,
      url: '//www.domain.com/images/1234/image.png/v1/crop/w_500,h_500,x_0,y_0/image.png'
    });
  });

  it('creates a new Image from FileDescriptor without any params', () => {
    const fileDescriptor = new FileDescriptor({
      id: 'id',
      hash: 'hash',
      path: '/images/12345/image.png',
      mimeType: 'image/png',
      type: '-',
      size: 1000,
      dateCreated: 'dateCreated',
      dateUpdated: 'dateUpdated',
      bucket: null
    });

    const image = new Image(fileDescriptor);
    const imageUrl = image.toUrl('//www.domain2.com');

    expect(imageUrl).to.deep.equal({
      error: null,
      url: '//www.domain2.com/images/12345/image.png'
    });
  });
});
