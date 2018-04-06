import {expect} from 'chai';
import {Token} from '../../../../src/platform/authentication/token';


describe('token', function () {

  it('serializes objects into obj claim', function () {
    const objects = [
      [
        {'path': '/gold/fish/*'}
      ]
    ];
    const token = new Token().setObjects(objects);

    expect(token.toClaims().obj).to.equal(objects);
  });

  it('takes forcibly injected object', function () {
    const objects = [
      [
        {'path': '/gold/fish/*'}
      ]
    ];
    const token = new Token();
    // noinspection JSValidateTypes
    token.objects = objects;

    expect(token.toClaims().obj).to.equal(objects);
  });

  it('prioritize objects over object', function () {
    const objects = [
      [
        {'path': '/gold/fish/*'}
      ]
    ];
    const token = new Token()
      .setObject('bad', 'boy')
      .setObjects(objects);

    expect(token.toClaims().obj).to.equal(objects);
  });

});
