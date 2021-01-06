/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
describe('Divide component', function() {
  let c = null;
  let dividend = null;
  let divisor = null;
  let quotient = null;
  before(function(done) {
    this.timeout(4000);
    const loader = new noflo.ComponentLoader(baseDir);
    loader.load('math/Divide', function(err, instance) {
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
    quotient = noflo.internalSocket.createSocket();
    return c.outPorts.quotient.attach(quotient);
  });
  afterEach(function() {
    c.outPorts.quotient.detach(quotient);
    return quotient = null;
  });

  return describe('when instantiated', () => it('should calculate 5 / 2', function(done) {
    quotient.once('data', function(res) {
      chai.expect(res).to.equal(2.5);
      return done();
    });
    dividend.send(5);
    return divisor.send(2);
  }));
});
