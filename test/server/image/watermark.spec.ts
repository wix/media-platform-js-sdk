import { expect } from 'chai';
import { Gravity, Watermark } from '../../../src/image/watermark';

describe('watermark', () => {
  it('toClaims returns wmk', () => {
    const watermark = new Watermark({
      path: '/path/to/mark.png',
      opacity: 10,
      proportions: 20,
      gravity: Gravity.SOUTH,
    });
    expect(watermark.toClaims()).to.deep.equal({
      wmk: {
        path: '/path/to/mark.png',
        opacity: 10,
        proportions: 20,
        gravity: Gravity.SOUTH,
      },
    });
  });
});
