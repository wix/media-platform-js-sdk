import {expect} from 'chai';
import {Hue} from '../../../../src/image/filter/hue';
import {Image} from '../../../../src';

describe('hue', function () {

  it('serializes', function () {
    const hue = new Hue(new Image());
    hue.hue(100);

    expect(hue.serialize()).to.deep.equal({params: 'hue_100', error: null});
  });

  it('reject values greater than 100', function () {
    const hue = new Hue(new Image());
    hue.hue(101);

    expect(hue.serialize()).to.deep.equal({
      params: '',
      error: 'hue: 101 is not a number between -100 to 100'
    });
  });

  it('reject values smaller than -100', function () {
    const hue = new Hue(new Image());
    hue.hue(-101);

    expect(hue.serialize()).to.deep.equal({
      params: '',
      error: 'hue: -101 is not a number between -100 to 100'
    });
  });

  it('resets for null', function () {
    const hue = new Hue(new Image());
    hue.hue(-101);
    hue.hue(null);

    expect(hue.serialize()).to.deep.equal({params: '', error: null});
  });

  it('resets for undefined', function () {
    const hue = new Hue(new Image());
    hue.hue(70);
    hue.hue();

    expect(hue.serialize()).to.deep.equal({params: '', error: null});
  });

  it('resets for 0', function () {
    const hue = new Hue(new Image());
    hue.hue(-1);
    hue.hue(0);

    expect(hue.serialize()).to.deep.equal({params: '', error: null});
  });
});
