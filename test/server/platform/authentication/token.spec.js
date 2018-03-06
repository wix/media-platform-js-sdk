import {expect} from 'chai';
import {Token} from '../../../../src/platform/authentication/token';


describe('token', function () {

  it('serializes objects into obj claim', function () {
    var objects = [
      [
        {'path': '/gold/fish/*'}
      ]
    ];
    var token = new Token().setObjects(objects);

    expect(token.toClaims().obj).to.equal(objects);
  });

  it('takes forcibly injected object', function () {
    var objects = [
      [
        {'path': '/gold/fish/*'}
      ]
    ];
    var token = new Token();
    // noinspection JSValidateTypes
    token.object = objects;

    expect(token.toClaims().obj).to.equal(objects);
  });

  it('prioritize objects over object', function () {
    var objects = [
      [
        {'path': '/gold/fish/*'}
      ]
    ];
    var token = new Token()
      .setObject('bad', 'boy')
      .setObjects(objects);

    expect(token.toClaims().obj).to.equal(objects);
  });

});
