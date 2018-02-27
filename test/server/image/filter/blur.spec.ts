import {expect} from 'chai';
import {Blur} from '../../../../src/image/filter/blur';
import {Image} from '../../../../src';

describe('blur', function () {

  it('serializes', function () {
    const blur = new Blur(new Image());
    blur.percentage(100);

    expect(blur.serialize()).to.deep.equal({params: 'blur_100', error: null});
  });

  it('reject values greater than 100', function () {
    const blur = new Blur(new Image());
    blur.percentage(101);

    expect(blur.serialize()).to.deep.equal({params: '', error: 'blur: 101 is not a number between 0 to 100'});
  });

  it('reject values smaller than 0', function () {
    const blur = new Blur(new Image());
    blur.percentage(-1);

    expect(blur.serialize()).to.deep.equal({params: '', error: 'blur: -1 is not a number between 0 to 100'});
  });

  it('resets for null', function () {
    const blur = new Blur(new Image());
    blur.percentage(70);
    blur.percentage(null);

    expect(blur.serialize()).to.deep.equal({params: '', error: null});
  });

  it('resets for undefined', function () {
    const blur = new Blur(new Image());
    blur.percentage(70);
    blur.percentage();

    expect(blur.serialize()).to.deep.equal({params: '', error: null});
  });

  it('resets for 0', function () {
    const blur = new Blur(new Image());
    blur.percentage(-99);
    blur.percentage(0);

    expect(blur.serialize()).to.deep.equal({params: '', error: null});
  });
});
