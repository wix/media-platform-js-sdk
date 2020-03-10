import { expect } from 'chai';
import { Policy } from '../../../../src/image/token/policy';
import { Gravity, Watermark } from '../../../../src/image/watermark';
import { ImageToken } from '../../../../src/image/token/image-token';

describe('image token', () => {
  it('toClaims should properly return claims', () => {
    const policy = new Policy({ maxHeight: 1000, maxWidth: 1500, path: '/path/to/image.jpg' });

    const watermark = new Watermark({ path: '/path/to/mark.png', opacity: 10, proportions: 20, gravity: Gravity.SOUTH });

    const token = new ImageToken({ policy, watermark });

    const claims = token.toClaims();
    expect(claims.aud).to.contain('urn:service:image.operations');
    expect(claims.wmk).to.deep.equal({
      path: '/path/to/mark.png',
      opacity: 10,
      proportions: 20,
      gravity: 'south',
    });
  });

  it('toClaims should properly return claims without watermark', () => {
    const policy = new Policy({ maxHeight: 1000, maxWidth: 1500, path: '/path/to/image.jpg' });

    const token = new ImageToken({ policy });

    const claims = token.toClaims();
    expect(claims.aud).to.contain('urn:service:image.operations');
    expect(claims).to.not.have.property('wmk');
  });

  it('toClaims should properly return claims without policy', () => {
    const watermark = new Watermark({ path: '/path/to/mark.png', opacity: 10, proportions: 20, gravity: Gravity.SOUTH });
    const token = new ImageToken({ watermark });

    const claims = token.toClaims();
    expect(claims.aud).to.contain('urn:service:image.operations');
    expect(claims.obj).to.equal(null);
  });
});
