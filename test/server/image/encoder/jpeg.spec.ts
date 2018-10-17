import {expect} from 'chai';
import {JPEG} from '../../../../src/image/encoder/jpeg';
import {Image} from '../../../../src';

describe('jpeg', () => {

  it('serializes', () => {
    const jpeg = new JPEG(new Image());
    jpeg.compression(99, true);

    expect(jpeg.serialize()).to.deep.equal({params: 'q_99,bl', error: null});
  });

  it('baseline is optional', () => {
    const jpeg = new JPEG(new Image());
    jpeg.compression(99);

    expect(jpeg.serialize()).to.deep.equal({params: 'q_99', error: null});
  });

  it('progressive default is omitted', () => {
    const jpeg = new JPEG(new Image());
    jpeg.compression(100, false);

    expect(jpeg.serialize()).to.deep.equal({params: 'q_100', error: null});
  });

  it('quality default (75) is omitted', () => {
    const jpeg = new JPEG(new Image());
    jpeg.compression(75);

    expect(jpeg.serialize()).to.deep.equal({params: '', error: null});
  });

  it('reject quality values greater than 100', () => {
    const jpeg = new JPEG(new Image());
    jpeg.compression(101);

    expect(jpeg.serialize()).to.deep.equal({
      params: '',
      error: 'jpeg compression quality: 101 is not a number between 0 to 100'
    });
  });

  it('reject quality values smaller than 0', () => {
    const jpeg = new JPEG(new Image());
    jpeg.compression(-1);

    expect(jpeg.serialize()).to.deep.equal({
      params: '',
      error: 'jpeg compression quality: -1 is not a number between 0 to 100'
    });
  });

  it('rounds quality values', () => {
    const jpeg = new JPEG(new Image());
    jpeg.compression(40.67);

    expect(jpeg.serialize()).to.deep.equal({
      params: 'q_41',
      error: null
    });
  });

  it('resets for undefined', () => {
    const jpeg = new JPEG(new Image());
    jpeg.compression(-1, true);
    jpeg.compression();

    expect(jpeg.serialize()).to.deep.equal({
      params: '',
      error: null
    });
  });
});
