import {expect} from 'chai';
import {Contrast} from '../../../../src/image/filter/contrast';
import {Image} from '../../../../src';

describe('contrast', function () {

  it('serializes', function () {
    const contrast = new Contrast(new Image());
    contrast.contrast(100);

    expect(contrast.serialize()).to.deep.equal({params: 'con_100', error: null});
  });

  it('reject values greater than 100', function () {
    const contrast = new Contrast(new Image());
    contrast.contrast(101);

    expect(contrast.serialize()).to.deep.equal({
      params: '',
      error: 'contrast: 101 is not a number between -100 to 100'
    });
  });

  it('reject values smaller than -100', function () {
    const contrast = new Contrast(new Image());
    contrast.contrast(-101);

    expect(contrast.serialize()).to.deep.equal({
      params: '',
      error: 'contrast: -101 is not a number between -100 to 100'
    });
  });

  it('resets for null', function () {
    const contrast = new Contrast(new Image());
    contrast.contrast(70);
    contrast.contrast();

    expect(contrast.serialize()).to.deep.equal({params: '', error: null});
  });

  it('resets for undefined', function () {
    const contrast = new Contrast(new Image());
    contrast.contrast('aaa');
    contrast.contrast();

    expect(contrast.serialize()).to.deep.equal({params: '', error: null});
  });

  it('resets for 0', function () {
    const contrast = new Contrast(new Image());
    contrast.contrast(-1);
    contrast.contrast(0);

    expect(contrast.serialize()).to.deep.equal({params: '', error: null});
  });
});
