import {expect} from 'chai';
import {sandbox as sinonSandbox} from 'sinon';
import {deprecatedFn} from './deprecated';

describe('Deprecated', () => {
  const sandbox = sinonSandbox.create();
  let consoleWarnSpy;

  beforeEach(() => {
    consoleWarnSpy = sandbox.stub(console, 'warn');
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  it('should write console.warn when wrap function', () => {
    const func = (a: number, b: number) => a + b;
    const deprecatedFunc = deprecatedFn('Use something else instead.')(func);
    deprecatedFunc(1, 2);
    expect(consoleWarnSpy).to.have.been.calledWith('DEPRECATED: "func" function is deprecated with message "Use something else instead."');
  });

  it('should write console.warn when wrap function with message omitted', () => {
    const func = (a: number, b: number) => a + b;
    const deprecatedFunc = deprecatedFn()(func);
    deprecatedFunc(1, 2);
    expect(consoleWarnSpy).to.have.been.calledWith('DEPRECATED: "func" function is deprecated');
  });

  it('should return the same result', () => {
    const func = (a: number, b: number) => a + b;
    const deprecatedFunc = deprecatedFn()(func);
    expect(deprecatedFunc(1, 2)).to.equal(3);
  });
});
