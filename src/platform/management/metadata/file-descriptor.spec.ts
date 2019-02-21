import {expect} from 'chai';

import {FileDescriptor} from './file-descriptor';


describe('FileDescriptor:', () => {
  it('should return correct file descriptor', () => {
    const fileDescriptor = new FileDescriptor({
      acl: 'public',
      dateCreated: '2019-02-18T11:19:50Z',
      dateUpdated: '2019-02-18T11:19:50Z',
      hash: null,
      id: '19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
      lifecycle: null,
      mimeType: 'image/jpeg',
      path: '/media/19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
      size: 106764,
      type: '-',
      urn: 'urn:file:19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg'
    });

    expect(fileDescriptor).to.deep.equal({
      acl: 'public',
      bucket: null,
      dateCreated: '2019-02-18T11:19:50Z',
      dateExpired: null,
      dateUpdated: '2019-02-18T11:19:50Z',
      hash: null,
      id: '19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
      lifecycle: null,
      mimeType: 'image/jpeg',
      path: '/media/19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
      size: 106764,
      type: '-'
    });
  });

  describe('bucket:', () => {
    it('should return bucket as null when no bucket received', () => {
      const fileDescriptor = new FileDescriptor({
        acl: 'public',
        dateCreated: '2019-02-18T11:19:50Z',
        dateUpdated: '2019-02-18T11:19:50Z',
        hash: null,
        id: '19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        lifecycle: null,
        mimeType: 'image/jpeg',
        path: '/media/19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        size: 106764,
        type: '-',
        urn: 'urn:file:19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg'
      });

      expect(fileDescriptor).to.deep.equal({
        acl: 'public',
        bucket: null,
        dateCreated: '2019-02-18T11:19:50Z',
        dateExpired: null,
        dateUpdated: '2019-02-18T11:19:50Z',
        hash: null,
        id: '19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        lifecycle: null,
        mimeType: 'image/jpeg',
        path: '/media/19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        size: 106764,
        type: '-'
      });
    });

    it('should return bucket as null when bucket is null', () => {
      const fileDescriptor = new FileDescriptor({
        acl: 'public',
        bucket: null,
        dateCreated: '2019-02-18T11:19:50Z',
        dateUpdated: '2019-02-18T11:19:50Z',
        hash: null,
        id: '19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        lifecycle: null,
        mimeType: 'image/jpeg',
        path: '/media/19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        size: 106764,
        type: '-',
        urn: 'urn:file:19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg'
      });

      expect(fileDescriptor).to.deep.equal({
        acl: 'public',
        bucket: null,
        dateCreated: '2019-02-18T11:19:50Z',
        dateExpired: null,
        dateUpdated: '2019-02-18T11:19:50Z',
        hash: null,
        id: '19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        lifecycle: null,
        mimeType: 'image/jpeg',
        path: '/media/19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        size: 106764,
        type: '-'
      });
    });

    it('should return bucket as string when bucket is string', () => {
      const fileDescriptor = new FileDescriptor({
        acl: 'public',
        bucket: 'static-dev.wixstatic.com',
        dateCreated: '2019-02-18T11:19:50Z',
        dateUpdated: '2019-02-18T11:19:50Z',
        hash: null,
        id: '19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        lifecycle: null,
        mimeType: 'image/jpeg',
        path: '/media/19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        size: 106764,
        type: '-',
        urn: 'urn:file:19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg'
      });

      expect(fileDescriptor).to.deep.equal({
        acl: 'public',
        bucket: 'static-dev.wixstatic.com',
        dateCreated: '2019-02-18T11:19:50Z',
        dateExpired: null,
        dateUpdated: '2019-02-18T11:19:50Z',
        hash: null,
        id: '19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        lifecycle: null,
        mimeType: 'image/jpeg',
        path: '/media/19fc1a_b1738e3616b645bd90ab7097a1c0f904.jpg',
        size: 106764,
        type: '-'
      });
    });
  });
});
