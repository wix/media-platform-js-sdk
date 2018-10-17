import {expect} from 'chai';
import {Token} from '../../../../src/platform/authentication/token';


describe('token', () => {

  it('serializes objects into obj claim', () => {
    const objects = [
      [
        {path: '/gold/fish/*'}
      ]
    ];
    const token = new Token().setObjects(objects);

    expect(token.toClaims().obj).to.equal(objects);
  });

  it('takes forcibly injected object', () => {
    const objects = [
      [
        {path: '/gold/fish/*'}
      ]
    ];
    const token = new Token();
    // noinspection JSValidateTypes
    token.objects = objects;

    expect(token.toClaims().obj).to.equal(objects);
  });

});
