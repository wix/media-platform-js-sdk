import { expect } from 'chai';
import { Blur } from '../../../../src/image/filter/blur';
import { Image } from '../../../../src/server';

describe('blur', () => {
  it('serializes', () => {
    const blur = new Blur(new Image());
    blur.percentage(100);

    expect(blur.serialize()).to.deep.equal({ params: 'blur_100', error: null });
  });

  it('reject values greater than 100', () => {
    const blur = new Blur(new Image());
    blur.percentage(101);

    expect(blur.serialize()).to.deep.equal({
      params: '',
      error: 'blur: 101 is not a number between 0 to 100',
    });
  });

  it('reject values smaller than 0', () => {
    const blur = new Blur(new Image());
    blur.percentage(-1);

    expect(blur.serialize()).to.deep.equal({
      params: '',
      error: 'blur: -1 is not a number between 0 to 100',
    });
  });

  it('resets for null', () => {
    const blur = new Blur(new Image());
    blur.percentage(70);
    blur.percentage();

    expect(blur.serialize()).to.deep.equal({ params: '', error: null });
  });

  it('resets for undefined', () => {
    const blur = new Blur(new Image());
    blur.percentage(70);
    blur.percentage();

    expect(blur.serialize()).to.deep.equal({ params: '', error: null });
  });

  it('resets for 0', () => {
    const blur = new Blur(new Image());
    blur.percentage(-99);
    blur.percentage(0);

    expect(blur.serialize()).to.deep.equal({ params: '', error: null });
  });
});
