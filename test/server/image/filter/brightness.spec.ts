import { expect } from 'chai';
import { Brightness } from '../../../../src/image/filter/brightness';
import { Image } from '../../../../src/server';

describe('brightness', () => {
  it('serializes', () => {
    const brightness = new Brightness(new Image());
    brightness.brightness(-100);

    expect(brightness.serialize()).to.deep.equal({
      params: 'br_-100',
      error: null,
    });
  });

  it('reject values greater than 100', () => {
    const brightness = new Brightness(new Image());
    brightness.brightness(101);

    expect(brightness.serialize()).to.deep.equal({
      params: '',
      error: 'brightness: 101 is not a number between -100 to 100',
    });
  });

  it('reject values smaller than -100', () => {
    const brightness = new Brightness(new Image());
    brightness.brightness(-101);

    expect(brightness.serialize()).to.deep.equal({
      params: '',
      error: 'brightness: -101 is not a number between -100 to 100',
    });
  });

  it('resets for null', () => {
    const brightness = new Brightness(new Image());
    brightness.brightness(70);
    brightness.brightness();

    expect(brightness.serialize()).to.deep.equal({ params: '', error: null });
  });

  it('resets for undefined', () => {
    const brightness = new Brightness(new Image());
    brightness.brightness(-9970);
    brightness.brightness();

    expect(brightness.serialize()).to.deep.equal({ params: '', error: null });
  });

  it('resets for 0', () => {
    const brightness = new Brightness(new Image());
    brightness.brightness(-1);
    brightness.brightness(0);

    expect(brightness.serialize()).to.deep.equal({ params: '', error: null });
  });
});
