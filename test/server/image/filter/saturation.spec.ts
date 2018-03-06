import {expect} from 'chai';
import {Saturation} from '../../../../src/image/filter/saturation';
import {Image} from '../../../../src';

describe('saturation', function () {

  it('serializes', function () {
    const saturation = new Saturation(new Image());
    saturation.saturation(-100);

    expect(saturation.serialize()).to.deep.equal({params: 'sat_-100', error: null});
  });

  it('reject values greater than 100', function () {
    const saturation = new Saturation(new Image());
    saturation.saturation(101);

    expect(saturation.serialize()).to.deep.equal({
      params: '',
      error: 'saturation: 101 is not a number between -100 to 100'
    });
  });

  it('reject values smaller than -100', function () {
    const saturation = new Saturation(new Image());
    saturation.saturation(-101);

    expect(saturation.serialize()).to.deep.equal({
      params: '',
      error: 'saturation: -101 is not a number between -100 to 100'
    });
  });

  it('resets for null', function () {
    const saturation = new Saturation(new Image());
    saturation.saturation(70);
    saturation.saturation(null);

    expect(saturation.serialize()).to.deep.equal({params: '', error: null});
  });

  it('resets for undefined', function () {
    const saturation = new Saturation(new Image());
    saturation.saturation(-9970);
    saturation.saturation();

    expect(saturation.serialize()).to.deep.equal({params: '', error: null});
  });

  it('resets for 0', function () {
    const saturation = new Saturation(new Image());
    saturation.saturation(-1);
    saturation.saturation(0);

    expect(saturation.serialize()).to.deep.equal({params: '', error: null});
  });
});
