/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Modulo component', function() {
  let c = null;
  let dividend = null;
  let divisor = null;
  let remainder = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Modulo', function(err, instance) {
      if (err) { return done(err); }
      c = instance;
      dividend = noflo.internalSocket.createSocket();
      divisor = noflo.internalSocket.createSocket();
      c.inPorts.dividend.attach(dividend);
      c.inPorts.divisor.attach(divisor);
      return done();
    });
  });
  beforeEach(function() {
    remainder = noflo.internalSocket.createSocket();
    return c.outPorts.remainder.attach(remainder);
  });
  afterEach(function() {
    c.outPorts.remainder.detach(remainder);
    return remainder = null;
  });

  return describe('when instantiated', function() {
    it('should calculate 5 / 2 = 1', function(done) {
      remainder.once('data', function(res) {
        chai.expect(res).to.equal(1);
        return done();
      });
      dividend.send(5);
      return divisor.send(2);
    });
    return it('should calculate 10 / 2 = 0', function(done) {
      remainder.once('data', function(res) {
        chai.expect(res).to.equal(0);
        return done();
      });
      dividend.send(10);
      return divisor.send(2);
    });
  });
});
