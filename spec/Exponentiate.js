/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Exponentiate component', function() {
  let c = null;
  let base = null;
  let exponent = null;
  let power = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Exponentiate', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      base = noflo.internalSocket.createSocket();
      exponent = noflo.internalSocket.createSocket();
      c.inPorts.base.attach(base);
      c.inPorts.exponent.attach(exponent);
      return done();
    });
  });
  beforeEach(function() {
    power = noflo.internalSocket.createSocket();
    return c.outPorts.power.attach(power);
  });
  afterEach(function() {
    c.outPorts.power.attach(power);
    return power = null;
  });

  return describe('when instantiated', () => it('should calculate 2 to the power 5 = 32', function(done) {
    power.once('data', function(res) {
      chai.expect(res).to.equal(32);
      return done();
    });
    base.send(2);
    return exponent.send(5);
  }));
});
