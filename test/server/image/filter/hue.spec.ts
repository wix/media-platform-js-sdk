import { expect } from 'chai';
import { Hue } from '../../../../src/image/filter/hue';
import { Image } from '../../../../src/server';

describe('hue', () => {
  it('serializes', () => {
    const hue = new Hue(new Image());
    hue.hue(100);

    expect(hue.serialize()).to.deep.equal({ params: 'hue_100', error: null });
  });

  it('reject values greater than 100', () => {
    const hue = new Hue(new Image());
    hue.hue(101);

    expect(hue.serialize()).to.deep.equal({
      params: '',
      error: 'hue: 101 is not a number between -100 to 100',
    });
  });

  it('reject values smaller than -100', () => {
    const hue = new Hue(new Image());
    hue.hue(-101);

    expect(hue.serialize()).to.deep.equal({
      params: '',
      error: 'hue: -101 is not a number between -100 to 100',
    });
  });

  it('resets for null', () => {
    const hue = new Hue(new Image());
    hue.hue(-101);
    hue.hue();

    expect(hue.serialize()).to.deep.equal({ params: '', error: null });
  });

  it('resets for undefined', () => {
    const hue = new Hue(new Image());
    hue.hue(70);
    hue.hue();

    expect(hue.serialize()).to.deep.equal({ params: '', error: null });
  });

  it('resets for 0', () => {
    const hue = new Hue(new Image());
    hue.hue(-1);
    hue.hue(0);

    expect(hue.serialize()).to.deep.equal({ params: '', error: null });
  });
});
