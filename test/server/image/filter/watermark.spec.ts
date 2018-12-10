import {expect} from 'chai';
import {Image} from '../../../../src';
import {Watermark} from '../../../../src/image/filter/watermark';

describe('watermark', () => {

  it('serializes', () => {
    const watermark = new Watermark(new Image());
    watermark.manifest('manifest');

    expect(watermark.serialize()).to.deep.equal({params: 'wm_manifest', error: ''});
  });

  it('resets for null', () => {
    const watermark = new Watermark(new Image());
    watermark.manifest('manifest');
    watermark.manifest();

    expect(watermark.serialize()).to.deep.equal({params: '', error: ''});
  });

  it('resets for undefined', () => {
    const watermark = new Watermark(new Image());
    watermark.manifest('manifest');
    watermark.manifest(undefined);

    expect(watermark.serialize()).to.deep.equal({params: '', error: ''});
  });

  it('resets for empty string', () => {
    const watermark = new Watermark(new Image());
    watermark.manifest('manifest');
    watermark.manifest('');

    expect(watermark.serialize()).to.deep.equal({params: '', error: ''});
  });
});
