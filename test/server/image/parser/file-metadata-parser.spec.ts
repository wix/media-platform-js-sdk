import { expect } from 'chai';

import { Image } from '../../../../src/image/image';
import { Likelihood } from '../../../../src/platform/management/metadata/explicit-content';
import { FileMetadata } from '../../../../src/platform/management/metadata/file-metadata';
import { MediaType } from '../../../../src/types/media-platform/media-platform';

describe('image file descriptor parsing', () => {
  it('creates a new Image from FileMetadata', () => {
    const fileMetadata = new FileMetadata({
      mediaType: MediaType.Image,
      fileDescriptor: {
        mimeType: 'image/jpg',
        hash: null,
        acl: 'private',
        path: '/images/animals/cat.jpg',
        type: '-',
        id: '2145ae56cd5c47c79c05d4cfef5f1078',
        size: 15431,
        lifecycle: null,
      },
      basic: {
        height: 600,
        width: 500,
        colorspace: null,
        format: 'jpeg',
      },
      features: {
        colors: [
          {
            r: 138,
            g: 218,
            b: 244,
            pixelFraction: 0.38548386,
            score: 0.688166,
          },
        ],
        explicitContent: [
          {
            likelihood: Likelihood.UNLIKELY,
            name: 'medical',
          },
          {
            likelihood: Likelihood.VERY_UNLIKELY,
            name: 'adult',
          },
        ],
        faces: [
          { x: 383, y: 393, width: 155, height: 180 },
          { x: 460, y: 385, width: 145, height: 173 },
        ],
        labels: [
          { name: 'cat', score: 0.9 },
          { name: 'animal', score: 0.933 },
        ],
      },
    });

    const image = new Image(fileMetadata);

    expect(image.crop(500, 500).toUrl('//www.domain.com').url).to.eql(
      '//www.domain.com/images/animals/cat.jpg/v1/crop/w_500,h_500,x_0,y_0/cat.jpg#w_500,h_600,mt_image%2Fjpg',
    );
  });
});
